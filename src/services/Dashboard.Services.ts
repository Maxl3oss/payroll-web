import { useAxios } from "@/helper/Axios";
import { IErrorAxios } from "@/types/global";

// Admin
export async function GetDashboard(year: number) {
  try {
    const res = await useAxios.get(`/dashboard/get?year=${year}`);
    return res.data;
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}