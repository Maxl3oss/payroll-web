import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, Pagination, Select, Table, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IDropdown, IPagin, ISalary } from "@/types/global";
import { nanoid } from "nanoid";
import { DatePickerProps } from "antd/es/date-picker";
import DatePickerTH from "@/components/DatePickerTH";
import dayjs from "dayjs";
import { CommaNumber, IndexTable } from "@/helper/FunctionHelper";
import { GetDDLSalaryType, GetSalary } from "@/services/Salary.Serivces";
import ModalSalary from "./ModalSalary";

type IFormData = {
  search: string;
  month: string;
  type: number;
}

type IDataModal = {
  isOpen: boolean;
  data: ISalary | null;
}

type IDataType = {
  id: number;
  name: string;
}

function MainSalary() {
  const dateNow = dayjs(new Date()?.toISOString());
  const [data, setData] = useState<ISalary[]>([]);
  const [dataType, setDataType] = useState<IDropdown<number>[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    search: "",
    month: "",
    type: 0,
  })
  const [pagin, setPagin] = useState<IPagin>({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecord: 0
  });
  const [dataModal, setDataModal] = useState<IDataModal>({
    isOpen: false,
    data: null,
  });
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    Promise.all([fetchData(), fetchDataType()]);
  }, []);

  const fetchData = async (pageNumber = 1, pageSize = 10, dataForm: IFormData = { search: "", month: "", type: 0 }) => {
    setLoading(true);
    dataForm.month = dataForm.month === "" ? new Date()?.toISOString() : dataForm.month;
    const res = await GetSalary(pageNumber, pageSize, dataForm.search, dataForm.month, dataForm.type);
    setLoading(false);
    if (res && (res.statusCode === 200 && res.taskStatus && res?.data && res?.pagin)) {
      setData(res.data);
      setPagin(res.pagin);
    }
  }

  const fetchDataType = async () => {
    const res = await GetDDLSalaryType();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      const dataRes = res?.data as  IDataType[];
      const format: IDropdown<number>[] = dataRes.map(curr => ({ value: curr?.id, label: curr?.name }));
      setDataType([{ value: 0, label: "ทั้งหมด" }, ...format]);
    }
  }

  const columns: TableProps<ISalary>["columns"] = [
    {
      title: "ลำดับ",
      render: (_, record, idx) => (
        <p key={nanoid() + record.id}>{IndexTable(pagin, idx)}</p>
      ),
    },
    { title: "ชื่อ-สกุล", dataIndex: "full_name", key: "full_name", },
    { title: "เลขบัญชีธนาคาร", dataIndex: "bank_account_number", key: "bank_account_number", },
    {
      title: "เงินเดือน", dataIndex: "salary", key: "salary", render(value) {
        return <Fragment>{CommaNumber(value, 2)}</Fragment>
      },
    },
    {
      title: "เงินเพิ่มค่าครองชีพ", dataIndex: "additional_benefits", key: "additional_benefits", render(value) {
        return <Fragment>{CommaNumber(value, 2)}</Fragment>
      },
    },
    {
      title: "เงินประจําตําแหน่ง", dataIndex: "fixed_income", key: "fixed_income", render(value) {
        return <Fragment>{CommaNumber(value, 2)}</Fragment>
      },
    },
    {
      title: "ค่าตอบแทนรายเดือน", dataIndex: "monthly_compensation", key: "monthly_compensation", render(value) {
        return <Fragment>{CommaNumber(value, 2)}</Fragment>
      },
    },
    {
      title: "รับจริง", dataIndex: "received", key: "received", render(value) {
        return <Fragment>{CommaNumber(value, 2)}</Fragment>
      },
    },
    {
      title: "จัดการ", dataIndex: "manege", key: "manege", render(_, current) {
        return (
          <Fragment>
            <Button

              onClick={() => setDataModal({ isOpen: true, data: current })}
              htmlType="button"
              type="text"
            >
              <i className="fa-solid fa-print text-blue-main hover:text-blue-main/85"></i>
            </Button>
          </Fragment>);
      }
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setFormData({
      ...formData,
      month: date?.toISOString(),
    });
  };

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>รายการสลิปเงินเดือน</h1>
        </div>
        <div className="layout-filter">
          <div className="w-full lg:w-1/2 xl:w-1/3 pad-main">
            <div className="text-">ค้นหา</div>
            <Input
              name="search"
              onChange={handleChange}
              value={formData.search}
              addonBefore={<SearchOutlined />}
              placeholder="ชื่อ-นามสกุล"
            />
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/6 pad-main">
            <div>ช่วงเวลา</div>
            <DatePickerTH
              name="date"
              picker="month"
              onChange={onChangeDate}
              value={formData.month !== "" ? dayjs(formData.month) : dateNow}
            />
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/6 pad-main">
            <div>รูปแบบ</div>
            <Select
              defaultValue={0}
              style={{ width: "100%" }}
              value={formData.type}
              onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              options={dataType}
            />
          </div>
          <div className="layout-filter-btn">
            <Button
              onClick={() => fetchData(1, pagin.pageSize, formData)}
              type="primary"
            >
              <i className="fa-solid fa-magnifying-glass icon-btn"></i>
              ค้นหา
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                fetchData();
                setFormData({ search: "", month: "", type: 0 });
              }}
            >
              <i className="fa-solid fa-arrow-rotate-right icon-btn"></i>
              ล้างค่า
            </Button>
          </div>
        </div>
        <div className="layout-tabletop">
          <span className="font-semibold">ทั้งหมด {pagin.totalRecord} รายการ</span>
          <div className="grow flex justify-end gap-3">
            <NavLink to="/salary/form">
              <Button type="primary">
                <i className="fa-solid fa-circle-plus icon-btn"></i>
                เพิ่มข้อมูล
              </Button>
            </NavLink>
            <Button
              danger
              onClick={() => setOpenDelete(true)}
              type="primary"
              htmlType="button"
            >
              <i className="fa-solid fa-trash-can icon-btn"></i>
              ลบข้อมูล
            </Button>
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
              fetchData(pageNumber, pageSize, formData);
            }}
            total={pagin.totalRecord}
            current={pagin.pageNumber}
            pageSize={pagin.pageSize}
          />
        </div>
      </div>
      {/* modal */}
      <ModalSalary
        dataType={dataType}
        onFetch={() => {
          fetchData();
          setFormData({ search: "", month: "", type: 0 });
        }}
        openDelete={openDelete}
        closeDelete={setOpenDelete}
        dataModal={dataModal}
        setDataModal={setDataModal}
      />
    </Fragment>
  )
}

export default MainSalary