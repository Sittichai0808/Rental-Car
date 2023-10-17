"use client";
import React from "react";
import { Button } from "antd";
import {
  HeartOutlined,
  CarOutlined,
  PoweroffOutlined,
  GiftOutlined,
  UserOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme, Typography } from "antd";

import { link } from "fs-extra";
import { usePathname } from "next/navigation";
import Link from "next/link";

const { Header, Sider, Content } = Layout;
import { useRouter } from "next/navigation";

import Account from "./Page/Account";
const { Title } = Typography;

export default function ProfilePage() {
  const router = useRouter();

  return (
    <Layout className="max-w-6xl mx-auto mt-10 bg-white  ">
      <Sider
        style={{
          backgroundColor: "#4ade80",
        }}
      >
        <Title className=" flex justify-center font-medium text-basetext-slate-900 ">
          CRT
        </Title>
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

      <Content className="bg-white h-full">
        <Account />
      </Content>
    </Layout>
  );
}

ProfilePage.hideHeader = true;
