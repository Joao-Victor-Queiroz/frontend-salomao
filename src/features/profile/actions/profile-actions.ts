import { apiAxios } from "@/lib/api";
import { UserProfileResponse } from "../types/profile-types";

export async function profileDetails() {
  const api = await apiAxios();
  const response = await api.get("/auth/me");

  return response.data as UserProfileResponse;
}