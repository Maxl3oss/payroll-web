import { Spin } from 'antd';
import { Fragment, useEffect, useState } from 'react'
import { PDFShowOnDevice } from '../PdfShowOnDevice';
import { Page, Document, View, Text, Image } from '@react-pdf/renderer';
import { MakeStyles, FormatName, PDFProps } from "./Helper"
// Image
import PhuketLogo from "@/assets/images/logo-phuket.jpg";
import { CommaNumber, ConvertToDateISOToThai } from '@/helper/FunctionHelper';

// Create styles
const styles = await MakeStyles();

function PDFHospital({ data }: PDFProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000)
  }, []);

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
          <Page size="A4" style={styles.page}>
            <View style={[{ width: "100%", height: "100%", padding: "5cm 3.5cm" }]}>
              <View style={[styles.col, { marginBottom: "10mm" }]}>
                <View style={styles.sectionImage}>
                  <Image style={styles.imageLogo} src={PhuketLogo} cache={false} />
                </View>
                <View style={styles.sectionTitle}>
                  <Text style={styles.textTitle}>องค์การบริหารส่วนจังหวัดภูเก็ต</Text>
                  <Text style={styles.textTitle}>ประจำเดือน {ConvertToDateISOToThai(data.created_at)}</Text>
                  <Text style={styles.textTitle}>{FormatName(data.full_name)}</Text>
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
                <Text style={[styles.colItem, styles.w75]}>เงินประจำตำแหน่ง</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.fixed_income, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>เงินค่าตอบแทนรายเดือน</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.monthly_compensation, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>เงินเพิ่มค่าครองชีพชั่วคราว</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.additional_benefits, 2)}</Text>
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
                <Text style={[styles.colItem, styles.w75]}>กบข.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.cooperative, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์ฯ สาธารณสุข</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.public_health_cooperative, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>กรมสรรพากร (กยศ.)</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.revenue_department, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>ฌกส.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.dgs, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>ธนาคารกรุงเทพ</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.bangkok_bank, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>อื่น ๆ</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.other, 2)}</Text>
              </View>

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.colItem, styles.textBold, { width: "20%" }]}>รวมรายจ่าย</Text>
                {/* <Text style={[styles.textBold, { width: "20%" }]}></Text> */}
                <Text style={[styles.colItem, styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.actual_pay, 2)}</Text>
              </View>

              <View style={[{ marginTop: "auto" }]}></View>
              <View style={[styles.col, { display: "flex", alignContent: "flex-end", justifyContent: "flex-end" }]}>
                <Text style={[styles.colItem, styles.textBold, { width: "20%" }]}>รับสุทธิ</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.textBold, { width: "80%", textDecoration: "underline" }]}>{CommaNumber(data.received, 2)}</Text>
              </View>
              <View>
                <Text style={[{ marginTop: "5px", width: "100%" }]}>ข้าราชการถ่ายโอน รพ.สต.</Text>
                <Text style={[{ marginTop: "5px", width: "100%" }]}>หมายเหตุ: โอนเงินเข้าบัญชีวันที่ 25 {ConvertToDateISOToThai(data.created_at)}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFShowOnDevice>
    </Fragment>
  )
}

export default PDFHospital