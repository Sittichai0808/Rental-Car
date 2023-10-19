import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserFilledIcon } from "@/icons";
import styled from "@emotion/styled";
import { Divider, Layout, Menu } from "antd";
import { useEffect, useState } from "react";

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

export function UserWebLayout({ children }) {
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
              label: "Về CRT",
            },
            {
              key: "cars",
              label: "Danh sách xe",
            },
          ]}
        />
        <Divider type="vertical" className="bg-neutral-200" />
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-neutral-200 rounded-full p-1 cursor-pointer">
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
