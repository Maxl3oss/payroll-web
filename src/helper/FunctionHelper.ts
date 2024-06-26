import { IDropdown, IPagin, IResponse } from "@/types/global";
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


<<<<<<< HEAD
export function DecryptData(data: string, secretKey: string): IResponse {
=======
export function DecryptData(data: string, secretKey: string): object {
>>>>>>> 3cb839e (update make decrypt response)
  try {
    const iv = CryptoJS.enc.Hex.parse(data.substring(0, 32));
    const ct = CryptoJS.enc.Hex.parse(data.substring(32));
    const key = CryptoJS.enc.Utf8.parse(secretKey);

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: ct,
      iv: iv,
      key: key
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      mode: CryptoJS.mode.CBC,
      iv: iv
    });

    const text = decrypted.toString(CryptoJS.enc.Utf8);
<<<<<<< HEAD
    const res = JSON.parse(text);
    res.data = res?.data ? res.data : null;
    return res;
  } catch (err) {
    return {
      statusCode: 500,
      taskStatus: false,
      message: err as string,
      data: null,
    };
  }
}

export function ErrorResDecryptData(error: unknown, secretKey: string): IResponse {
  if (error instanceof Error && "response" in error) {
    const axiosError = error as { response?: { data: string } };
    return DecryptData(axiosError.response?.data || "", secretKey);
  }
  throw {
    statusCode: 500,
    taskStatus: false,
    message: error as string,
    data: null,
  };
=======
    // console.log("Result : " + text);
    // return decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(text)
  } catch (err) {
    console.error("Error decrypt : " + err);
    return {};
  }
>>>>>>> 3cb839e (update make decrypt response)
}