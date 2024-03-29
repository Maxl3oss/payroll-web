import { message, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

function UploadDragger(props: UploadProps) {
  const propsChildren: UploadProps = {
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} อัปโหลดไฟล์สำเร็จ`);
      } else if (status === "error") {
        message.error(`${info.file.name} อัปโหลดไฟล์ไม่สำเร็จ`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    ...props
  };

  return (
    <Dragger {...propsChildren}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">ลากไฟล์วางที่นี่ / คลิกเพื่อเลือกไฟล์</p>
      {/* <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p> */}
    </Dragger>
  )
}

export default UploadDragger