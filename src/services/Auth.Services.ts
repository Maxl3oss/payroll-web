import { useAxios } from "@/helper/Axios";
import { IErrorAxios } from "@/types/global";

export async function AuthLogin(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/login`, data);
    return res.data;
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}