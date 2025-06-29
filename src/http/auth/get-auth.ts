import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

export const getAuthApiHandler = async (token: string): Promise<User> => {
  const { data } = await api.get<User>("/auth/get-auth", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
