"use client";
import { UserFilledIcon } from "@/icons";
import styled from "@emotion/styled";
import { Divider, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const StyledMenu = styled(Menu)`
  li {
    &::after {
      display: none;
    }

    &:hover {
      color: "#4ade80";
    }
  }
`;

export default function UserWebLayout({ children }) {
  return (
    <Layout className="max-w-6xl mx-auto min-h-screen">
      <Header className="bg-white flex gap-2 items-center px-0">
        <div className="shrink-0">LOGO</div>
        <StyledMenu
          className="grow border-none flex justify-end font-semibold"
          mode="horizontal"
          items={[
            {
              key: "about-us",
              label: "Về Mioto",
            },
            {
              key: "become-car-owner",
              label: "Trở thành chủ xe",
            },
          ]}
        />
        <Divider type="vertical" className="bg-neutral-200" />
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-neutral-200 rounded-full p-1">
            <UserFilledIcon className="text-neutral-500" />
          </div>
          <span>Luong Cong Truong</span>
        </div>
      </Header>
      <Content className="bg-white py-2">{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
