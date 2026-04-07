import { UserType } from "./user-type";

export type LoginResponseType = {
  user: UserType;
  accessToken: string;
  refreshToken: string;
};
