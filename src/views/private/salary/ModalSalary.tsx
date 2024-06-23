import { App, Button, Form, Modal, Popconfirm, Select } from 'antd'
import { Fragment, useState } from 'react'
import DatePickerTH from '@/components/DatePickerTH';
import dayjs from 'dayjs';
import { DeleteMany } from '@/services/Salary.Serivces';
import { IDropdown, ISalary } from '@/types/global';
import PDFComponents from '@/components/pdf/PDFComponents';

type IDataModal = {
  isOpen: boolean;
  data: ISalary | null;
}

type Props = {
  dataModal: IDataModal;
  dataType: IDropdown<number>[];
  setDataModal: (val: IDataModal) => void;
  openDelete: boolean;
  closeDelete: (val: boolean) => void;
  onFetch: () => void;
}

function ModalSalary({ dataModal, dataType, setDataModal, openDelete, closeDelete, onFetch }: Props) {
  const { message } = App.useApp();
  const [month, setMonth] = useState("");
  const [type, setType] = useState(0);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    const res = await DeleteMany(month, type.toString());
    if (res && res.statusCode === 200 && res.taskStatus) {
      message.success("ลบข้อมูลเรียบร้อย");
      onFetch();
      handleClose();
      return
    }
    message.error("ไม่สำเร็จ => " + res.message);
  }

  const handleClose = () => {
    setMonth("");
    closeDelete(false);
    form.resetFields();
  }

  return (
    <Fragment>
      {dataModal.isOpen && dataModal.data ?
        <Modal
          style={{ top: 5 }}
          width={1000}
          title={`สลิป${dataModal.data.salary_type.name}`}
          open={dataModal.isOpen}
          onCancel={() => setDataModal({ isOpen: false, data: null })}
          onOk={() => setDataModal({ isOpen: false, data: null })
          }>
          <PDFComponents data={dataModal.data} />
        </Modal>
        : null}

      {openDelete ?
        <Modal
          title="ลบข้อมูล"
          open={openDelete}
          footer={false}
          onCancel={handleClose}
        >
          <div className="w-full my-5 pad-main">
            <Form form={form} initialValues={{ "type": "ทั้งหมด" }} layout="vertical" onFinish={handleDelete}>
              <Form.Item
                label="ช่วงเวลาที่ต้องการลบ"
                name="month"
                rules={[{ required: true, message: "กรุณาเลือกช่วงเวลา" }]}
                className="w-full pad-main"
              >
                <DatePickerTH
                  picker="month"
                  onChange={(e) => setMonth(e.toISOString())}
                  value={month !== "" ? dayjs(month) : null}
                />
              </Form.Item>
              <Form.Item
                label="รูปแบบ"
                name="type"
                rules={[{ required: ![0, 1, 2, 3, 5, 6, 7].includes(type), message: "กรุณาเลือกรูปแบบ" }]}
                className="w-full pad-main"
              >
                <Select
                  style={{ width: "100%" }}
                  value={type}
                  onChange={(value) => setType(value)}
                  options={dataType}
                />
              </Form.Item>

              <Form.Item>
                <div className="flex gap-x-3 justify-end">
                  <Button
                    onClick={handleClose}
                    htmlType="button"
                    type="default"
                  >
                    ยกเลิก
                  </Button>
                  <Popconfirm
                    title="คุณแน่ใจ?"
                    description="คุณต้องการลบข้อมูลในเดือนนี้ ใช่หรือไม!"
                    okText="ตกลง"
                    cancelText="ยกเลิก"
                    onConfirm={async () => {
                      await form.submit();
                    }}
                  >
                    <Button htmlType="button" type="primary">
                      ลบข้อมูล
                    </Button>
                  </Popconfirm>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        : null}
    </Fragment>
  )
}

export default ModalSalary