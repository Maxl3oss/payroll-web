import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";

// Function to handle login
export async function AuthLogin(data: unknown) {
  try {
    const res = await useAxios.post('/auth/login', data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function ForgetPassword(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/forget-password`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function ForgetConfirmOPT(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/confirm-opt`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function ForgetResetPassword(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/reset-password`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}