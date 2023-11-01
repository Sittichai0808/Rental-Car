import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import {
  Typography,
  Button,
  Avatar,
  Input,
  Modal,
  Select,
  Divider,
} from "antd";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import styled from "@emotion/styled";
import { ProfileLayout } from "@/layouts/ProfileLayout";
const { Title } = Typography;
const StyleInput = styled(Input)`
  display: flex;
  align-items: center;
  border-color: #fff;
  background-color: #fff;
  font-weight: bold;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.88);
  padding: 12px;
  width: 100%;
`;
const StyleButton = styled(Button)`
  border-color: #5fcf86;
  background-color: #5fcf86;
  margin-top: 20px;
  height: 60px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyleSelect = styled(Select)`
  font-size: 2rem;
  border-color: #f6f6f6;
  color: #333;
`;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function AccountPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOk = () => setOpen(false);
  const handleCancle = () => setOpen(false);

  const loaderProp = ({ src }) => {
    return src;
  };
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [user, setUser] = useUserState();
  useEffect(() => {
    setUser(profile);
  }, [user]);

  return (
    <div className="flex flex-col  mt-5">
      <div className="flex flex-col  pl-10 pr-5 bg-white pb-6 ">
        <div className="flex flex-col mb-3  mt-3 ">
          <div className="flex flex-row w-full    ">
            <p className="m-0 text-lg font-semibold flex w-full "> Full Name</p>
            <p className="m-0 text-xl font-semibold text-gray-500 flex w-full">
              Đặng Ngọc Thịnh
              <Button
                className="items-center absolute right-5"
                style={{
                  border: "1px solid #e0e0e0",

                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <EditOutlined />
              </Button>
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>

        <div className="flex flex-col mb-3 justify-center items-center">
          <div className="flex flex-row w-full  ">
            <p className="mt-0 mb-0 text-lg font-semibold flex w-full ">
              {" "}
              Email
            </p>
            <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
              {" "}
              {user?.email}
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>

        <div className="flex flex-col  mb-3">
          <div className="flex flex-row w-full ">
            <p className="mt-0 mb-0 text-lg font-semibold flex w-full ">
              {" "}
              PhoneNumber
            </p>
            <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
              {" "}
              {user?.phoneNumber}
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex flex-row w-full ">
            <p className="mt-0 mb-0 text-lg font-semibold flex w-full ">
              {" "}
              Giới tính
            </p>
            <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
              {" "}
              Nam
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col  pl-10 pr-5 bg-white pb-6">
        <div className="flex title items-center justify-between">
          <Title className="flex items-center font-semibold text-xl" level={3}>
            Giấy phép lái xe
          </Title>
          <div className="flex items-baseline ">
            <Button className="rounded-lg border-solid border-black font-bold text-xs">
              Chỉnh sửa
              <EditOutlined />
            </Button>
          </div>
        </div>
        <div className="flex items-center ">
          <Title className="text-xs font-medium ">
            Vì sao tôi phải xác thực GPLX
            <QuestionCircleOutlined />
          </Title>
        </div>
        <div className="content flex flex-row">
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Thông tin chung
            </Title>
            <div className="w-4/5 flex flex-col">
              <div className="flex flex-col  justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Số GPLX
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold"
                  placeholder="Email"
                  size="small"
                  defaultValue="09248205850"
                />
              </div>
              <div className="flex flex-col  justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium "
                >
                  Họ và tên
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold"
                  placeholder="Email"
                  size="small"
                  defaultValue="NGUYEN NGOC NGAN"
                />
              </div>
              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Ngày sinh
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold"
                  placeholder="Email"
                  size="small"
                  value={user?.date_of_birth}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Hình ảnh
            </Title>
            <div className="flex flex-col justify-evenly h-full">
              <Image
                className="w-full object-cover rounded-xl"
                src="/images/car-detail.jpg"
                alt="bgImage"
                width={300}
                height={200}
                loader={loaderProp}
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountPage.Layout = ProfileLayout;
