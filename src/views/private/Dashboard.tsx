import { Card, Row, Select, Statistic, Table } from "antd"
import { Fragment } from "react/jsx-runtime"
import { DollarOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetDashboard } from "@/services/Dashboard.Services";
import { TableProps } from "antd/lib";
import { nanoid } from "nanoid";
import { CommaNumber, ConvertToDateISOToThai, GetYearDropdown } from "@/helper/FunctionHelper";
import { Column } from '@ant-design/charts';

type Received = {
  year: number;
  month: number;
  month_name?: string;
  sum: number;
}

type Data = {
  received: number;
  user: number;
  received_by_month: Received[]
}

const currentYear = new Date().getFullYear() + 543;

function Dashboard() {
  const [data, setData] = useState<Data>({ received: 0, user: 0, received_by_month: [] });
  const [loading, setLoading] = useState(false);
  const dataYears = GetYearDropdown(2567);
  const [years, setYears] = useState(currentYear);

  useEffect(() => {
    Promise.all([fetchData()]);
  }, []);

  const fetchData = async (year = 2024) => {
    setLoading(true);
    const res = await GetDashboard(year);
    setLoading(false);
    if (res && res.statusCode === 200 && res.taskStatus) {
      setData(res.data);
    }
  }

  const columns: TableProps<Received>["columns"] = [
    {
      title: "ลำดับ",
      render: (_, record, idx) => (
        <p key={nanoid() + record.month}>{idx + 1}</p>
      ),
    },
    {
      title: "ช่วงเวลา", dataIndex: "month", key: "month", render(_, current) {
        return <Fragment>{ConvertToDateISOToThai(new Date(current.year, current.month - 1).toISOString())}</Fragment>
      },
    },
    {
      title: "รายรับรวม", dataIndex: "sum", key: "sum", render(value) {
        return <Fragment>{CommaNumber(value, 2)}</Fragment>
      },
    },
  ];

  // make data
  function generate12MonthsData(data: Received[]): Received[] {
    if (data.length <= 0) return [] as Received[];
    const generatedData: Received[] = [];

    for (let month = 1; month <= 12; month++) {
      let found = false;
      for (const entry of data) {
        if (entry.month === month) {
          entry.month_name = ConvertToDateISOToThai(new Date(entry.year, entry.month - 1).toISOString(), "MMMM");
          generatedData.push(entry);
          found = true;
          break;
        }
      }
      if (!found) {
        generatedData.push({
          year: data[0].year, month, sum: 0.001, month_name: ConvertToDateISOToThai(new Date(data[0].year, month - 1).toISOString(), "MMMM")
        });
      }
    }

    return generatedData;
  }

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>แดชบอร์ด</h1>
        </div>
        <div className="layout-contents">
          <div className="w-full mb-5 lg:w-1/2 xl:w-1/6 pad-main">
            <div>ข้อมูลปี</div>
            <Select
              defaultValue={currentYear}
              value={years}
              style={{ width: "100%" }}
              onChange={(value) => {
                setYears(value);
                fetchData(value - 543);
              }}
              options={dataYears}
            />
          </div>
          <div className="bg-gray-100 rounded-xl p-5">
            <Row>
              <div className="w-full grid gap-5 grid-cols-subgrid lg:grid-cols-2">
                <Card bordered={false}>
                  <Statistic
                    title="รายรับรวมทั้งหมด"
                    value={data.received}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<DollarOutlined />}
                    suffix="฿"
                  />
                </Card>
                {/* <Card bordered={false}>
                  <Statistic
                    title="ตบเบิกรวมทั้งหมด"
                    value={0}
                    precision={2}
                    prefix={<UpCircleOutlined />}
                    suffix="฿"
                  />
                </Card> */}
                <Card bordered={false}>
                  <Statistic
                    title="ผู้ใช้งานรวม"
                    value={data.user}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </div>
            </Row>
            <div className="bg-white p-5 mt-5 rounded-xl grid gap-5">
              <h2>ข้อมูลรวมรายเดือน</h2>
              <div className="w-full overflow-x-hidden">
                <Column
                  data={generate12MonthsData(data.received_by_month)}
                  xField={'month_name'}
                  yField={'sum'}
                />
              </div>
              <Table
                loading={loading}
                className="whitespace-nowrap"
                columns={columns}
                dataSource={data.received_by_month}
                pagination={false}
                rowKey={(record) => record.month}
              />
            </div>

          </div>


        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard