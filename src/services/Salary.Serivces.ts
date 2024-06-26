import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";

// Admin
export async function GetSalary(pageNumber: number, pageSize: number, search: string, month: string, type: number) {
  try {
    const res = await useAxios.get(`/salary/get-all?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}&month=${month}&type=${type}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    console.log(error)
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UploadSalary(data: unknown) {
  try {
    const res = await useAxios.post(`/salary/uploads`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function DeleteMany(month: string, typeId: string) {
  try {
    const res = await useAxios.delete(`/salary/delete-by-month?month=${month}&type=${typeId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

// User
export async function GetSalaryByUser(userId: string, pageNumber: number, pageSize: number, month: string) {
  try {
    const res = await useAxios.get(`/salary/get-by-user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&month=${month}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function GetDDLSalaryType() {
  try {
    const res = await useAxios.get(`/salary/get-type`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function GetSalaryOther(type: number) {
  try {
    const res = await useAxios.get(`/salary/get-salary-other?type=${type}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}