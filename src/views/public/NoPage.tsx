import { Result } from "antd"

function NoPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ"
    />
  )
}

export default NoPage