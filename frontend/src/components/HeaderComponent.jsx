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
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [user, setUser] = useUserState();
  useEffect(() => {
    setUser(profile);
  }, [user]);

  return (
    <Header className="bg-white flex gap-2 items-center px-0">
      <div className="shrink-0 mt-7 cursor-pointer">
        <Link href="/">
          <Image src={logo} height={40} width={40} />
        </Link>
      </div>
      <h2 className="text-green-500">CRT</h2>

      <StyledMenu
        className="grow border-none flex justify-end font-semibold"
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
        ]}
      />

      <Divider type="vertical" className="bg-neutral-200" />

      {!user ? (
        <Space wrap>
          <Link href="/register">
            <Button type="text">Đăng ký</Button>
          </Link>
          <Link href="/login">
            <Button type="primary">Đăng nhập</Button>
          </Link>
        </Space>
      ) : (
        <Link href="/profile">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex bg-neutral-200 rounded-full p-1 cursor-pointer">
              <UserFilledIcon className="text-neutral-500" />
            </div>
            <span>{user?.username}</span>
          </div>
        </Link>
      )}
    </Header>
  );
}
