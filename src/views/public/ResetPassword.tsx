import { ForgetConfirmOPT, ForgetPassword, ForgetResetPassword } from '@/services/Auth.Services';
import { App, Button, Form, Input, Steps } from 'antd'
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

type Data = {
  email: string;
  otp: string;
  new_password: string;
  confirm_password: string;
}

const steps = [
  {
    title: 'ส่งอีเมล',
    content: 'First-content',
  },
  {
    title: 'ยืนยัน OTP',
    content: 'Second-content',
  },
  {
    title: 'เปลี่ยนรหัสผ่าน',
    content: 'Last-content',
  },
];

function ResetPassword() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const [form] = Form.useForm<Data>();

  const handleSubmit = async (value: Data) => {
    setLoading(true);
    const res = await ChooseCall(current, value);
    setLoading(false);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      message.success("สำเร็จ");
      next();
    } else {
      message.error(res?.message ?? "");
    }
  }

  const ChooseCall = async (curr: number, data: unknown) => {
    switch (curr) {
      case 0:
        return await ForgetPassword(data);
      case 1:
        return await ForgetConfirmOPT(data);
      case 2:
        return await ForgetResetPassword(data);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setFieldValue(name, value);
  };


  return (
    <Fragment>
      <main className="bg-blue-main">
        <div className="container-main">
          <div className="w-full h-full flex justify-center items-center">
            <div className="card-sm">
              <Form
                form={form}
                layout="vertical"
                className="form relative"
                onFinish={handleSubmit}
              >
                <h1>ลืมรหัสผ่าน</h1>

                <div className="my-8">
                  <Steps current={current} items={items} />
                </div>
                {/* SEND MAIL */}
                <Form.Item
                  label="อีเมล"
                  name="email"
                  className={current === 0 ? "" : "hidden"}
                  rules={[
                    { required: true, message: "กรุณากรอกอีเมลของคุณ!" },
                    { type: "email", message: "กรุณาตรวจสอบอีเมลของคุณ!" },
                  ]}
                >
                  <Input
                    className="border rounded p-2"
                    onChange={handleChange}
                  />
                </Form.Item>

                {/* OTP */}
                <Form.Item
                  label="OTP"
                  name="otp"
                  className={current === 1 ? "w-full flex justify-center" : "hidden"}
                  rules={[
                    { required: (current === 1), message: "กรุณากรอกอีเมลของคุณ!" },
                  ]}
                >
                  <Input.OTP
                    size="large"
                    length={6}
                    className="border rounded p-2"
                    onChange={(value) => form.setFieldsValue({ otp: value })}
                  />
                </Form.Item>

                {/* CHANGE PASS */}
                <Form.Item
                  label="รหัสผ่านใหม่"
                  name="new_password"
                  className={current === 2 ? "" : "hidden"}
                  rules={[
                    { required: (current === 2), message: "กรุณากรอกรหัสผ่าน" },
                  ]}
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
                  dependencies={["new_password"]}
                  className={current === 2 ? "" : "hidden"}
                  rules={[
                    { required: (current === 2), message: "" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value === "" && current === 2) {
                          return Promise.reject(new Error("กรุณากรอกยืนยันรหัสผ่าน!"));
                        } else if ((getFieldValue("new_password")) !== value) {
                          return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน!"));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    type="password"
                    className="border rounded"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-center">
                    {current <= 2 ? (
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-blue-main text-white rounded p-2"
                      >
                        ยืนยัน
                      </Button>
                    ) : (
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="button"
                        onClick={() => navigate("/")}
                        className="w-full bg-blue-main text-white rounded p-2"
                      >
                        เข้าสู่ระบบ
                      </Button>
                    )}
                  </div>
                </Form.Item>

                <Form.Item>
                  <p className="text-end text-gray-600">
                    กลับไปหาเข้าสู่ระบบ?{" "}
                    <Link to="/login" className="text-blue-main">
                      เข้าสู่ระบบ
                    </Link>
                  </p>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default ResetPassword