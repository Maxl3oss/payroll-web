import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";

// Admin
export async function GetDashboard(year: number) {
  try {
    const res = await useAxios.get(`/dashboard/get?year=${year}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}