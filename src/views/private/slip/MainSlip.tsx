import DatePickerTH from "@/components/DatePickerTH"
import { GetDDLSalaryType, GetSalaryByUser } from "@/services/Salary.Serivces";
import useAuthStore from "@/store/authStore";
import { Button, DatePickerProps, Table } from "antd";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react"
import { IDropdown, IPagin, ISalary } from "@/types/global";
import { TableProps } from "antd/lib";
import { CommaNumber, ConvertToDateISOToThai, IndexTable } from "@/helper/FunctionHelper";
import ModalSalary from "../salary/ModalSalary";

type IDataModal = {
  isOpen: boolean;
  data: ISalary | null;
}

type IDataType = {
  id: number;
  name: string;
}

function MainSlip() {
  const { user } = useAuthStore();
  const dateNow = dayjs(new Date()?.toISOString());
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ISalary[]>([]);
  const [dataType, setDataType] = useState<IDropdown<number>[]>([]);
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

  useEffect(() => {
    Promise.all([fetchData(user?.id ?? ""), fetchDataType()]);
  }, [user]);

  const onChangeDate: DatePickerProps["onChange"] = (date) => {
    setMonth(date?.toISOString());
  };

  const fetchDataType = async () => {
    const res = await GetDDLSalaryType();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      const dataRes: IDataType[] = res?.data;
      const format: IDropdown<number>[] = dataRes.map(curr => ({ value: curr?.id, label: curr?.name }));
      setDataType([{ value: 0, label: "ทั้งหมด" }, ...format]);
    }
  }

  const fetchData = async (userId = "", pageNumber = 1, pageSize = 10, month = "") => {
    const res = await GetSalaryByUser(userId, pageNumber, pageSize, month);
    month = month === "" ? new Date()?.toISOString() : month;
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus && res.data && res?.pagin) {
      setData(res.data);
      setPagin(res?.pagin);
    }
  };

  const columns: TableProps<ISalary>["columns"] = [
    {
      title: "ลำดับ",
      render: (_, record, idx) => (
        <span key={idx + "-user-" + record.full_name}>{IndexTable(pagin, idx)}</span>
      ),
    },
    {
      title: "ช่วงเวลา", dataIndex: "created_at", key: "created_at", render(value) {
        return <Fragment>{ConvertToDateISOToThai(value)}</Fragment>
      }
    },
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
      title: "รวมรับจริง", dataIndex: "total_income", key: "total_income", render(value) {
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

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>ออกสลิปเงินเดือน</h1>
        </div>
        <div className="layout-filter">
          <div className="w-full lg:w-1/3 pad-main">
            <label htmlFor="date">ช่วงเวลา</label>
            <DatePickerTH
              name="date"
              picker="month"
              onChange={onChangeDate}
              value={month !== "" ? dayjs(month) : dateNow}
            />
          </div>
          <div className="!lg:w-fit layout-filter-btn">
            <Button
              onClick={() => fetchData(user?.id ?? "", 1, pagin.pageSize, month)}
              type="primary"
            >
              ค้นหา
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                fetchData();
                setMonth("");
              }}
            >
              ล้าง
            </Button>
          </div>
        </div>

        <span className="font-semibold">ทั้งหมด {pagin.totalRecord} รายการ</span>

        <div className="layout-contents">
          <Table
            loading={loading}
            className="whitespace-nowrap"
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey={(record) => record.full_name + "-created_at-" + record.created_at}
          />
        </div>

      </div>
      {/* modal */}
      <ModalSalary
        dataType={dataType}
        onFetch={fetchData}
        openDelete={false}
        closeDelete={() => null}
        dataModal={dataModal}
        setDataModal={setDataModal}
      />
    </Fragment>
  )
}

export default MainSlip