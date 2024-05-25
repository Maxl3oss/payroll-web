import DatePickerTH from "@/components/DatePickerTH";
import UploadDragger from "@/components/UploadDragger";
import { ValidateFileType } from "@/helper/FunctionHelper";
import { GetDDLSalaryType, UploadSalary } from "@/services/Salary.Serivces";
import { IDropdown } from "@/types/global";
import { App, Button, Form, GetProp, Select, UploadProps } from "antd";
import { DatePickerProps, UploadFile } from "antd/lib";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

type IFormData = {
  month: string;
  fileList: UploadFile[];
  type: number;
}

type IDataType = {
  id: number;
  name: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function FormSalary() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dateNow = dayjs();
  const [dataType, setDataType] = useState<IDropdown<number>[]>([]);
  const [formData, setFormData] = useState<IFormData>({
    month: dateNow.toISOString(),
    fileList: [],
    type: 0,
  });

  useEffect(() => {
    Promise.all([fetchDataType()]);
  }, []);

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setFormData({
      ...formData,
      month: date.toISOString(),
    });
  };

  const fetchDataType = async () => {
    const res = await GetDDLSalaryType();
    if (res && res.statusCode === 200 && res.taskStatus) {
      const dataRes: IDataType[] = res?.data;
      const format: IDropdown<number>[] = dataRes.map(curr => ({ value: curr?.id, label: curr?.name }));
      setDataType(format);
    }
  }

  const handleSubmit = async () => {
    // set data
    const dataSend = new FormData();
    dataSend.append("month", formData.month);
    dataSend.append("type", formData?.type?.toString());
    formData.fileList.map((file) => {
      dataSend.append("files[]", file as FileType);
    });

    // send data
    setLoading(true);
    const res = await UploadSalary(dataSend);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      // clear 
      setFormData({
        month: "",
        fileList: [],
        type: 0,
      });

      // move
      message.success("บันทึกข้อมูลสำเร็จ!");
      navigate("/salary");
      return;
    }

    message.error("บันทึกข้อมูลไม่สำเร็จ! => " + res?.message ?? "" + "!");
  };

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>เพิ่มข้อมูลเงินเดือน</h1>
        </div>
        <Form initialValues={{ "month": dateNow }} layout="vertical" onFinish={handleSubmit}>
          <div className="flex flex-wrap">
            <Form.Item
              label="ช่วงเวลา"
              name="month"
              rules={[{ required: true, message: "กรุณาเลือกช่วงเวลา" }]}
              className="w-full lg:w-1/2 xl:w-1/3 pad-main"
            >
              <DatePickerTH
                picker="month"
                onChange={onChangeDate}
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
                onChange={(value) => setFormData(prev => ({ ...prev, type: Number(value || 0) }))}
                options={dataType}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="อัปโหลดไฟล์"
            name="fileList"
            rules={[
              { required: true, message: "" },
              () => ({
                validator() {
                  if (formData.fileList.length > 0) {
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
              fileList={formData.fileList}
              beforeUpload={(file: UploadFile) => {
                const isAllowedType = ValidateFileType(file, "xlsx");
                if (!isAllowedType) {
                  message.warning(`กรุณาอัปโหลดเฉพาะไฟล์ Excel (.xlsx)`);
                  return false;
                }
                setFormData(prev => ({
                  ...prev,
                  fileList: [...prev.fileList, file]
                }))
                return false;
              }}
              onRemove={(file) => {
                const index = formData.fileList.indexOf(file);
                const newFileList = formData.fileList.slice();
                newFileList.splice(index, 1);
                setFormData(prev => ({
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
              onClick={() => {
                setFormData({
                  month: dateNow.toISOString(),
                  fileList: [],
                  type: 0
                })
              }}>
              ล้างค่า
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  )
}

export default FormSalary