"use client";
import { UserFilledIcon } from "@/icons";
import styled from "@emotion/styled";
import { Divider, Layout, Menu, Typography } from "antd";
import { useUserState } from "@/recoils/user.state";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/customHooks/useLocalStorage.js";
import Link from "next/link";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
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
const loaderProp = ({ src }) => {
  return src;
};

export default function UserWebLayout({ children }) {
  const [profile, setProfile, clearProfile] = useLocalStorage("profile");
  const [user, setUser] = useState();
  useEffect(() => {
    let value;

    // Get the value from local storage if it exists
    value = profile(profile) || "";
    setUser(value);
  }, []);

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
          <Link href="/profile">
            <div className="flex bg-neutral-200 rounded-full p-1">
              <UserFilledIcon className="text-neutral-500" />
            </div>
          </Link>
          <h4>{user?.username}</h4>
        </div>
      </Header>
      <Content className="bg-white py-2">{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
