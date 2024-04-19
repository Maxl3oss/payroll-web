import { Navigate } from "react-router-dom";
// layout
import MainNoneLayout from "@/layouts/none/MainNoneLayout";
import MainPublicLayout from "@/layouts/public/MainPublicLayout";
// page
import Dashboard from "@/views/private/Dashboard";
import Login from "@/views/public/Login";
import NoPage from "@/views/public/NoPage";
import MainSalary from "@/views/private/salary/MainSalary";
import FormSalary from "@/views/private/salary/FormSalary";
import MainUser from "@/views/private/ีuser/MainUser";
import MainSlip from "@/views/private/slip/MainSlip";
import FormUser from "@/views/private/ีuser/FormUser";
import ResetPassword from "@/views/public/ResetPassword";

const Routes = [
  {
    role: ["none"],
    element: <MainNoneLayout />,
    children: [
      { path: "*", name: "", element: <Navigate to="/login" /> },
      { path: "login", name: "เข้าสู่ระบบ", element: <Login /> },
      { path: "reset_password", name: "เข้าสู่ระบบ", element: <ResetPassword /> },
    ],
  },
  {
    role: ["admin"],
    element: <MainPublicLayout />,
    children: [
      { path: "", name: "", element: <Navigate to="/dashboard" /> },
      { path: "*", name: "", element: <NoPage /> },
      
      { path: "dashboard", name: "แดชบอร์ด", element: <Dashboard /> },

      { path: "salary", name: "เงินเดือน", element: <MainSalary /> },
      { path: "salary/form", name: "เงินเดือน/เพิ่มข้อมูล", element: <FormSalary /> },

      { path: "user", name: "ผู้ใช้งาน", element: <MainUser /> },
      { path: "user/update", name: "ผู้ใช้งาน/แก้ไขข้อมูล", element: <FormUser /> },

      // { path: "salary/form/test", name: "เงินเดือน/หน้าฟอร์ม/ทดสอบ", element: <FormSalary /> },
      // { path: "create", name: "ฟอร์ม", element: <FormProduct /> },
      // { path: "update", name: "ฟอร์ม", element: <FormProduct /> },
    ],
  },
  {
    role: ["user"],
    element: <MainPublicLayout />,
    children: [
      { path: "", name: "", element: <Navigate to="/slip" /> },
      { path: "*", name: "", element: <NoPage /> },
      
      { path: "slip", name: "ออกสลิปเงินเดือน", element: <MainSlip /> },
      
      { path: "profile", name: "โปรไฟล์", element: <FormUser /> },
    ]
  }
];

export default Routes;