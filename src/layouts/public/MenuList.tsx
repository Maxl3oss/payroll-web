import {
  FileTextFilled,
  DashboardFilled,
} from "@ant-design/icons";

const MenuList = [
  {
    "key": "1",
    "role": ["admin"],
    "icon": <DashboardFilled />,
    "path": "/dashboard",
    "label": "แดชบอร์ด"
  },
  {
    "key": "2",
    "role": ["admin"],
    "icon": <FileTextFilled />,
    "path": "/salary",
    "label": "สลิปเงินเดือน"
  },
  {
    "key": "3",
    "role": ["admin"],
    "icon": <i className="fa-solid fa-user" />,
    "path": "/user",
    "label": "ผู้ใช้งาน"
  },
  {
    "key": "4",
    "role": ["user"],
    "icon": <i className="fa-solid fa-file-invoice" />,
    "path": "/slip",
    "label": "ออกสลิปเงินเดือน"
  },
  {
    "key": "5",
    "role": ["user"],
    "icon": <i className="fa-solid  fa-user" />,
    "path": "/profile",
    "label": "โปรไฟล์"
  }
];

export default MenuList;
