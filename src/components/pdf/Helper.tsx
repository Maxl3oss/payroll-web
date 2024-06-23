import { ISalary } from "@/types/global";
import { Font, StyleSheet } from "@react-pdf/renderer";

//  ำ to ํ + า
export const FormatName = (name: string) => (
  name.replace("ำ", "ํา")
);

export type PDFProps = {
  data: ISalary;
}

export type PDFOtherProps = PDFProps & {
  length: number;
}

export type PDFOther = {
  OtherId: number;
  OtherName: string;
  OtherValue: number;
}

export function MakeStyles() {
  // Create font
  Font.register({
    family: "THSarabunPSK",
    format: "truetype",
    fonts: [
      {
        src: "/fonts/Sarabun/Sarabun-Regular.ttf",
      },
      {
        src: "/fonts/Sarabun/Sarabun-Bold.ttf",
        fontStyle: "bold"
      }
    ],
  });

  return StyleSheet.create({
    page: {
      fontFamily: "THSarabunPSK",
      fontStyle: "normal",
      fontSize: "12pt"
    },
    sectionImage: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      width: "30%",
    },
    sectionTitle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 3,
      width: "70%",
    },
    imageLogo: {
      width: "70pt",
      height: "70pt",
      objectFit: "contain",
    },
    textTitle: {
      fontSize: "14pt",
      fontStyle: "bold",
      marginTop: "5px",
    },
    padMain: {
      paddingTop: "4pt"
    },
    col: {
      flexDirection: "row",
      width: "100%",
    },
    colItem: {
      marginTop: "5px"
    },
    w75: {
      width: "70%",
    },
    w15: {
      width: "15%"
    },
    w50: {
      width: "50%",
    },
    textBold: {
      fontStyle: "bold"
    },
    textEnd: {
      textAlign: "right",
    }
  });
}

export function ArrayOtherName({ data, length }: PDFOtherProps): PDFOther[] {
  const arr: PDFOther[] = [];
  const otherValue = [
    { value: data.other1, name: data.salary_other.other1_name },
    { value: data.other2, name: data.salary_other.other2_name },
    { value: data.other3, name: data.salary_other.other3_name },
    { value: data.other4, name: data.salary_other.other4_name },
    { value: data.other5, name: data.salary_other.other5_name },
    { value: data.other6, name: data.salary_other.other6_name },
    { value: data.other7, name: data.salary_other.other7_name },
    { value: data.other8, name: data.salary_other.other8_name },
  ]
  
  const sliceArr = otherValue.slice(0, length);

  sliceArr.forEach((curr, idx) => {
    if (curr.name !== "") {
      arr.push({
        OtherId: idx + 1,
        OtherName: curr.name,
        OtherValue: curr.value,
      });
    }
  })

  return arr;
}