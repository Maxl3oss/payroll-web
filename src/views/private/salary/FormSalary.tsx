import DatePickerTH from "@/components/DatePickerTH";
import UploadDragger from "@/components/UploadDragger";
import { ValidateFileType } from "@/helper/FunctionHelper";
import { GetDDLSalaryType, GetSalaryOther, UploadSalary } from "@/services/Salary.Serivces";
import { IDropdown, IResponse, SalaryTypeName } from "@/types/global";
import { App, Button, Form, GetProp, Select, UploadProps } from "antd";
import { Input, UploadFile } from "antd/lib";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

type OtherName = {
  other1_name: string;
  other2_name: string;
  other3_name: string;
  other4_name: string;
  other5_name: string;
  other6_name: string;
  other7_name: string;
  other8_name: string;
}

type IFormData = OtherName & {
  month: string;
  type: number;
}

type IDataType = {
  id: number;
  name: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function FormSalary() {
  const [form] = Form.useForm<IFormData>();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dateNow = dayjs();
  const [otherAmount, setOtherAmount] = useState(0);
  const [dataType, setDataType] = useState<IDropdown<number>[]>([]);
  const [formUpload, setFormUpload] = useState<{ fileList: UploadFile[] }>({
    fileList: [],
  });

  useEffect(() => {
    Promise.all([fetchDataType()]);
  }, []);


  const fetchDataType = async () => {
    const res: IResponse<IDataType[]> = await GetDDLSalaryType();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      const format: IDropdown<number>[] = res.data.map(curr => ({ value: curr?.id, label: curr?.name }));
      setDataType(format);
    }
  };

  const fetchSalaryOther = async (type: number) => {
    const res: IResponse<OtherName> = await GetSalaryOther(type);
    if (res && (res.statusCode === 200 && res.taskStatus && res?.data)) {
      // const otherFields = Array.from({ length: 8 }, (_, i) => `other${i + 1}_name`);
      // form.setFieldsValue(
      //   Object.fromEntries([otherFields.map(field => [field, ""])])
      // );
      form.setFieldsValue({
        other1_name: res.data.other1_name,
        other2_name: res.data.other2_name,
        other3_name: res.data.other3_name,
        other4_name: res.data.other4_name,
        other5_name: res.data.other5_name,
        other6_name: res.data.other6_name,
        other7_name: res.data.other7_name,
        other8_name: res.data.other8_name,
      });
    }
  }

  const setAmountOther = (otherName: SalaryTypeName | string | undefined) => {
    let amount = 0;
    switch (otherName) {
      case "รพสต.":
        amount = 5;
        break;
      case "สจ.":
        amount = 2;
        break;
      case "บำนาญข้าราชการ":
        amount = 8;
        break;
      case "บำนาญครู":
        amount = 5;
        break;
      case "บำเหน็จรายเดือน":
        amount = 5;
        break;
      case "ฝ่ายประจำ":
        amount = 5;
        break;
      case "เงินเดือนครู":
        amount = 5;
        break;
      default:
        amount = 0;
        break;
    }
    setOtherAmount(amount);
  };

  const setDataOtherName = (key: keyof IFormData, value: string) => {
    setFormUpload(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    // set data
    const getField = form.getFieldsValue();
    const dataSend = new FormData();
    dataSend.append("month", new Date(getField.month).toISOString());
    dataSend.append("type", (getField?.type ?? 0).toString());
    dataSend.append("other1_name", getField?.other1_name ?? "");
    dataSend.append("other2_name", getField?.other2_name ?? "");
    dataSend.append("other3_name", getField?.other3_name ?? "");
    dataSend.append("other4_name", getField?.other4_name ?? "");
    dataSend.append("other5_name", getField?.other5_name ?? "");
    dataSend.append("other6_name", getField?.other6_name ?? "");
    dataSend.append("other7_name", getField?.other7_name ?? "");
    dataSend.append("other8_name", getField?.other8_name ?? "");
    formUpload.fileList.map((file) => {
      dataSend.append("files[]", file as FileType);
    });
    // console.log(dataSend)
    // return;
    // send data
    setLoading(true);
    const res = await UploadSalary(dataSend);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      // clear 
      reset();

      // move
      message.success("บันทึกข้อมูลสำเร็จ!");
      navigate("/salary");
      return;
    }

    message.error("บันทึกข้อมูลไม่สำเร็จ! => " + res?.message ?? "" + "!");
  };

  const reset = () => {
    form.resetFields();
    setOtherAmount(0);
    setFormUpload({ fileList: [] });
  };

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>เพิ่มข้อมูลเงินเดือน</h1>
        </div>
        <Form
          form={form}
          initialValues={{
            month: dateNow,
            other1_name: "",
            other2_name: "",
            other3_name: "",
            other4_name: "",
            other5_name: "",
            other6_name: "",
            other7_name: "",
            other8_name: "",
          }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="flex flex-wrap">
            <Form.Item
              label="ช่วงเวลา"
              name="month"
              rules={[{ required: true, message: "กรุณาเลือกช่วงเวลา" }]}
              className="w-full lg:w-1/2 xl:w-1/3 pad-main"
            >
              <DatePickerTH
                picker="month"
                // onChange={onChangeDate}
                disabledDate={(d) => dateNow != null && d.isAfter(dateNow) && !d.isSame(dateNow, 'month')}
              />
            </Form.Item>
            <Form.Item
              label="รูปแบบ"
              name="type"
              rules={[{ required: true, message: "กรุณาเลือกรูปแบบ" }]}
              className="w-full lg:w-1/2 xl:w-1/3 pad-main"
            >
              <Select
                style={{ width: "100%" }}
                onChange={(value) => {
                  fetchSalaryOther(value);
                  const formatName = dataType.find(curr => curr.value === value);
                  setAmountOther(formatName?.label);
                }}
                options={dataType}
              />
            </Form.Item>
          </div>
          <div className="flex flex-wrap">
            {Array.from({ length: otherAmount }).map((_, idx) => {
              const fieldName = `other${idx + 1}_name` as keyof IFormData;
              return (
                <Form.Item
                  key={fieldName}
                  label={`อื่นๆ ช่องที่ ${idx + 1}`}
                  name={fieldName}
                  className="w-full lg:w-1/2 xl:w-1/3 pad-main"
                  getValueProps={(v) => {
                    return ({ name: fieldName, value: v });
                  }}
                >
                  <Input
                    type="text"
                    onChange={(e) => setDataOtherName(fieldName, e.target.value)}
                  />
                </Form.Item>
              );
            })}
          </div>
          <Form.Item
            label="อัปโหลดไฟล์"
            name="fileList"
            rules={[
              { required: true, message: "" },
              () => ({
                validator() {
                  if (formUpload.fileList.length > 0) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("กรุณาอัปโหลดอย่างน้อย 1 ไฟล์"));
                  }
                },
              }),
            ]}
            className="w-full pad-main"
            extra="รองรับเฉพาะไฟล์ (excel)"
          >
            <UploadDragger
              accept={".xlsx, .xls"}
              fileList={formUpload.fileList}
              beforeUpload={(file: UploadFile) => {
                const isAllowedType = ValidateFileType(file, "xlsx");
                if (!isAllowedType) {
                  message.warning(`กรุณาอัปโหลดเฉพาะไฟล์ Excel (.xlsx)`);
                  return false;
                }
                setFormUpload(prev => ({
                  ...prev,
                  fileList: [...prev.fileList, file]
                }))
                return false;
              }}
              onRemove={(file) => {
                const index = formUpload.fileList.indexOf(file);
                const newFileList = formUpload.fileList.slice();
                newFileList.splice(index, 1);
                setFormUpload(prev => ({
                  ...prev,
                  fileList: newFileList
                }))
              }}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-x-5 mt-20">
            <Button loading={loading} type="primary" htmlType="submit">
              บันทึก
            </Button>
            <Button
              htmlType="reset"
              onClick={() => reset()}>
              ล้างค่า
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  )
}

export default FormSalary