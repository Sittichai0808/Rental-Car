import React, { useState } from "react";
import { Button } from "antd";
import {
  HeartOutlined,
  CarOutlined,
  PoweroffOutlined,
  GiftOutlined,
  UserOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme, Typography, Space, Tabs } from "antd";
import { link } from "fs-extra";
import { useUserState } from "@/recoils/user.state";
import Account from "@/pages/profile/index";
import useLocalStorage from "@/hooks/useLocalStorage";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useRouter } from "next/router";
const { Sider, Content } = Layout;

export const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useUserState();
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage(
    "access_token",
    ""
  );
  const [menudata, setMenudata] = useState(
    "account",
    "mycar",
    "myfavoritecar",
    "mytrip",
    "mygift",
    "logout"
  );
  return (
    <Layout className="max-w-6xl mx-auto">
      <HeaderComponent />
      <Layout className="pt-16 bg-gray-100 max-w-5xl" hasSider>
        <Menu
          style={{
            width: "33%",
            display: "flex",
            flexDirection: "column",
            paddingTop: "35px",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "rgb(243 244 246)",
          }}
          defaultSelectedKeys={["account"]}
          mode="vertical"
        >
          <Menu.Item
            key="/account"
            icon={<UserOutlined />}
            onClick={() => setMenudata("account")}
          >
            Tài khoản của tôi
          </Menu.Item>
          <Menu.Item
            key="/mycar"
            icon={<CarOutlined />}
            onClick={() => setMenudata("mycar")}
          >
            Xe của tôi
          </Menu.Item>
          <Menu.Item
            key="/myfavoritecar"
            icon={<HeartOutlined />}
            onClick={() => setMenudata("myfavoritecar")}
          >
            Xe yêu thích
          </Menu.Item>
          <Menu.Item
            key="/mytrip"
            icon={<StrikethroughOutlined />}
            onClick={() => setMenudata("mytrip")}
          >
            Chuyến đi của tôi
          </Menu.Item>
          <Menu.Item
            key="/mygift"
            icon={<GiftOutlined />}
            onClick={() => setMenudata("mygift")}
          >
            Quà tặng
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<PoweroffOutlined />}
            onClick={() => {
              // setMenudata("logout");
              console.log("log out");
              clearProfile();
              clearAccessToken();
              setUser(null);
              router.push("/");
            }}
          >
            SignOut
          </Menu.Item>
        </Menu>

        <Content className="h-full">
          {menudata == "account" && <Account />}
          {/* {menudata == "mycar" && <Mycar />}
          {menudata == "myfavoritecar" && <MyFavoriteCar />}
          {menudata == "mytrip" && <MyTrip />}
          {menudata == "mygift" && <Gift />}
          {menudata == "logout" && <Logout />} */}
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
