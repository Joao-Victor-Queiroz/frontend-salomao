"use server";
import { logOut, signIn } from "../services/auth-service";
import { cookies } from "next/headers";
import { LoginSchemaFormType } from "../schemas";


export async function handleLoginAction(data: LoginSchemaFormType) {
  const result = await signIn(data);
  const cookiesStore = await cookies();

  if (result.accessToken) {
    cookiesStore.set("token", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    if (result.refreshToken) {
      cookiesStore.set("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
    }

    if (!result.user) {
      throw new Error(
        "Resposta do servidor não contém informações do usuário.",
      );
    }
    return { success: true, user: result.user };
  }

  return { error: "Falha no login" };
}


export async function handleLogoutAction() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  if (refreshToken) {
    await logOut(refreshToken);
  }
}

export async function updateSession(token: string, newRefreshToken: string) {
  const cookiesStore = await cookies();

  cookiesStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax',
    path: '/'
  })
  

  cookiesStore.set("refreshToken", newRefreshToken, {
     httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax',
    path: '/'
  })
}