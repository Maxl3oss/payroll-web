import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData, ErrorResDecryptData } from "@/helper/FunctionHelper";
import { IResponse } from "@/types/global";

// admin 
export async function GetAllUser(pageNumber: number, pageSize: number, search: string): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/user/get-all?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function GetUserByID(userId: string): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/user/get/${userId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function DeleteUserByID(userId: string): Promise<IResponse> {
  try {
    const res = await useAxios.delete(`/user/del/${userId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

// role 
export async function GetAllRole(): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/user/get-role`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UpdatePassByAdmin(uid: string, data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.patch(`/user/update-pass/${uid}`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function CreateUser(data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.post(`/user/add`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function GetProfile(): Promise<IResponse> {
  try {
    const res = await useAxios.get(`/user/profile`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UpdatePassByUser(uid: string, data: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.patch(`/user/change-pass/${uid}`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UpdateUser(uid: string, user: unknown): Promise<IResponse> {
  try {
    const res = await useAxios.patch(`/user/update/${uid}`, user);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}