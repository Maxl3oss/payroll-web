import { IPagin, IUser } from '@/types/global';
import { App, Badge, Button, Input, Pagination, Popconfirm, Table } from 'antd';
import { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchOutlined } from "@ant-design/icons";
import { DeleteUserByID, GetAllUser } from '@/services/User.Servives';
import { FormatPhoneNumber, IndexTable } from '@/helper/FunctionHelper';
import { TableProps } from 'antd/lib';
// import dayjs from 'dayjs';

type IFormData = {
  search: string;
}

function MainUser() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    search: "",
  })
  const [pagin, setPagin] = useState<IPagin>({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecord: 0
  });

  useEffect(() => {
    Promise.all([fetchData()]);
  }, []);

  // GetAllEmployee
  const fetchData = async (pageNumber = 1, pageSize = 10, search = "") => {
    setLoading(true);
    const res = await GetAllUser(pageNumber, pageSize, search);
    setLoading(false);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setData(res.data);
      setPagin({ ...res.pagin as IPagin });
    }
  }

  const handleDelete = async (userId: string, isOpen: boolean) => {
    const res = await DeleteUserByID(userId);
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      message.success(`${isOpen ? "เปิด" : "ปิด"}ใช้งานสำเร็จ!`);
      fetchData(pagin.pageNumber, pagin.pageSize, formData.search);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleUpdate = (uid: string) => {
    navigate("/user/update", { state: { uid } });
  }

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "ลำดับ",
      render: (_, record, idx) => (
        <span key={record.full_name}>{IndexTable(pagin, idx)}</span>
      ),
    },
    {
      title: "ชื่อ", dataIndex: "full_name", key: "full_name",
    },
    {
      title: "อีเมล", dataIndex: "email", key: "email", render(value) {
        return <>{value || "-"}</>
      }
    },
    {
      title: "เบอร์มือถือ", dataIndex: "mobile", key: "mobile", render(value) {
        return <>{FormatPhoneNumber(value) || "-"}</>
      }
    },
    {
      title: "สิทธิ์เข้าใช้งาน", align: "center", render(_, current) {
        return <>{current.role.name}</>
      }
    },
    {
      title: "สถานะ", dataIndex: "deleted_at", key: "deleted_at", align: "center", render(value) {
        return (
          <Badge text={(!value) ? "ใช้งาน" : "ปิดใช้งาน"} color={(!value ? "#22c55e" : "#ef4444")} />
        )
      }
    },
    {
      title: "จัดการ", align: "center", dataIndex: "deleted_at", key: "deleted_at_last", render(value, current) {
        return (
          <>
            <Button
              onClick={() => handleUpdate(current.id)}
              htmlType="button"
              type="text"
            >
              <i className="fa-solid fa-pen text-blue-main hover:text-blue-main/85"></i>
            </Button>
            {!value ? (
              <Popconfirm
                key={"ปิด"}
                title="คุณแน่ใจ?"
                description={`คุณต้องการ${current.deleted_at ? "เปิด" : "ปิด"}ใช้งาน ${current.full_name} ใช่หรือไม!`}
                okText="ตกลง"
                cancelText="ยกเลิก"
                onConfirm={async () => handleDelete(current.id, value)}
              >
                <Button htmlType="button" type="text">
                  <i className="fa-solid fa-user-xmark text-red-500 hover:text-red-500/85"></i>
                </Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                key={"เปิด"}
                title="คุณแน่ใจ?"
                description={`คุณต้องการเปิดใช้งาน ${current.full_name} ใช่หรือไม!`}
                okText="ตกลง"
                cancelText="ยกเลิก"
                onConfirm={async () => handleDelete(current.id, value)}
              >
                <Button htmlType="button" type="text">
                  <i className="fa-solid fa-user-check text-green-500 hover:text-green-500/85"></i>
                </Button>
              </Popconfirm>
            )}
          </>
        );
      }
    }
  ];

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>รายการผู้ใช้งาน</h1>
        </div>
        <div className="layout-filter">
          <div className="w-full lg:w-1/2 xl:w-1/3 pad-main">
            <div>ค้นหา</div>
            <Input
              name="search"
              onChange={handleChange}
              value={formData.search}
              addonBefore={<SearchOutlined />}
              placeholder="ชื่อ-นามสกุล / อีเมล"
            />
          </div>
          <div className="layout-filter-btn">
            <Button
              onClick={() => fetchData(1, pagin.pageSize, formData.search)}
              type="primary"
            >
              <i className="fa-solid fa-magnifying-glass icon-btn"></i>
              ค้นหา
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                fetchData();
                setFormData({ search: "" });
              }}
            >
              <i className="fa-solid fa-arrow-rotate-right icon-btn"></i>
              ล้าง
            </Button>
          </div>
        </div>
        <div className="layout-tabletop">
          <span className="font-semibold">ทั้งหมด {pagin.totalRecord} รายการ</span>
          <div className="grow flex justify-end gap-3">
            <NavLink to="/user/update">
              <Button type="primary">
                <i className="fa-solid fa-circle-plus icon-btn"></i>
                เพิ่มข้อมูล
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="layout-contents">
          <Table
            loading={loading}
            className="whitespace-nowrap"
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey={(record) => record.full_name}
          />
        </div>
        <div className="layout-pagin">
          <Pagination
            onChange={(pageNumber, pageSize) => {
              fetchData(pageNumber, pageSize, formData.search);
            }}
            total={pagin.totalRecord}
            current={pagin.pageNumber}
            pageSize={pagin.pageSize}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default MainUser