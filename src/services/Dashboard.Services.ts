import { SECRET_KEY, useAxios } from "@/helper/Axios";
<<<<<<< HEAD
import { DecryptData, ErrorResDecryptData } from "@/helper/FunctionHelper";
import { IResponse } from "@/types/global";

// Admin
export async function GetDashboard(year: number): Promise<IResponse> {
=======
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";

// Admin
export async function GetDashboard(year: number) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.get(`/dashboard/get?year=${year}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
=======
    return (error as IErrorAxios)?.response?.data
>>>>>>> 3cb839e (update make decrypt response)
  }
}