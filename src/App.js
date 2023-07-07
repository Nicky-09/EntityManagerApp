import React, { useState } from "react";
import {
  CarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import TaskList from "./components/TaskList";
import CarList from "./components/CarList";
import EmployeeList from "./components/EmployeeList";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenu(key);
  };

  const renderComponent = () => {
    switch (selectedMenu) {
      case "1":
        return <TaskList />;
      case "2":
        return <CarList />;
      case "3":
        return <EmployeeList />;
      default:
        return null;
    }
  };

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={handleMenuClick}
            items={[
              {
                key: "1",
                icon: <ScheduleOutlined />,
                label: "Task",
              },
              {
                key: "2",
                icon: <CarOutlined />,
                label: "Car",
              },
              {
                key: "3",
                icon: <UserOutlined />,
                label: "Employee",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {renderComponent()}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
