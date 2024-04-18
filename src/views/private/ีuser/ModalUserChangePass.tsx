import { Button, Form, Input, Modal, App } from 'antd'
import { Fragment } from 'react'
import { UpdatePassByAdmin, UpdatePassByUser } from '@/services/User.Servives';

type Data = {
  prev_password: string;
  password: string;
  confirm_password: string;
}

type Props = {
  uid: string;
  open: boolean;
  isProfile: boolean;
  setOpen: (val: boolean) => void;
}

function ModalUserChangePass({ uid, open, isProfile, setOpen }: Props) {
  const { message } = App.useApp();
  const [form] = Form.useForm<Data>();

  const handleSubmit = async (value: Data) => {
    const res = isProfile ? await UpdatePassByUser(uid, value) : await UpdatePassByAdmin(uid, value);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      message.success("อัพเดทรหัสผ่านสำเร็จ");
      handleClose();
      return
    }
    message.error("ไม่สำเร็จ => " + res.message);
  }

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setFieldValue(name, value);
  };

  return (
    <Fragment>
      <Modal
        title="เปลี่ยนรหัสผ่าน"
        open={open}
        footer={false}
        onCancel={handleClose}
      >
        <div className="w-full my-5 pad-main">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {isProfile ? (
              <Form.Item
                label="รหัสผ่านเก่า"
                name="prev_password"
                rules={[
                  { required: true, message: "กรุณากรอกรหัสผ่าน" },
                ]}
                className="w-full pad-main"
              >
                <Input.Password
                  type="password"
                  className="border rounded"
                  onChange={handleChange}
                />
              </Form.Item>
            ) : null}

            <Form.Item
              label="รหัสผ่านใหม่"
              name="password"
              rules={[
                { required: true, message: "กรุณากรอกรหัสผ่าน" },
              ]}
              className="w-full pad-main"
            >
              <Input.Password
                type="password"
                className="border rounded"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              label="ยืนยันรหัสผ่าน"
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value === "") {
                      return Promise.reject(new Error("กรุณากรอกยืนยันรหัสผ่าน!"));
                    } else if ((getFieldValue("password")) !== value) {
                      return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน!"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              className="w-full pad-main"
            >
              <Input.Password
                type="password"
                className="border rounded"
                onChange={handleChange}
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
                <Button htmlType="submit" type="primary">
                  ยืนยัน
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Fragment>
  )
}

export default ModalUserChangePass