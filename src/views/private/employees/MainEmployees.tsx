import DatePickerTH from '@/components/DatePickerTH';
import { IPagin } from '@/types/global';
import { Button, Input, Pagination, Table } from 'antd';
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { SearchOutlined } from "@ant-design/icons";
// import dayjs from 'dayjs';

// type IFormData = {
//   search: string;
// }

function MainEmployees() {
  // const dateNow = dayjs(new Date()?.toISOString());
  // const [data, setData] = useState<any>([]);
  // const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState<IFormData>({
  //   search: "",
  // })
  const [pagin, /*setPagin*/] = useState<IPagin>({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecord: 0
  });

  return (
    <Fragment>
      <div className="layout-main">
        <div className="layout-head">
          <h1>แสดงพนักงาน</h1>
          <NavLink to="/salary/form">
            <Button type="primary">
              เพิ่มข้อมูล
            </Button>
          </NavLink>
        </div>
        <div className="layout-filter">
          <div className="w-full lg:w-1/2 xl:w-1/3 pad-main">
            <label htmlFor="search">ค้นหา</label>
            <Input
              name="search"
              // onChange={handleChange}
              // value={formData.search}
              addonBefore={<SearchOutlined />}
              placeholder="ชื่อ-นามสกุล"
            />
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/6 pad-main">
            <label htmlFor="date">ช่วงเวลา</label>
            <DatePickerTH
              name="date"
              picker="month"
            // onChange={onChangeDate}
            // value={formData.month !== "" ? dayjs(formData.month) : dateNow}
            />
          </div>
          <div className="layout-filter-btn">
            <Button
              // onClick={() => fetchData(pagin.pageNumber, pagin.pageSize, formData.search, formData.month)}
              type="primary"
            >
              ค้นหา
            </Button>
            <Button
              htmlType="reset"
              onClick={() => {
                // fetchData();
                // setFormData({ search: "", month: "" });
              }}
            >
              ล้าง
            </Button>
          </div>
        </div>
        <h3 className="font-semibold text-end">ทั้งหมด {pagin.totalRecord} รายการ</h3>
        <div className="layout-contents">
          <Table
            // loading={loading}
            className="whitespace-nowrap"
            // columns={columns}
            // dataSource={data}
            pagination={false}
            rowKey={(record) => record.full_name}
          />
        </div>
        <div className="layout-pagin">
          <Pagination
            // onChange={(pageNumber, pageSize) => {
            // fetchData(pageNumber, pageSize, formData.search, formData.month);
            // }}
            total={pagin.totalRecord}
            current={pagin.pageNumber}
            pageSize={pagin.pageSize}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default MainEmployees