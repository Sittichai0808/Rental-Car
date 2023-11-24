import useLocalStorage from "@/hooks/useLocalStorage";
import { UserFilledIcon } from "@/icons";
import styled from "@emotion/styled";
import { Divider, Layout, Menu } from "antd";
import { useUserState } from "@/recoils/user.state.js";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { Button, Space } from "antd";
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
const { Header } = Layout;
export default function HeaderComponent() {
  const [user, setUser] = useUserState();

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
      className="bg-white"
    >
      <div className="flex h-full w-full max-w-6xl mx-auto justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0 mt-7 cursor-pointer">
            <Link href="/">
              <Image src={logo} height={40} width={40} />
            </Link>
          </div>
          <h2 className="text-green-500">CRT</h2>
        </div>
        <StyledMenu
          className="grow border-none font-semibold flex justify-end w-2/4 gap-4"
          mode="horizontal"
          items={[
            {
              key: "about-us",
              label: "Về CRT",
            },
            {
              key: "cars",
              label: "Danh sách xe",
            },
            {
              key: "contact",
              label: "Liên hệ",
            },
          ]}
        />
        {!user ? (
          <Space wrap>
            <Link href="/register">
              <Button className="font-semibold" type="text">
                Đăng ký
              </Button>
            </Link>
            <Link href="/login">
              <Button className="font-semibold" type="primary">
                Đăng nhập
              </Button>
            </Link>
          </Space>
        ) : (
          <Link href="/profile">
            <div className="flex items-center shrink-0">
              <div className="flex bg-neutral-200 rounded-full p-1 cursor-pointer">
                <UserFilledIcon className="text-neutral-500" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </Header>
  );
}
