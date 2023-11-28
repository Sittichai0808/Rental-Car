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
    <Layout className="flex max-w-6xl mx-auto bg-white ">
      <HeaderComponent />

      <Layout
        className=" flex max-w-6xl min-h-screen relative mt-10 mb-10 bg-white"
        style={{
          minHeight: "100vh",
        }}
        hasSider
      >
        <div
          className="flex flex-col relative justify-center items-center m-auto mt-5 mx-5 border rounded-xl border-solid border-neutral-200  p-4 "
          style={{
            width: "30%",
            boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
          }}
        >
          <Button
            className="absolute top-0 right-0 bg-red-500 "
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
          <div className="flex w-full flex-col justify-center items-center mx-auto pt-10">
            <UploadProfilePicture />
          </div>
          <div className="flex flex-col mt-2 ">
            <h5 className="text-lg font-semibold text-center mt-1 mb-2 ">
              {user?.result?.username}
            </h5>

            <p className="mt-0">
              Tham gia: {moment(user?.result?.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>

        <Content
          className=" w-[calc(100%-23%)] flex flex-col my-5 overflow-y-scroll h-0 border rounded-xl border-solid border-neutral-200 p-4 "
          style={{
            minHeight: "100vh",
            boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
          }}
        >
          <Tabs
            className=" w-full mb-3 flex mt-0 "
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
