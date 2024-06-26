import { SECRET_KEY, useAxios } from "@/helper/Axios";
<<<<<<< HEAD
import { DecryptData, ErrorResDecryptData } from "@/helper/FunctionHelper";
import { IResponse } from "@/types/global";

// admin 
export async function GetAllUser(pageNumber: number, pageSize: number, search: string): Promise<IResponse> {
=======
import { DecryptData } from "@/helper/FunctionHelper";
import { IErrorAxios } from "@/types/global";

// admin 
export async function GetAllUser(pageNumber: number, pageSize: number, search: string) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.get(`/user/get-all?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function GetUserByID(userId: string): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function GetUserByID(userId: string) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.get(`/user/get/${userId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function DeleteUserByID(userId: string): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function DeleteUserByID(userId: string) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.delete(`/user/del/${userId}`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
=======
    return (error as IErrorAxios)?.response?.data
>>>>>>> 3cb839e (update make decrypt response)
  }
}

// role 
<<<<<<< HEAD
export async function GetAllRole(): Promise<IResponse> {
=======
export async function GetAllRole() {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.get(`/user/get-role`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UpdatePassByAdmin(uid: string, data: unknown): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UpdatePassByAdmin(uid: string, data: unknown) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.patch(`/user/update-pass/${uid}`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function CreateUser(data: unknown): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function CreateUser(data: unknown) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.post(`/user/add`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function GetProfile(): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function GetProfile() {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.get(`/user/profile`);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UpdatePassByUser(uid: string, data: unknown): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UpdatePassByUser(uid: string, data: unknown) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.patch(`/user/change-pass/${uid}`, data);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
  }
}

export async function UpdateUser(uid: string, user: unknown): Promise<IResponse> {
=======
    return (error as IErrorAxios)?.response?.data
  }
}

export async function UpdateUser(uid: string, user: unknown) {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const res = await useAxios.patch(`/user/update/${uid}`, user);
    return DecryptData(res.data, SECRET_KEY);
  } catch (error) {
<<<<<<< HEAD
    return ErrorResDecryptData(error, SECRET_KEY);
=======
    return (error as IErrorAxios)?.response?.data
>>>>>>> 3cb839e (update make decrypt response)
  }
}