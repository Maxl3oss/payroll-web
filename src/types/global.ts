export type IPagin = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecord: number;
}

export type IPrefix = {
  id: number;
  title_th: string;
  title_en: string;
}

export type IRole = {
  id: number;
  name: string;
}

export type IUser = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  prefix_id: number;
  prefix: IPrefix;
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  role_id: number;
  role: IRole;
}

export type IToken = {
  access: string;
  refresh: string;
}

export type Pagin = {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecord: number;
}

export type IResponse<T> = {
	statusCode: number;
	taskStatus: boolean;
	data: T;
	pagin: Pagin;
}

export type IErrorAxios = {
  response: {
    data: {
      statusCode: number;
      taskStatus: number;
      message: string;
    }
  }
}