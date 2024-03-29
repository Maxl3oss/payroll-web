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
    "label": "เงินเดือน"
  },
  {
    "key": "3",
    "role": ["admin"],
    "icon": <i className="fa-solid fa-user" />,
    "path": "/employees",
    "label": "พนักงาน"
  }, {
    "key": "4",
    "role": ["user"],
    "icon": <i className="fa-solid fa-file-invoice" />,
    "path": "/slip",
    "label": "ออกใบเสร็จ"
  }
];

export default MenuList;
