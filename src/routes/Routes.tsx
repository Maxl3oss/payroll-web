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
import MainEmployees from "@/views/private/employees/MainEmployees";
import MainSlip from "@/views/private/slip/MainSlip";

const Routes = [
  {
    role: ["none"],
    element: <MainNoneLayout />,
    children: [
      { path: "*", name: "", element: <Navigate to="/login" /> },
      { path: "login", name: "เข้าสู่ระบบ", element: <Login /> },
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

      { path: "employees", name: "พนักงาน", element: <MainEmployees /> },

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
      { path: "slip", name: "ออกใบเสร็จ", element: <MainSlip /> },
      { path: "*", name: "", element: <NoPage /> },
    ]
  }
];

export default Routes;