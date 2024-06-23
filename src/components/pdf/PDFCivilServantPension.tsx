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

function PDFCivilServantPension({ data }: PDFProps) {
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
              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.w75, styles.textBold]}>เงินเพิ่มบำนาญ   </Text>
                <Text style={styles.w15}></Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.increase_pension, 2)}</Text>
              </View>

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.w75, styles.textBold]}>เงินบำนาญปกติ   </Text>
                <Text style={styles.w15}></Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.normal_pension, 2)}</Text>
              </View>

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.w75, styles.textBold]}>ช.ค.บ.</Text>
                <Text style={styles.w15}></Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.lump_sum, 2)}</Text>
              </View>

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.textBold, { width: "20%" }]}>รวม</Text>
                <Text style={[styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.total_income, 2)}</Text>
              </View>

              {/* รายจ่าย */}
              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.w15, styles.textBold]}>หัก</Text>
                <Text style={styles.w75}>ภาษี</Text>
                <Text style={[styles.textEnd, styles.w15]}>{CommaNumber(data.tax, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>กบข.</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.cooperative, 2)}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.w15}></Text>
                <Text style={[styles.colItem, styles.w75]}>สหกรณ์</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(data.teachers_savings_coop, 2)}</Text>
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

              {ArrayOtherName({ data, length: 8 }).map((other, idx) => (
                <View key={idx + other.OtherName} style={styles.col}>
                  <Text style={styles.w15}></Text>
                  <Text style={[styles.colItem, styles.w75]}>{other.OtherName + "   "}</Text>
                  <Text style={[styles.colItem, styles.textEnd, styles.w15]}>{CommaNumber(other.OtherValue, 2)}</Text>
                </View>
              ))}

              <View style={[styles.col, { marginTop: "2mm" }]}>
                <Text style={[styles.colItem, styles.textBold, { width: "20%" }]}>รวมหัก</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.textBold, { width: "80%" }]}>{CommaNumber(data.actual_pay, 2)}</Text>
              </View>

              <View style={[{ marginTop: "auto" }]}></View>
              <View style={[styles.col, { display: "flex", alignContent: "flex-end", justifyContent: "flex-end" }]}>
                <Text style={[styles.colItem, styles.textBold, { width: "20%" }]}>คงเหลือรับจริง</Text>
                <Text style={[styles.colItem, styles.textEnd, styles.textBold, { width: "80%", textDecoration: "underline" }]}>{CommaNumber(data.received, 2)}</Text>
              </View>
              <View>
                <Text style={[{ marginTop: "5px", width: "100%" }]}>หมายเหตุ: โอนเงินเข้าบัญชีวันที่ 23 {ConvertToDateISOToThai(data.created_at)}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFShowOnDevice>
    </Fragment>
  )
}

export default PDFCivilServantPension