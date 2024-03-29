import { BrowserRouter } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import RoutesControl from "@/routes/RoutesControl";
// config date th
import locale from 'antd/locale/th_TH';
import "dayjs/locale/th";
// css
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

function App() {
  const theme = {
    token: {
      colorPrimary: "#2149c2",
    },
  };
  return (
    <ConfigProvider
      locale={locale}
      theme={theme}
    >
      <StyleProvider hashPriority="high">
        <BrowserRouter>
          <RoutesControl />
        </BrowserRouter>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default App