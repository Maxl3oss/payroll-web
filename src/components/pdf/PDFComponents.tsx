import { ISalary, SalaryTypeName } from '@/types/global';
import { Fragment } from 'react/jsx-runtime';
import PDFProvincial from './PDFProvincial';
import PDFHospital from './PDFHospital';
import PDFDepartment from './PDFDepartment';
import PDFTeacherSalary from './PDFTeacherSalary';
import PDFTeacherPension from './PDFTeacherPension';
import PDFSalaryMonthlyPension from './PDFSalaryMonthlyPension';
import PDFCivilServantPension from './PDFCivilServantPension';

type Props = {
  data: ISalary;
}

function PDFComponents({ data }: Props) {
  const ChooseShow = (name: SalaryTypeName) => {
    switch (name) {
      case "รพสต.":
        return <PDFHospital data={data} />;
      case "สจ.":
        return <PDFProvincial data={data} />;
      case "ฝ่ายประจำ":
        return <PDFDepartment data={data} />;
      case "เงินเดือนครู":
        return <PDFTeacherSalary data={data} />;
      case "บำนาญครู": 
        return <PDFTeacherPension data={data} />;
      case "บำเหน็จรายเดือน": 
        return <PDFSalaryMonthlyPension data={data} />;
      case "บำนาญข้าราชการ": 
        return <PDFCivilServantPension data={data} />;
      default:
        return (
          <Fragment>
            ไม่พบรูปแบบ
          </Fragment>
        )
    }
  }

  return (
    <Fragment>
      {ChooseShow(data.salary_type.name)}
    </Fragment>
  )
}

export default PDFComponents