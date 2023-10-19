import { UserFilledIcon } from "@/icons";
import styled from "@emotion/styled";
import { Divider, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
const { Content } = Layout;

export function UserWebLayout({ children }) {
  return (
    <Layout className="max-w-6xl mx-auto min-h-screen">
      <HeaderComponent />
      <Content className="bg-white py-2">{children}</Content>
      <FooterComponent />
    </Layout>
  );
}
