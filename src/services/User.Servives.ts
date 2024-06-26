import { SECRET_KEY, useAxios } from "@/helper/Axios";
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";

// admin 
export async function GetAllUser(pageNumber: number, pageSize: number, search: string) {
  try {
    const res = await useAxios.get(`/user/get-all?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function GetUserByID(userId: string) {
  try {
    const res = await useAxios.get(`/user/get/${userId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function DeleteUserByID(userId: string) {
  try {
    const res = await useAxios.delete(`/user/del/${userId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

// role 
export async function GetAllRole() {
  try {
    const res = await useAxios.get(`/user/get-role`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UpdatePassByAdmin(uid: string, data: unknown) {
  try {
    const res = await useAxios.patch(`/user/update-pass/${uid}`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function CreateUser(data: unknown) {
  try {
    const res = await useAxios.post(`/user/add`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function GetProfile() {
  try {
    const res = await useAxios.get(`/user/profile`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UpdatePassByUser(uid: string, data: unknown) {
  try {
    const res = await useAxios.patch(`/user/change-pass/${uid}`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UpdateUser(uid: string, user: unknown) {
  try {
    const res = await useAxios.patch(`/user/update/${uid}`, user);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
    return (error as IErrorAxios)?.response?.data
  }
}