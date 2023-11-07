import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { Tabs } from "antd";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { Layout, Avatar, Button, Upload, message } from "antd";
import Account from "@/pages/profile/index";
import CarRental from "@/pages/profile/car-rental/index";
// import CarFavorite from "@/pages/profile/car-favorite/index";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useRouter } from "next/router";
import {
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import avatar from "../../public/avatar.jpg";
import Image from "next/image";

const { TabPane } = Tabs;
import axios from "axios";
const { Sider, Content } = Layout;
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
  },
];

export const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [user, setUser] = useUserState();

  useEffect(() => {
    setUser(profile);
  }, [user]);
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage(
    "access_token",
    ""
  );

  const onSubmit = async ({ file }) => {
    console.log("User Object:", user);
    console.log("value:", file);
    console.log("user._id:", user._id);
    console.log("Access Token:", accessToken);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/upload-image/${user._id}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );

      if (response.status === 200) {
        const image_url = response.data.result.profilePicture;
        console.log("Image URL:", image_url);

        console.log(response.data);

        setUser({ ...response.data.result });
        setProfile({ ...response.data.result });

        router.push(window.location.reload());
      } else {
        console.log(error.response.data.errors[0].msg);
      }
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
                console.log("log out");
                clearProfile();
                clearAccessToken();
                setUser(null);
                router.push("/");
              }}
            >
              <LogoutOutlined />
            </Button>

            {/* <input
              className=""
              type="file"
              accept="image/*"
              onChange={onSubmit}
            /> */}
            <Image
              className="flex justify-center items-center rounded object-cover "
              height={100}
              width={90}
              icon={<UserOutlined />}
              src={user?.profilePicture[0]}
              alt="Image"
            />
            <Upload
              customRequest={onSubmit}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
            <div className="flex flex-col  ">
              <h5 className="text-lg font-semibold text-center mt-1 mb-2 ">
                {user?.username}
              </h5>

              <p className="mt-0">
                Tham gia: {moment(user?.createdAt).format("DD/MM/YYYY")}
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
