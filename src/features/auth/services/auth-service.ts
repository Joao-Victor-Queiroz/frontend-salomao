import { LoginSchemaFormType } from "../schemas";
import { LoginResponseType } from "../types";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL)
  throw new Error("A BASE_URL não foi definida nas variáveis de ambiente.");

export async function signIn(
  data: LoginSchemaFormType,
): Promise<LoginResponseType> {
  const response = await fetch(`${baseURL}/auth/signin`, {
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
  const response = await fetch(`${baseURL}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro desconhecido ao fazer logout");
  }

  return result;
}