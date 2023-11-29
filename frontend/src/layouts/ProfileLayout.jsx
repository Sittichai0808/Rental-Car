import React, { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useDriverState } from "@/recoils/driver.state";
import {
  UserOutlined,
  CarFilled,
  HeartFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { Divider, Tabs, Layout, Button } from "antd";
import Account from "@/pages/profile/index";
import CarRental from "@/pages/profile/car-rental/index";
import CarLiked from "@/pages/profile/car-liked";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useRouter } from "next/router";

const { TabPane } = Tabs;

const { Content } = Layout;
const onChange = (key) => {
  console.log(key);
};

export const ProfileLayout = ({ children }) => {
  const [tabPosition, setTabPosition] = useState("left");
  const [user, setUser] = useUserState();
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [driver, setDriver] = useDriverState();
  const router = useRouter();
  const items = [
    {
      key: "1",
      label: (
        <span className=" text-center">
          {" "}
          <UserOutlined />
          Profile
        </span>
      ),

      children: <Account />,
    },

    {
      key: "2",
      label: (
        <span className=" text-center ">
          <CarFilled />
          Lịch sử thuê xe{" "}
        </span>
      ),
      children: <CarRental />,
    },
    {
      key: "3",
      label: (
        <span className=" text-center">
          <HeartFilled />
          Xe yêu thích
        </span>
      ),
      children: <CarLiked />,
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            clearAccessToken();
            setUser(null);
            setDriver(null);
            clearProfile();
            router.push("/");
          }}
        >
          {" "}
          <span className=" text-center ">
            <LogoutOutlined className=" text-red-600 text-center " />
            Logout
          </span>
        </div>
      ),
    },
  ];

  return (
    <Layout className="flex max-w-6xl mx-auto bg-white ">
      <HeaderComponent />

      <Layout
        className=" flex max-w-6xl min-h-screen relative my-2 bg-white"
        style={{
          minHeight: "100vh",
        }}
        hasSider
      >
        <Content
          className=" w-[calc(100%-23%)] flex flex-col my-5 overflow-y-scroll h-0 border-r shadow bg-white p-6 "
          style={{
            minHeight: "100vh",
            boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
          }}
        >
          <Tabs
            className=" w-full mb-3 flex mt-3"
            defaultActiveKey="1"
            tabPosition={tabPosition}
            items={items}
            onChange={onChange}
          />
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
