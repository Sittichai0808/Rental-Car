import React from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useDriverState } from "@/recoils/driver.state";
import { Tabs } from "antd";
import moment from "moment";
import { Layout, Button } from "antd";
import Account from "@/pages/profile/index";
import CarRental from "@/pages/profile/car-rental/index";
import CarLiked from "@/pages/profile/car-liked";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useRouter } from "next/router";
import { LogoutOutlined } from "@ant-design/icons";

import { UploadProfilePicture } from "@/components/UploadProfilePicture";

const { TabPane } = Tabs;

const { Content } = Layout;
const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: <span className="text-lg font-semibold text-center ">Profile</span>,
    children: <Account />,
  },
  {
    key: "2",
    label: (
      <span className="text-lg font-semibold text-center">
        Lịch sử thuê xe{" "}
      </span>
    ),
    children: <CarRental />,
  },
  {
    key: "3",
    label: (
      <span className="text-lg font-semibold text-center">Xe yêu thích</span>
    ),
    children: <CarLiked />,
  },
];

export const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useUserState();
  const [driver, setDriver] = useDriverState();
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  return (
    <Layout className="flex max-w-6xl  mx-auto border-b bg-slate-100  ">
      <HeaderComponent />

      <Layout
        className=" flex max-w-6xl min-h-screen relative  mt-10 mb-10 border-b bg-slate-100 "
        style={{
          minHeight: "100vh",
        }}
        hasSider
      >
        <div
          className="flex mt-5 relative flex-col   m-auto ml-5 mr-5  bg-gray-50   p-4 "
          style={{
            width: "30%",
          }}
        >
          <div
            className="flex w-full flex-col justify-center items-center bg-gray-50 p-4 "
            style={{
              minHeight: "0vh",

              backgroundColor: "#fff",
            }}
          >
            <Button
              className="absolute top-0 right-0 text-red-600 "
              onClick={() => {
                clearAccessToken();
                setUser(null);
                setDriver(null);
                clearProfile();
                router.push("/");
              }}
            >
              <LogoutOutlined />
            </Button>
            <UploadProfilePicture />

            <div className="flex flex-col  ">
              <h5 className="text-lg font-semibold text-center mt-1 mb-2 ">
                {user?.result?.username}
              </h5>

              <p className="mt-0">
                Tham gia: {moment(user?.result?.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>

        <Content
          className=" w-[calc(100%-23%)]  mt-5 mb-5  overflow-y-scroll  h-0 bg-gray-50 p-4  "
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <Tabs
            className=" w-full mb-3 flex mt-0     "
            defaultActiveKey="1"
            centered
            items={items}
            onChange={onChange}
          />
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};
