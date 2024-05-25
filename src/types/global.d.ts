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
	deleted_at?: string | null;
	full_name: string;
	email: string;
	taxid: string;
	mobile: string;
	role_id: number;
	role: Role;
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

export type IDropdown<T = string> = {
  value: T;
  label: string;
}

export type SalaryTypeName = "รพสต." | "สจ." | "ฝ่ายประจำ" | "เงินเดือนครู" | "บำนาญครู" | "บำเหน็จรายเดือน" | "บำนาญข้าราชการ";

export type SalaryType = {
  id: number;
  name: SalaryTypeName;
}

export type ISalary = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  full_name: string;
  bank_account_number: string;
  salary: number;
  salary_period: number;
  additional_benefits: number;
  fixed_income: number;
  monthly_compensation: number;
  increase_pension: number;
  normal_pension: number;
  lump_sum_withdrawal: number;
  lump_sum: number;
  monthly_pension: number;
  special_compensation: number;
  living_allowance: number;
  academic_allowance: number;
  total_income: number;
  tax: number;
  public_health_cooperative: number;
  revenue_department: number;
  other: number;
  social_security_deduction: number;
  social_security_welfare: number;
  ministry_of_public_health_coop: number;
  oba_coop: number;
  teacher_coop: number;
  rhs_coop: number;
  phuket_savings_branch: number;
  central_world_savings_branch: number;
  patong_savings_branch: number;
  poon_phol_savings_branch: number;
  cherng_talay_savings_branch: number;
  home_pro_chalong_savings_branch: number;
  bangkok_bank_loan: number;
  islamic_bank_loan: number;
  bangkok_bank: number;
  dgs: number;
  cooperative: number;
  cooperative_additional: number;
  cpkp: number;
  cpks: number;
  dpc: number;
  gc: number;
  gsc: number;
  private_company: number;
  pay_damages: number;
  actual_pay: number;
  teachers_savings_coop: number;
  teachers_savings_coop_surat: number;
  received: number;
  type_id: number;
  user_id: number | null;
  salary_type: SalaryType;
}