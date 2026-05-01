import { LoginSchemaFormType } from "../schemas";
import { LoginResponseType } from "../types";
import { getBaseUrl } from "@/lib/base-url";


export async function signIn(
  data: LoginSchemaFormType,
): Promise<LoginResponseType> {
  const response = await fetch(`${getBaseUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro desconhecido ao fazer login");
  }

  console.log("Dados do servidor: ", result);

  return result;
}


export async function logOut(refreshToken: string) {
  const response = await fetch(`${getBaseUrl}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro desconhecido ao fazer logout");
  }

  return result;
}