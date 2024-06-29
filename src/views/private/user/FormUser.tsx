import { CreateUser, GetAllRole, GetProfile, GetUserByID, UpdateUser } from "@/services/User.Servives";
import { IUser } from "@/types/global";
import { App, Button, Form, Input, Select } from "antd"
import { Fragment, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import ModalUserChangePass from "./ModalUserChangePass";
import { FormInstance } from "antd/lib";
import useAuthStore from "@/store/authStore";

type DataRole = {
  id: number;
  name: string;
}

function FormUser() {
  const { message } = App.useApp();
  const [form] = Form.useForm<IUser>();
  const navigate = useNavigate();
  const roleId = Form.useWatch("role_id", form);
  const { uid } = useLocation().state ?? {};
  const [role, setRole] = useState([{ value: 0, label: "" }]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // for profile
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const isProfile = Boolean(pathname === "/profile");

  useEffect(() => {
    if (ref.current) {
      if (isProfile && user?.id) {
        fetchData(user.id, form, true);
      } else {
        if (uid) {
          fetchData(uid, form);
        } else {
          form.setFieldsValue({ role_id: 2 });
        }
        Promise.all([fetchRole()]);
      }
    }
  }, [uid, ref, form, isProfile, user]);

  const fetchData = async (id: string, passForm: FormInstance<IUser>, getProfile = false) => {
    const res = getProfile ? await GetProfile() : await GetUserByID(id);
    if (res && (res.statusCode === 200 && res.taskStatus && res?.data)) {
      const arrData: IUser = res.data;
      passForm.setFieldsValue({ ...arrData });
    }
  }

  const fetchRole = async () => {
    const res = await GetAllRole();
    if (res && (res.statusCode === 200 && res.taskStatus && res?.data)) {
      const arrData: DataRole[] = res.data;
      const filData = arrData.map((curr) => ({ value: curr.id, label: curr.name }));
      setRole(filData);
    }
  }

  const handleSubmit = async (value: IUser) => {
    const res = (Boolean(uid) === true) ? await UpdateUser(uid, value) : isProfile ? await UpdateUser(user?.id ?? "", value) : await CreateUser(value);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      message.success(Boolean(uid) === true ? "แก้ไขข้อมูลสำเร็จ!" : "เพิ่มข้อมูลผู้ใช้งานสำเร็จ");
      navigate("/user")
    } else {
      message.error("ไม่สำเร็จ => " + res?.message || "");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setFieldValue(name, value);
  };

  function checkID(id: string): boolean {
    if (id.substring(0, 1) === "0") return false;
    if (id.length !== 13) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
    }
    if ((11 - (sum % 11)) % 10 !== parseFloat(id.charAt(12))) return false;
    return true;
  }

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>{Boolean(uid) === true ? "แก้ไขผู้ใช้งาน" : isProfile ? "โปรไฟล์" : "เพิ่มผู้ใช้งาน"}</h1>
          {(Boolean(uid) || isProfile) ? (
            <Button onClick={() => setIsOpen(true)} type="primary" htmlType="button">
              <i className="fa-solid fa-unlock-keyhole icon-btn"></i>
              เปลี่ยนรหัสผ่าน
            </Button>
          ) : null}
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          ref={ref}
        >
          <div className="w-full flex flex-wrap">
            {(roleId !== 1) ?
              <Form.Item
                className="w-full md:w-1/2 lg:w-1/3 pad-main"
                label="เลขบัตรประจำตัว"
                name="taxid"
                rules={[
                  { required: true, message: "" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value !== "") {
                        if (checkID(value?.toString() || "") || getFieldValue("role_id")?.toString() === "1") {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(new Error("กรุณาตรวจสอบเลขบัตรประจำตัวให้ถูกต้อง!"));
                        }
                      } else {
                        return Promise.reject(new Error("กรุณากรอกเลขบัตรประจำตัว!"));
                      }
                    },
                  }),
                ]}
              >
                <Input
                  disabled={Boolean(uid) || isProfile}
                  className="border rounded p-2"
                  onChange={handleChange}
                />
              </Form.Item>
              : null}

            <Form.Item
              className="w-full md:w-1/2 lg:w-1/3 pad-main"
              label="ชื่อ-นามสกุล"
              name="full_name"
              rules={[
                { required: true, message: "กรุณากรอกชื่อ-นามสกุล!" },
              ]}
            >
              <Input
                className="border rounded p-2"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              className="w-full md:w-1/2 lg:w-1/3 pad-main"
              label="อีเมล"
              name="email"
              rules={[
                { required: true, message: "กรุณากรอกอีเมล!" },
              ]}
            >
              <Input
                className="border rounded p-2"
                onChange={handleChange}
              />
            </Form.Item>

            {(roleId !== 1) ?
              <Form.Item
                className="w-full md:w-1/2 lg:w-1/3 pad-main"
                label="เบอร์โทรศัพท์"
                name="mobile"
                rules={[
                  { required: true, message: "" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue("role_id")?.toString() === "1" || !!value) {
                        const regex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
                        if (value?.length >= 10 && regex.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("กรุณาตรวจสอบเบอร์โทรศัพท์!"));
                      } else {
                        return Promise.reject(new Error("กรุณากรอกเบอร์โทรศัพท์!"));
                      }
                    },
                  }),
                ]}
              >
                <Input
                  pattern="^\d{10}$"
                  className="border rounded p-2"
                  onChange={handleChange}
                />
              </Form.Item>
              : null}

            {Boolean(uid) === false && !isProfile ? (
              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  { required: true, message: "กรุณากรอกรหัสผ่าน" },
                ]}
                className="w-full md:w-1/2 lg:w-1/3 pad-main"
              >
                <Input.Password
                  type="password"
                  className="border rounded"
                  onChange={handleChange}
                />
              </Form.Item>
            ) : null}

            <Form.Item
              className={isProfile ? "hidden" : "w-full md:w-1/2 lg:w-1/3 pad-main"}
              label="สิทธิ์เข้าใช้งาน"
              name="role_id"
              rules={[
                { required: true, message: "กรุณาเลือกสิทธิ์เข้าใช้งาน!" },
              ]}
            >
              <Select
                optionFilterProp="label"
                onChange={(vale) => form.setFieldValue("role_id", vale)}
                options={role}
              />
            </Form.Item>

          </div>

          <div className="flex items-center justify-center gap-x-5 mt-20">
            <Button loading={false} type="primary" htmlType="submit">
              บันทึก
            </Button>
            <Button
              htmlType="reset"
              onClick={async () => {
                if (uid) {
                  fetchData(uid, form);
                } else {
                  form.resetFields();
                  setTimeout(() => {
                    form.setFieldValue("role_id", 2)
                  }, 100);
                }
              }}>
              ล้างค่า
            </Button>
          </div>
        </Form>
      </div>

      {/* modal change pass */}
      <ModalUserChangePass isProfile={isProfile} uid={isProfile ? (user?.id) : uid} open={isOpen} setOpen={setIsOpen} />
    </Fragment>
  )
}

export default FormUser