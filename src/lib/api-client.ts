import { cookies } from "next/headers";

type RefreshTokenResponse = {
    accessToken: string;
    newRefreshToken: string;
}

async function refreshTokenEndpoint(refreshToken: string): Promise<RefreshTokenResponse>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        })

        if(!response.ok) {
            throw new Error('Erro ao atualizar token')
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao atualizar token:', error);
        throw error;
    }
}

export async function apiClient(url: string, options: RequestInit = {}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
    const refreshToken = (await cookies()).get('refreshToken')?.value;

    if(response.status === 401 && refreshToken) {
        const refreshData = await refreshTokenEndpoint(refreshToken);
    }

}