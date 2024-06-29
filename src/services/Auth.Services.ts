import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData, ErrorResDecryptData } from "@/helper/FunctionHelper";
import { IResponse } from "@/types/global";

// Function to handle login
export async function AuthLogin(data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.post('/auth/login', data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function ForgetPassword(data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.post(`/auth/forget-password`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function ForgetConfirmOPT(data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.post(`/auth/confirm-opt`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function ForgetResetPassword(data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.post(`/auth/reset-password`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}