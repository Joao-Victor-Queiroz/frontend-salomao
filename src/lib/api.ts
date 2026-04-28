import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { handleLogoutAction, updateSession } from "@/features/auth";
import { headers } from "next/headers";

let isRefreshing = false;

let failedRequestQueue = [] as Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}>;

type ErrorResponse = {
  statusCode: number;
  message: string;
  errorCode: string;
};

export type AuthResponse = {
  accessToken: string;
  newRefreshToken: string;
  message: string;
};

export async function apiAxios() {
  console.log("Função chamada (Axios)");
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token")?.value;

  const cookieHeader = (await cookies()).toString();

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "node";

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      console.log("Status recebido:", error.response?.status);
      console.log("Corpo da resposta:", error.response?.data);
      if (error.response?.status === 401) {
        const data = error.response.data as ErrorResponse;

        if (data?.errorCode === "TOKEN_EXPIRED") {
          console.log("Token expirado, tentando renovar... (Axios)");
        //   const refreshToken = cookiesStore.get("refreshToken")?.value;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            axios
              .post(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
                {},
                {
                  headers: {
                    "User-Agent": "node",
                    Cookie: cookieHeader,
                  },
                },
              )
              .then(async (response) => {
                const data = response.data;
                const accessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;
                
                console.log("Token renovado com sucesso");

                // ATUALIZANDO OS COOKIES NO CONTEXTO DA SERVER ACTION PARA ENVIAR AO BROWSER
                try {
                    cookiesStore.set("token", accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        path: "/",
                    });
                    
                    if (newRefreshToken) {
                        cookiesStore.set("refreshToken", newRefreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "lax",
                            path: "/",
                        });
                    }
                } catch (cookieError) {
                    console.warn("Aviso: Não foi possível atualizar os cookies via Server Component.", cookieError);
                }

                api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(accessToken),
                );

                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));
                failedRequestQueue = [];
                handleLogoutAction();
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                // originalConfig?.headers &&
                //   (originalConfig.headers["Authorization"] = `Bearer ${token}`);
                // resolve(api(originalConfig!));
                if (originalConfig) {
                    originalConfig.headers['Authorization'] = `Bearer ${token}`;

                    resolve(api(originalConfig));
                }
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          handleLogoutAction();
        }
      }
      return Promise.reject(error);
    },
  );
  return api;
}
