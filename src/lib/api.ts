import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { handleLogoutAction } from "@/features/auth";
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
}

type AuthResponse = {
    accessToken: string;
    newRefreshToken: string;
}

export async function apiAxios(){
    console.log("Função chamada")
    const cookiesStore = await cookies();

    const token = cookiesStore.get("token")?.value;
    
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "node";

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    api.interceptors.response.use((response) => {
        return response;
    },
    (error: AxiosError) => {
        console.log("Status recebido:", error.response?.status);
console.log("Corpo da resposta:", error.response?.data);
        if(error.response?.status === 401) {
            const data = error.response.data as ErrorResponse;

            if(data?.errorCode === "TOKEN_EXPIRED" ) {
                console.log("Token expirado, tentando renovar...")
                const refreshToken = cookiesStore.get("refreshToken")?.value;
                const originalConfig = error.config;

                if(!isRefreshing) {
                    isRefreshing = true;

                    api.post("/auth/refresh-token", {refreshToken}, {
                        headers: {
                            'User-Agent': "node"
                        }
                    }).then((response) => {
                        const {accessToken,  newRefreshToken} = response.data as AuthResponse;
                        console.log("Token renovado com sucesso")
                        // cookiesStore.set("token", accessToken)
                        // cookiesStore.set("refreshToken", newRefreshToken) resolver isso
                        

                        api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

                        failedRequestQueue.forEach((request) => request.onSuccess(accessToken));

                        failedRequestQueue = [];
                    }).catch((err) => {
                        failedRequestQueue.forEach((request) => request.onFailure(err));
                        failedRequestQueue = [];
                        handleLogoutAction();
                    }).finally(() => {
                        isRefreshing = false;
                    })
                }

                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig?.headers && (originalConfig.headers["Authorization"] = `Bearer ${token}`);
                            resolve(api(originalConfig!));
                        },
                        onFailure: (err: AxiosError) => {
                            reject(err);
                        }
                    })
                })
            } else {
                handleLogoutAction();
            }
        }
        return Promise.reject(error);
    }
    
)
    return api;
}