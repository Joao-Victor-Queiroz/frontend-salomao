import { AuthResponse } from "@/lib/api";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";


export async function POST(){
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;
    console.log("Route handler executado")

    console.log("Refresh token: ", refreshToken);

    if(!refreshToken){
        console.log("Refresh token não encontrado (RH)")
        return NextResponse.json({error: "Refresh token não encontrado"}, {status: 400});
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, 
            {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        }
        )
        const data = await response.json() as any; // Usamos any para pegar refreshToken se o backend enviar assim
        console.log("Resposta do servidor: ", data);

        if(!response.ok) {
            console.log('Erro ao renovar token')
            return NextResponse.json({error: data.message || "Erro ao renovar token"}, {status: response.status});
        }

        const accessToken = data.accessToken;
        const newRefreshToken = data.newRefreshToken || data.refreshToken; // Suporta as duas nomenclaturas

        cookiesStore.delete("token");
        cookiesStore.delete("refreshToken");

        cookiesStore.set("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        })

        if (newRefreshToken) {
            cookiesStore.set("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            })
        }
        console.log('Token renovado e cookies atualizados')

        return NextResponse.json({
            success: true, 
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        console.log("Catch de erro ao renovar token (try/catch)")
        return NextResponse.json({error: "Erro ao renovar token"}, {status: 401});
    }
}