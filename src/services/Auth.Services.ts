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

export async function ForgetPassword(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/forget-password`, data);
    return res.data;
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function ForgetConfirmOPT(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/confirm-opt`, data);
    return res.data;
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function ForgetResetPassword(data: unknown) {
  try {
    const res = await useAxios.post(`/auth/reset-password`, data);
    return res.data;
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

	// authRoute.Post("/forget-password", authController.ForgetPassword)
	// authRoute.Post("/confirm-opt", authController.ConfirmOTP)
	// authRoute.Post("/reset-password", authController.ResetPassword)