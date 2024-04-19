import { Fragment, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { Form, Input, Button, Image, Alert, App } from "antd";
import Banner from "@/assets/images/banners/banner.jpg"
import { AuthLogin } from "@/services/Auth.Services";
import useAuthStore from "@/store/authStore";
import { IToken } from "@/types/global";

export const Login = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { setUser, setTokens } = useAuthStore();

  const handleSubmit = async () => {
    setMsg("");
    const dataSend = { "email": username, "password": password };
    const res = await AuthLogin(dataSend);
    if (res && res.statusCode === 200 && res.taskStatus) {
      message.success("ยินดีต้อนรับ");
      const token: IToken = res.data.token;
      setUser(res.data.user);
      setTokens(token.access, token.refresh);
      navigate("/");
      return;
    }
    setMsg(res?.message ?? "");
  }

  return (
    <Fragment>
      <main className="bg-blue-main">
        <div className="container-main">
          <div className="w-full h-full flex justify-center items-center">
            <div className="card">
              <div className="card-image">
                <Image preview={false} className="banner-image" src={Banner} />
              </div>
              <Form
                layout="vertical"
                className="min-h-96 form relative"
                onFinish={handleSubmit}
              >

                <h1>เข้าสู่ระบบ</h1>

                <Form.Item
                  validateStatus={msg !== "" ? "error" : ""}
                  label="อีเมล / เลขบัตรประจำตัว"
                  name="email"
                  rules={[
                    { required: true, message: "กรุณากรอกอีเมลของคุณ!" },
                  ]}
                >
                  <Input
                    className="border rounded p-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  validateStatus={msg !== "" ? "error" : ""}
                  label="รหัสผ่าน"
                  name="password"
                  rules={[
                    { required: true, message: "กรุณากรอกรหัสผ่านของคุณ!" },
                  ]}
                >
                  <Input.Password
                    className="border rounded p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>


                <Form.Item>
                  <div className="flex justify-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full bg-blue-main text-white rounded p-2"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </div>
                </Form.Item>

                <Form.Item>
                  <p className="text-end text-gray-600">
                    ลืมรหัสผ่านใช่หรือไม่?{" "}
                    <Link to="/reset_password" className="text-blue-main">
                      ลืมรหัสผ่าน
                    </Link>
                  </p>
                </Form.Item>

                {/* alert */}
                {msg === "" ? null :
                  <Form.Item className="absolute top-0 right-0">
                    <Alert
                      message={msg}
                      type="error"
                    />
                  </Form.Item>
                }
              </Form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Login;
