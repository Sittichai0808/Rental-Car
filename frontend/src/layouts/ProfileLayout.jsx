import { Menu } from "antd";
import { Typography } from "antd";
import { Layout } from "antd";
import {
  HeartOutlined,
  CarOutlined,
  PoweroffOutlined,
  GiftOutlined,
  UserOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

export const ProfileLayout = ({ children }) => {
  return (
    <Layout className="max-w-6xl mx-auto bg-white">
      <Sider
        style={{
          backgroundColor: "#4ade80",
        }}
      >
        <Typography.Title className=" flex justify-center font-medium text-basetext-slate-900 ">CRT</Typography.Title>
        <Menu
          style={{
            backgroundColor: "#4ade80",
            position: "fixed",
            padding: "9px",
            fontWeight: "bold",
          }}
          mode="vertical"
          defaultSelectedKeys={["account"]}
          items={[
            {
              key: "/account",
              icon: <UserOutlined />,
              label: "Tài khoản của tôi",
            },
            {
              key: "/mycar",
              icon: <CarOutlined />,
              label: "Xe của tôi",
            },
            {
              key: "/myfavortiecar",
              icon: <HeartOutlined />,
              label: "Xe yêu thích",
            },
            {
              key: "/mytrip",
              icon: <StrikethroughOutlined />,
              label: "Chuyến đi của tôi",
            },
            {
              key: "/mygift",
              icon: <GiftOutlined />,
              label: "Quà tặng",
            },
            {
              key: "signout",
              icon: <PoweroffOutlined />,
              label: "Sign out",
              danger: true,
            },
          ]}
        />
      </Sider>

      <Content className="bg-white h-full">{children}</Content>
    </Layout>
  );
};
