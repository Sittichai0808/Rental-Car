import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { Tabs } from "antd";

import { Button } from "antd";
import {
  HeartOutlined,
  CarOutlined,
  PoweroffOutlined,
  GiftOutlined,
  UserOutlined,
  StrikethroughOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Layout, Avatar } from "antd";
import Account from "@/pages/profile/index";
import CarRental from "@/pages/profile/car-rental/index";
// import CarFavorite from "@/pages/profile/car-favorite/index";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useRouter } from "next/router";
import Image from "next/image";

const { Sider, Content } = Layout;
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Profile",
    children: <Account />,
  },
  {
    key: "2",
    label: "Lịch sử thuê xe",
    children: <CarRental />,
  },
  {
    key: "3",
    label: "Xe yêu thích",
  },
];
export const ProfileLayout = ({ children }) => {
  const router = useRouter();

  const loaderProp = ({ src }) => {
    return src;
  };
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [user, setUser] = useUserState();
  useEffect(() => {
    setUser(profile);
  }, [user]);
  return (
    <Layout className="flex max-w-6xl  mx-auto  bg-white  ">
      <HeaderComponent />

      <Layout
        className=" flex max-w-6xl min-h-screen relative  mt-10 bg-white"
        style={{
          minHeight: "100vh",
        }}
        hasSider
      >
        <div
          className="flex mt-5 relative flex-col   m-auto ml-5 mr-5 border rounded-xl border-solid border-neutral-200   p-4 "
          style={{
            width: "23%",
            // boxShadow: "0px 0px 3px 1px #E2E8F0",
            // borderRadius: "10px",
          }}
        >
          <div
            className="flex w-full flex-col justify-center items-center  p-4 "
            style={{
              minHeight: "50vh",
              backgroundColor: "#fff",
            }}
          >
            <Avatar
              className="flex justify-center items-center "
              size={130}
              loader={loaderProp}
              src="/images/thinh.jpg"
            />
            <div className="mt-0">
              <h5 className="text-lg font-bold text-center ">
                {user?.username}
              </h5>

              <p className="">Tham gia: {Date(user?.createdAt)}</p>
            </div>
          </div>
        </div>
        <Content
          className=" w-[calc(100%-23%)]  mt-5 mb-5  overflow-y-scroll  h-0  border rounded-xl border-solid border-neutral-200 p-4 "
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            // borderRadius: " 10px",
            // boxShadow: "0px 0px 3px 1px #E2E8F0",
          }}
        >
          <Tabs
            className="font-semibold w-full mb-3 flex   "
            defaultActiveKey="1"
            centered
            items={items}
            onChange={onChange}
            style={{ padding: "16px 0" }}
          />
          ;
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
