import { Spin } from 'antd';
import { Fragment, useEffect, useState } from 'react'
import { PDFShowOnDevice } from '../PdfShowOnDevice';
import { Page, Document, View, Text, Image } from '@react-pdf/renderer';
import { MakeStyles, FormatName, PDFProps, ArrayOtherName } from "./Helper"
// Image
import PhuketLogo from "@/assets/images/logo-phuket.jpg";
import { CommaNumber, ConvertToDateISOToThai } from '@/helper/FunctionHelper';

// Create styles
const styles = MakeStyles();

function PDFDepartment({ data }: PDFProps) {
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
                <Text style={[styles.colItem, styles.w75]}>เงินประจำตำแหน่ง   </Text>
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
                <Text style={[styles.colItem, styles.w75]}>กรมสรรพากร (กยศ.)</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.revenue_department, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>ประกันสังคม</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.social_security_deduction + data.social_security_welfare, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์ฯข้าราชการอบจ.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.oba_coop, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์ฯครู ภูเก็ต</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.teachers_savings_coop, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์ฯ รพช.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.rhs_coop, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์ฯ ปลัดกระทรวงสาธารณสุข</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.ministry_of_public_health_coop, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>เงินกู้ธ.กรุงไทย</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.krung_thai_bank, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>เงินกู้ธ.ออมสิน สาขาภูเก็ต</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.phuket_savings_branch, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>เงินกู้ธ.ออมสิน สาขาเซ็นทรัล</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.central_world_savings_branch, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์ออมทรัพย์สาธารณสุข จำกัด </Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.public_health_cooperative, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>ช.พ.ค.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.cpkp, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>ช.พ.ส.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.cpks, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>ฌปค.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.dpc, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>กฌ.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.gc, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>เงินกู้ ธ.อิสลาม</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.islamic_bank_loan, 2)}</Text>
              </View>

              {ArrayOtherName({ data, length: 5 }).map((other, idx) => (
                <View key={idx + other.OtherName} style={styles.col}>
                  <Text style={styles.w15}></Text>
                  <Text style={[styles.colItem, styles.w75]}>{other.OtherName + "   "}</Text>
                  <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(other.OtherValue, 2)}</Text>
                </View>
              ))}

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.colItem, styles.textBold, { width: "20%" }]}>รวมรายจ่าย</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.actual_pay, 2)}</Text>
              </View>

              <View style={[{ marginTop: "auto" }]}></View>
              <View style={[styles.col, { display: "flex", alignContent: "flex-end", justifyContent: "flex-end" }]}>
                <Text style={[styles.colItem, styles.textBold, { width: "20%" }]}>รับสุทธิ</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.textBold, { width: "80%", textDecoration: "underline" }]}>{CommaNumber(data.received, 2)}</Text>
              </View>
              <View>
                <Text style={[{ marginTop: "5px", width: "100%" }]}>หมายเหตุ: โอนเงินเข้าบัญชีวันที่ 25 {ConvertToDateISOToThai(data.created_at)}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFShowOnDevice>
    </Fragment>
  )
}

export default PDFDepartment