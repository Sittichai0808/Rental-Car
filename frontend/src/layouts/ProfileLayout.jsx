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
import Driver from "@/pages/profile/driver-licenses/index";
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
        <span className="text-base font-semibold text-center">
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
        <span className="text-base font-semibold text-center">
          {" "}
          <UserOutlined />
          Giấy phép lái xe
        </span>
      ),

      children: <Driver />,
    },

    {
      key: "3",
      label: (
        <span className="text-base font-semibold text-center ">
          <CarFilled />
          Lịch sử thuê xe{" "}
        </span>
      ),
      children: <CarRental />,
    },
    {
      key: "4",
      label: (
        <span className="text-base font-semibold text-center">
          <HeartFilled />
          Xe yêu thích
        </span>
      ),
      children: <CarLiked />,
    },
    {
      key: "5",
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
          <span className="text-base font-semibold text-center ">
            <LogoutOutlined className=" text-red-600  " />
            Logout
          </span>
        </div>
      ),
    },
  ];
  //overflow-y-scroll h-0
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
          className=" w-[calc(100%-23%)] flex flex-col my-5  border rounded-xl border-solid border-neutral-200 p-4  bg-white  "
          style={{
            minHeight: "100vh",
          }}
        >
          <Tabs
            className=" w-full mb-3 flex mt-3 "
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
