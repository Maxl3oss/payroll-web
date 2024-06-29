import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData, ErrorResDecryptData } from "@/helper/FunctionHelper";
import { IResponse } from "@/types/global";

// Admin
export async function GetDashboard(year: number): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/dashboard/get?year=${year}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}