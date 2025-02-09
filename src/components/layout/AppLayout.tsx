import { Layout } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("dashboard");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setSelectedKey(path || "dashboard");
  }, [location]);

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "log",
      icon: <PlusCircleOutlined />,
      label: "Log Period",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: "20px",
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </Content>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #f0f0f0",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 0",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(`/${item.key}`)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: selectedKey === item.key ? "#ff69b4" : "#999",
            }}
          >
            {item.icon}
            <span style={{ fontSize: "12px", marginTop: "4px" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AppLayout;
