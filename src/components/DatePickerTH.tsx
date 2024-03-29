import { DatePickerProps } from 'antd/es/date-picker'
import dayjs from "dayjs";
import th from "antd/es/date-picker/locale/th_TH";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { DatePicker } from 'antd';
// import th_TH from "antd/locale/th_TH";

dayjs.locale("th");
dayjs.extend(buddhistEra);

function DatePickerTH(props: DatePickerProps) {
  /* 
  * disable date
  */
  // const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  //   return current && current < dayjs().endOf("day");
  // };

  const buddhistLocale: typeof th = {
    ...th,
    lang: {
      ...th.lang,
      fieldDateFormat: "DD MMMM BBBB",
      fieldDateTimeFormat: "DD MMMM BBBB HH:mm:ss",
      fieldMonthFormat: "MMMM BBBB",
      yearFormat: "BBBB",
      cellYearFormat: "BBBB",
    },
  };

  return (
    <DatePicker
      style={{ width: "100%" }}
      // disabledDate={disabledDate}
      locale={buddhistLocale}
      {...props}
    />

  )
}

export default DatePickerTH