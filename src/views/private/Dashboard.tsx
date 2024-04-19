import { Card, Row, Statistic, Table } from "antd"
import { Fragment } from "react/jsx-runtime"
import { UpCircleOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetDashboard } from "@/services/Dashboard.Services";
import { TableProps } from "antd/lib";
import { nanoid } from "nanoid";
import { CommaNumber, ConvertToDateISOToThai } from "@/helper/FunctionHelper";
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


function Dashboard() {
  const [data, setData] = useState<Data>({ received: 0, user: 0, received_by_month: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchData()]);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await GetDashboard(2024);
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

    for (let month = 0; month <= 11; month++) {
      let found = false;
      for (const entry of data) {
        if (entry.month === month) {
          entry.month_name = ConvertToDateISOToThai(new Date(entry.year, entry.month).toISOString(), "MMMM");
          generatedData.push(entry);
          found = true;
          break;
        }
      }
      if (!found) {
        generatedData.push({
          year: data[0].year, month, sum: 0.001, month_name: ConvertToDateISOToThai(new Date(data[0].year, month).toISOString(), "MMMM")
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

          <div className="bg-gray-100 rounded-xl p-5">
            <Row>
              <div className="w-full grid gap-5 grid-cols-subgrid lg:grid-cols-3">
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
                <Card bordered={false}>
                  <Statistic
                    title="ตบเบิกรวมทั้งหมด"
                    value={0}
                    precision={2}
                    prefix={<UpCircleOutlined />}
                    suffix="฿"
                  />
                </Card>
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