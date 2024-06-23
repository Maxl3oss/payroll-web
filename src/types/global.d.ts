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
export interface ISalary {
  /** รหัส */
  id: number;
  /** วันที่สร้าง */
  created_at: string;
  /** วันที่อัพเดท */
  updated_at: string;
  /** วันที่ลบ(อาจเป็นค่าว่าง) */
  deleted_at: string | null;
  /** ชื่อ-สกุล */
  full_name: string;
  /** เลขบัญชีธนาคาร */
  bank_account_number: string;
  /** เงินเดือน */
  salary: number;
  /** เงินเดือน(ตกเบิก) */
  salary_period: number;
  /** เงินเพิ่มค่าครองชีพ */
  additional_benefits: number;
  /** เงินประจําตําแหน่ง */
  fixed_income: number;
  /** ค่าตอบแทนรายเดือน */
  monthly_compensation: number;
  /** เงินเพิ่มบำนาญ */
  increase_pension: number;
  /** บำนาญปกติ */
  normal_pension: number;
  /** ช.ค.บ.(ตบเบิก) */
  lump_sum_withdrawal: number;
  /** ช.ค.บ. */
  lump_sum: number;
  /** เงินบำเหน็จรายเดือน */
  monthly_pension: number;
  /** ค่าตอบแทนพิเศษ */
  special_compensation: number;
  /** ค่าครองชีพ/เงินเพิ่มการครองชีพชั่วคราว */
  living_allowance: number;
  /** เงินค่าวิทยฐานะ */
  academic_allowance: number;
  /** รวมรับจริง */
  total_income: number;
  /** ภาษี */
  tax: number;
  /** สหกรณ์ออมทรัพย์สาธารณสุข */
  public_health_cooperative: number;
  /** กรมสรรพากร(กยศ.) */
  revenue_department: number;
  /** ประกันสังคม (งด) #เงินเดือน */
  social_security_deduction: number;
  /** ประกันสังคม (งพ) #ค่าครองชีพ */
  social_security_welfare: number;
  /** สหกรณ์สำนักงานปลัดกระทรวงสาธารณสุข */
  ministry_of_public_health_coop: number;
  /** สหกรณ์ฯ(อบจ.) */
  oba_coop: number;
  /** สหกรณ์ฯ๖(รพช.) */
  rhs_coop: number;
  /** เงินกู้ธ.ออมสิน สาขาภูเก็ต */
  phuket_savings_branch: number;
  /** เงินกู้ธ.ออมสิน สาขาเซ็นทรัลฯ */
  central_world_savings_branch: number;
  /** เงินกู้ธ.ออมสิน ป่าตอง */
  patong_savings_branch: number;
  /** เงินกู้ธ.ออมสิน พูนผล */
  poon_phol_savings_branch: number;
  /** เงินกู้ธ.ออมสิน สาขาเชิงทะเล */
  cherng_talay_savings_branch: number;
  /** เงินกู้ธ.ออมสิน สาขาโฮมโปรห้าแยกฉลอง */
  home_pro_chalong_savings_branch: number;
  /** เงินกู้ธ.กรุงเทพ */
  bangkok_bank_loan: number;
  /** เงินกู้ธ.อิสลาม */
  islamic_bank_loan: number;
  /** เงินกู้ธ.กรุงไทย */
  krung_thai_bank: number;
  /** ฌกส. */
  dgs: number;
  /** กบข. */
  cooperative: number;
  /** กบข. หักเพิ่มเติม (2%) */
  cooperative_additional: number;
  /** ช.พ.ค. */
  cpkp: number;
  /** ช.พ.ส. */
  cpks: number;
  /** ฌปค. */
  dpc: number;
  /** ก.ฌ. */
  gc: number;
  /** กสจ. */
  gsc: number;
  /** บมจ. */
  private_company: number;
  /** ชดเชยค่าเสียหาย */
  pay_damages: number;
  /** รวมจ่ายจริง */
  actual_pay: number;
  /** สหกรณ์ออมทรัพย์ครู */
  teachers_savings_coop: number;
  /** สหกรณ์ออมทรัพย์ครูสุราษฎร์ธานี */
  teachers_savings_coop_surat: number;
  /** รับจริง */
  received: number;
  /** รหัสประเภทเงินเดือน */
  type_id: number;
  /** รหัส */  user
  user_id: number | null;
  /** ประเภทเงินเดือน */
  salary_type: SalaryType;
  /** อื่นๆ value */
  other1: number;
  other2: number;
  other3: number;
  other4: number;
  other5: number;
  other6: number;
  other7: number;
  other8: number;
  /** อื่นๆ ไอดี  */
  salary_other_id: number;
  /** ข้อมูลชื่ออื่นๆ */
  salary_other: ISalaryOther;

}

export interface ISalaryOther {
  id: number;
  other1_name: string;
  other2_name: string;
  other3_name: string;
  other4_name: string;
  other5_name: string;
  other6_name: string;
  other7_name: string;
  other8_name: string;
}