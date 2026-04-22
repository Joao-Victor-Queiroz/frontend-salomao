import { cookies } from "next/headers";
import { redirect, RedirectType } from 'next/navigation';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export async function apiWrapper(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  // Ajuste a URL base de acordo com sua variável de ambiente
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);

  // Se receber 401 (Não Autorizado), tentamos o refresh token
  if (response.status === 401) {
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
      console.log('RefreshToken: ', refreshToken)
      try {
        const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const tokens: RefreshTokenResponse = await refreshRes.json();
          
          // Tentamos atualizar os cookies
          // IMPORTANTE: O Next.js não permite setar cookies em Server Components.
          // Isso funcionará em Server Actions e Route Handlers.
          try {
            cookieStore.set("accessToken", tokens.accessToken);
            if (tokens.refreshToken) {
              cookieStore.set("refreshToken", tokens.refreshToken);
            }
          } catch (cookieError) {
            console.warn("Aviso: Não é possível definir cookies em um Server Component.");
          }

          // Refaz a requisição original com o novo token
          const retryHeaders = new Headers(fetchOptions.headers);
          retryHeaders.set("Authorization", `Bearer ${tokens.accessToken}`);

          response = await fetch(`${baseUrl}${endpoint}`, {
            ...fetchOptions,
            headers: retryHeaders,
          });
        } else {
          // Refresh token expirou ou é inválido. O ideal é deslogar o usuário.
          // Você pode disparar um redirect ou apenas deixar o 401 propagar
         
        }
      } catch (error) {
        console.error("Erro na tentativa de refresh token:", error);
      }
    }
  }

  // Aqui você pode retornar a response pura ou já parsear o JSON
  console.log("Resposta da requisição", response);
  return response;
}

// interface ApiConfig {
//   baseUrl?: string;
//   defaultHeaders?: Record<string, string>;
//   timeout?: number;
// }

// interface AuthConfig {
//   tokenProvider?: () => Promise<string | null> | string | null;
//   tokenHeader?: string;
//   tokenPrefix?: string;
// }

// interface ApiResponse<T> {
//   data: T;
//   status: number;
//   headers: Headers;
// }

// class ApiError extends Error {
//   constructor(
//     message: string,
//     public status: number,
//     public response?: Response,
//   ) {
//     super(message);
//     this.name = "ApiError";
//   }
// }
// class ApiClient {
//   private config: Required<ApiConfig>;
//   private authConfig: AuthConfig;

//   constructor(config: ApiConfig = {}, authConfig: AuthConfig = {}) {
//     this.config = {
//       baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
//       defaultHeaders: {
//         "Content-Type": "application/json",
//         ...config.defaultHeaders,
//       },
//       timeout: config.timeout || 10000,
//     };

//     this.authConfig = {
//       tokenHeader: "Authorization",
//       tokenPrefix: "Bearer",
//       ...authConfig,
//     };
//   }

//   private async makeRequest<T>(
//     endpoint: string,
//     options: RequestInit = {},
//   ): Promise<ApiResponse<T>> {
//     const url = this.buildUrl(endpoint);
//     const requestOptions = await this.buildRequestOptions(options);

//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(
//         () => controller.abort(),
//         this.config.timeout,
//       );

//       const response = await fetch(url, {
//         ...requestOptions,
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         throw new ApiError(
//           `HTTP ${response.status} - ${response.statusText}`,
//           response.status,
//           response,
//         );
//       }

//       const data = await this.parseResponse<T>(response);

//       return {
//         data,
//         status: response.status,
//         headers: response.headers,
//       };
//     } catch (error) {
//       if (error.name === "AbortError") {
//         throw new ApiError("Request timed out", 400);
//       }
//       throw error;
//     }
//   }

//   private buildUrl(endpoint: string): string {
//     if (endpoint.startsWith("http")) {
//       return endpoint;
//     }
//     return `${this.config.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
//   }

//   private async buildRequestOptions(options: RequestInit): Promise<RequestInit> {
//     const  headers  = {...this.config.defaultHeaders}

//     if(this.authConfig.tokenProvider) {
//       const token = await this.authConfig.tokenProvider();
//       if(token) {
//        headers[this.authConfig.tokenHeader!] = `${this.authConfig.tokenPrefix} ${token}`
//       }
//     }

//     return {
//       ...options,
//       headers: {
//         ...this.config.defaultHeaders,
//         ...options.headers,
//       },
//     };
//   }
//   private async parseResponse<T>(response: Response): Promise<T> {
//     const contentType = response.headers.get("Content-Type");

//     if (contentType?.includes("application/json")) {
//       try {
//         return await response.json();
//       } catch (error) {
//         throw new ApiError("Invalid JSON response", response.status, response);
//       }
//     }
//     return (await response.text()) as unknown as T;
//   }

//   async get<T>(
//     endpoint: string,
//     options?: RequestInit,
//   ): Promise<ApiResponse<T>> {
//     return this.makeRequest<T>(endpoint, { ...options, method: "GET" });
//   }

//   async post<T>(
//     endpoint: string,
//     data?: any,
//     options?: RequestInit,
//   ): Promise<ApiResponse<T>> {
//     return this.makeRequest<T>(endpoint, {
//       ...options,
//       method: "POST",
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async put<T>(
//     endpoint: string,
//     data?: any,
//     options?: RequestInit,
//   ): Promise<ApiResponse<T>> {
//     return this.makeRequest<T>(endpoint, {
//       ...options,
//       method: "PUT",
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async delete<T>(
//     endpoint: string,
//     options?: RequestInit,
//   ): Promise<ApiResponse<T>> {
//     return this.makeRequest<T>(endpoint, { ...options, method: "DELETE" });
//   }

//   async patch<T>(
//     endpoint: string,
//     data?: any,
//     options?: RequestInit,
//   ): Promise<ApiResponse<T>> {
//     return this.makeRequest<T>(endpoint, {
//       ...options,
//       method: "PATCH",
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }
// }

// const getClientToken = (): string | null => {
//   if (typeof window === "undefined") return null;

//   return localStorage.getItem("accessToken");
// }

// const getServerToken = async (): Promise<string | null> => {
//   const cookiesStore = await cookies();
//   const token =  cookiesStore.get("accessToken")

//   return token ? token.value : null;
// }

// export const clientApi = new ApiClient(
//   {
//     baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000',
//   },
//   {
//     tokenProvider: getClientToken,
//   }
// );

// export const serverApi = new ApiClient(
//   {
//     baseUrl: process.env.API_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000',
//   },
//   {
//     tokenProvider: getServerToken,
//   }
// );

// import { cookies } from "next/headers";

// type RefreshTokenResponse = {
//     accessToken: string;
//     newRefreshToken: string;
// }

// type ErrorMessage = {
//     statusCode: number;
//     message: string;
//     errorCode?: string;
// }

// async function refreshTokenEndpoint(refreshToken: string): Promise<RefreshTokenResponse>{
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ refreshToken })
//         })

//         if(!response.ok) {
//             throw new Error('Erro ao atualizar token')
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Erro ao atualizar token:', error);
//         throw error;
//     }
// }

// export async function apiClient(url: string, options: RequestInit = {}) {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
//     const refreshToken = (await cookies()).get('refreshToken')?.value;

//     if(response.status === 401 && refreshToken) {
//         const refreshData = await refreshTokenEndpoint(refreshToken);
//     }

// }
