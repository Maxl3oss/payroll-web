import { Spin } from 'antd';
import { Fragment, useEffect, useState } from 'react'
import { PDFShowOnDevice } from '../PdfShowOnDevice';
import { Page, Document, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
// Image
import PhuketLogo from "@/assets/images/logo-phuket.jpg";
import { ISalary } from '@/views/private/salary/MainSalary';
import { CommaNumber, ConvertToDateISOToThai } from '@/helper/FunctionHelper';

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

// Create styles
const styles = StyleSheet.create({
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
    objectFit: "cover",
  },
  textTitle: {
    fontSize: "14pt",
    fontStyle: "bold",
  },
  padMain: {
    paddingTop: "4pt"
  },
  col: {
    // border: 1,
    // borderColor: "red",
    flexDirection: "row",
    width: "100%"
  },
  // w15: {
  //   width: "15%"
  // },
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

type Props = {
  data: ISalary;
}

function PDFSalary({ data }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000)
  }, []);

  const formatName = (name: string) => (
    name.replace("ำ", "ํา")
  );
  return (
    <Fragment>
      {isLoading
        ?
        <div className="pt-36">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
        : null}
      <PDFShowOnDevice isUse={true}>
        <Document
          onRender={() => setIsLoading(false)}
        >
          <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[{ width: "50%", height: "100%", padding: "10mm 15mm", border: 1 }]}>
              <View style={[styles.col, { marginBottom: "10mm" }]}>
                <View style={styles.sectionImage}>
                  <Image style={styles.imageLogo} src={PhuketLogo} cache={false} />
                </View>
                <View style={styles.sectionTitle}>
                  <Text style={styles.textTitle}>องค์การบริหารส่วนจังหวัดภูเก็ต</Text>
                  <Text style={styles.textTitle}>ประจำเดือน {ConvertToDateISOToThai(data.created_at)}</Text>
                  <Text style={styles.textTitle}>{formatName(data.full_name)}</Text>
                </View>
              </View>

              {/* รายรับ */}
              <View style={styles.col}>
                <Text style={styles.w15}>รายรับ</Text>
                <Text style={styles.w75}>เงินเดือน</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.salary, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>เงินประจำตำแหน่ง</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.fixed_income, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>เงินค่าตอบแทนรายเดือน</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.monthly_compensation, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>เงินเพิ่มค่าครองชีพชั่วคราว</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.additional_benefits, 2)}</Text>
              </View>

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.textBold, { width: "20%" }]}>รวมรายรับ</Text>
                <Text style={[styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.total_income, 2)}</Text>
              </View>

              {/* รายจ่าย */}
              <View style={[styles.col, { marginTop: "3mm", paddingTop: "3mm", borderTop: 1 }]}>
                <Text style={styles.w15}>รายจ่าย</Text>
                <Text style={styles.w75}>ภาษีหัก ณ ที่จ่าย</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.tax, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>กบข.</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.coop, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>สหกรณ์ฯ สาธารสุข</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.public_health_cooperative, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>กรมสรรพากร (กยศ.)</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.revenue_department, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>ฌกส.</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.dgs, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={styles.w75}>ธนาคารกรุงเทพ</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.bangkok_bank, 2)}</Text>
              </View>

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.textBold, { width: "20%" }]}>รวมรายหัก</Text>
                {/* <Text style={[styles.textBold, { width: "20%" }]}></Text> */}
                <Text style={[styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.actual_pay, 2)}</Text>
              </View>

              <View style={[{ marginTop: "auto" }]}></View>
              <View style={[styles.col, { display: "flex", alignContent: "flex-end", justifyContent: "flex-end" }]}>
                <Text style={[styles.textBold, { width: "20%" }]}>รับสุทธิ</Text>
                <Text style={[styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.received, 2)}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFShowOnDevice>
    </Fragment>
  )
}

export default PDFSalary