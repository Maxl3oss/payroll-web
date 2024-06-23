import { IDropdown, IPagin } from "@/types/global";
import { UploadFile } from "antd/lib";
import dayjs from "dayjs";
import CryptoJS from "crypto-js";

export function CommaNumber(num: number | string, units = 0): string {
  if (!num || num === undefined || num === "") num = 0;

  const options: Intl.NumberFormatOptions = {
    style: "decimal",
    minimumFractionDigits: units,
    maximumFractionDigits: units
  };

  if (typeof num === "string") {
    num = parseFloat(num);
  }

  return num.toLocaleString("en-GB", options);
}

export function IndexTable(pagin: IPagin, index: number) {
  return CommaNumber((pagin.pageNumber - 1) * pagin.pageSize + (index + 1))
}

export const ValidateFileType = ({ type }: UploadFile, allowedTypes?: "xlsx" | "pdf" | "img") => {
  let useType: string[] = [];

  switch (allowedTypes) {
    case "xlsx":
      useType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
      break;
    case "pdf":
      useType = ["application/pdf"];
      break;
    case "img":
      useType = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
      break;
    default:
      return true; // Allow any file type if allowedTypes is not specified
  }

  // If type is not specified or allowedTypes is not recognized, return true
  if (!type || useType.length === 0) {
    return true;
  }

  // Check if the file type is among the allowed types
  return useType.includes(type);
};

// iso to มีนาคม 2567
export function ConvertToDateISOToThai(timestamp: string, format = "MMMM BBBB"): string {
  // Parse the timestamp
  const date = dayjs(timestamp);

  // Set locale to Thai
  dayjs.locale("th");

  // Format the date
  const formattedDate: string = date.format(format);

  return formattedDate;
}

export function FormatPhoneNumber(phoneNumber: string) {
  // Remove all non-digit characters from the phone number
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned phone number has 10 digits (assuming it's for a specific country)
  if (cleaned.length === 10) {
    // Format the phone number as (XXX) XXX-XXXX
    return cleaned.substring(0, 3) + '-' + cleaned.substring(3, 6) + '-' + cleaned.substring(6);
  } else {
    // If the phone number doesn't have 10 digits, return it as is
    return phoneNumber;
  }
}

export function GetYearDropdown(startYear: number, endYear?: number): IDropdown<number>[] {
  const currentYear = new Date().getFullYear();
  const finalYear = (endYear || currentYear) + 543;
  const years: IDropdown<number>[] = [];

  for (let year = startYear; year <= finalYear + 1; year++) {
    years.push({ value: year, label: year.toString() });
  }

  return years;
}

// export const DecryptedJSON = (encryptedData: string) => CryptoJS.AES.decrypt(encryptedData, "Zi4VwqYgHXNbBQRRETetjPZVRHKibAux").toString(CryptoJS.enc.Utf8);

export function DecryptedJSON(encryptedData: string) {
  const decData = CryptoJS.enc.Base64.parse(encryptedData).toString(CryptoJS.enc.Utf8)
  const bytes = CryptoJS.AES.decrypt(decData, "Zi4VwqYgHXNbBQRRETetjPZVRHKibAux").toString(CryptoJS.enc.Utf8)
  return JSON.parse(bytes)
}