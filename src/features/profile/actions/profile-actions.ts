"use server"
import { apiAxios } from "@/lib/api";
import { UserProfileResponse } from "../types/profile-types";
import { ChangePasswordSchemaType } from "../components/change-password-dialog";
import { isAxiosError } from "axios";

export async function profileDetails() {
  const api = await apiAxios();
  const response = await api.get("/auth/me");

  return response.data as UserProfileResponse;
}

export async function profileChangePassword(data: ChangePasswordSchemaType){
  try {
    const api = await apiAxios();
    const resposne = await api.patch("/auth/change-password", data);

    return {success: true, message: "Senha alterada com sucesso!"}
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";

    if(isAxiosError(error)){
      errorMessage = error.response?.data?.message || errorMessage;
    }else if(error instanceof Error){
      errorMessage = error.message;
    }

    return {success: false, message: errorMessage}
  }
}