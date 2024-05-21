import React, { useMemo, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Image, Drawer } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
import Logo from "@/assets/logo.png";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import MenuList from "./MenuList";
import useAuthStore from "@/store/authStore";

const MainPublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const roleUser = user?.role.name ?? "none";
  const filterMenu = MenuList.filter(curr => curr.role.some(item => item === roleUser));

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  const isActive = useMemo(() => {
    return filterMenu?.filter(item => item.path === pathName)[0]?.key ?? (roleUser === "admin" ? "1" : "4");
  }, [pathName, filterMenu, roleUser]);

  return (
    <Layout>
      {/* mobile */}
      <Drawer
        className="!p-0 !m-0"
        title=""
        placement={"left"}
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        key={"left"}
        width={200}
        rootClassName="block lg:hidden"
        classNames={{ body: "!p-0" }}
      >
        <div className="max-w-[200px] h-[60px] bg-[#001529] p-5 text-white flex items-center gap-x-3">
          <Image className="logo" src={Logo} alt="" />
          <div className="font-semibold text-xl">Quotation</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ width: "100%", height: "calc(100% - 60px)" }}
          defaultSelectedKeys={[isActive]}
          items={filterMenu.map((item) => ({
            key: item.key,
            icon: item.icon,
            onClick: () => {
              navigate(item.path);
              setOpen(false);
            },
            label: item.label,
          }))}
        />
      </Drawer>
      {/* windows */}
      <Sider
        color="#101a28"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden lg:block"
      >
        <div className="max-w-[200px] p-6 text-white flex items-center gap-x-3">
          <Image className="logo" src={Logo} alt="" />
          {!collapsed ? <div className="font-semibold text-xl">Payroll</div> : null}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[isActive]}
          items={filterMenu.map((item) => ({
            key: item.key,
            icon: item.icon,
            onClick: () => navigate(item.path),
            label: item.label,
          }))}
        />
      </Sider>
      <Layout>
        <div className={(collapsed ? "lg:max-w-[calc(100vw_-_80px)]" : "lg:max-w-[calc(100vw_-_200px)]" + " min-w-full")}>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="w-full flex justify-between">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  setCollapsed(!collapsed)
                  setOpen(prev => !prev);
                }}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="layout-center gap-3 pr-6">
                {/* <img className="profile" src={Logo} /> */}
                <Button
                  danger
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                // className="!bg-red-500 !text-white"
                >
                  ออกจากระบบ
                </Button>
              </div>
            </div>
          </Header>
          <div className="p-[16px]">
            <Content
              style={{
                // margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="w-full inline-block overflow-hidden min-h-[calc(100vh_-_144px)]">
                <CustomBreadcrumb />
                <Outlet />
              </div>
            </Content>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainPublicLayout;