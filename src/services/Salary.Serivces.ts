import { SECRET_KEY, useAxios } from "@/helper/Axios";
<<<<<<< HEAD
import { DecryptData, ErrorResDecryptData } from "@/helper/FunctionHelper";
import { IResponse } from "@/types/global";
=======
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";
>>>>>>> 3cb839e (update make decrypt response)

// Admin
export async function GetSalary(pageNumber: number, pageSize: number, search: string, month: string, type: number): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/salary/get-all?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}&month=${month}&type=${type}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UploadSalary(data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.post(`/salary/uploads`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function DeleteMany(month: string, typeId: string): Promise<IResponse> {
  try {
    const res = await useAxios.delete(`/salary/delete-by-month?month=${month}&type=${typeId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

// User
export async function GetSalaryByUser(userId: string, pageNumber: number, pageSize: number, month: string): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/salary/get-by-user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&month=${month}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function GetDDLSalaryType(): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/salary/get-type`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function GetSalaryOther(type: number): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/salary/get-salary-other?type=${type}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}