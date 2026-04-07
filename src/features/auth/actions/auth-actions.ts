"use server";
import { signIn } from "../services/auth-service";
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

      if(result.refreshToken) {
    cookiesStore.set("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });
  }

    return { success: true };
  }

  return { error: "Falha no login" };
}
