import PDFSalary from '@/components/pdf/PDFSalary'
import { App, Button, Form, Modal, Popconfirm } from 'antd'
import { Fragment, useState } from 'react'
import { ISalary } from './MainSalary';
import DatePickerTH from '@/components/DatePickerTH';
import dayjs from 'dayjs';
import { DeleteMany } from '@/services/Salary.Serivces';

type IDataModal = {
  isOpen: boolean;
  data: ISalary | null;
}

type Props = {
  dataModal: IDataModal;
  setDataModal: (val: IDataModal) => void;
  openDelete: boolean;
  closeDelete: (val: boolean) => void;
  onFetch: () => void;
}

function ModalSalary({ dataModal, setDataModal, openDelete, closeDelete, onFetch }: Props) {
  const { message } = App.useApp();
  const [month, setMonth] = useState("");
  const [form] = Form.useForm();

  const handleDelete = async () => {
    const res = await DeleteMany(month);
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
        <Modal width={700} title="สลิป รพ.สต." open={dataModal.isOpen} onCancel={() => setDataModal({ isOpen: false, data: null })} onOk={() => setDataModal({ isOpen: false, data: null })}>
          <PDFSalary data={dataModal.data} />
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
            <Form form={form} layout="vertical" onFinish={handleDelete}>
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