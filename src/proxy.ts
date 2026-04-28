import { NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";
import { refresh } from "next/cache";

function isTokenExpired(token: string | undefined): boolean {
    if (!token) return true;
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const payload = JSON.parse(decodedJson);
        const exp = payload.exp * 1000;
        // Considera o token como expirado se faltar menos de 10 segundos
        return Date.now() > exp - 10000; 
    } catch (error) {
        return true;
    }
}

export default async function proxy(request: NextRequest){
    console.log("Proxy executado.....")
    const cookiesStore = await cookies();
    const { pathname } = request.nextUrl;

    let token = cookiesStore.get("token")?.value;
    const refreshToken = cookiesStore.get("refreshToken")?.value;

    console.log("Token encontrado no proxy: ", token);
    console.log("Refresh token encontrado no proxy: ", refreshToken);

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        }
    })

    if((!token || isTokenExpired(token)) && refreshToken) {
        try {
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({refreshToken})
            })

            if(refreshRes.ok) {
                const data = await refreshRes.json();

                token = data.accessToken;
                const newRefreshToken = data.newRefreshToken || data.refreshToken;

                console.log("Novo refresh token: ", newRefreshToken)

                request.cookies.set("token", token!)

                if(newRefreshToken){
                    request.cookies.set("refreshToken", newRefreshToken)
                    console.log('Token renovado', newRefreshToken)
                }

                response = NextResponse.next({
                    request: {
                        headers: request.headers,
                    }
                })

                response.cookies.set("token", token!, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                })

                if(newRefreshToken){
                    response.cookies.set("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        path: "/",
                    })
                } else {
                    token = undefined;
                }
            }
        } catch (error) {
            console.log("Erro ao renovar token no proxy", error)
            token = undefined;
        }
    }

    if (!token) {
       const loginUrl = new URL("/", request.url);
       loginUrl.searchParams.set("callbackUrl", pathname);
        const redirectRes = NextResponse.redirect(loginUrl);
       redirectRes.cookies.delete("token");
       redirectRes.cookies.delete("refreshToken");
       return redirectRes;
    }

    const isJWTPattern = token.split('.').length === 3;

    if (!isJWTPattern) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        response.cookies.delete("refreshToken");
        return response;
    }

    return response;

}

export const config = {
    matcher: ["/dashboard/:path*"]
}