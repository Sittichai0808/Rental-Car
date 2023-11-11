import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import { useUserState } from "@/recoils/user.state.js";
import { useDriverState } from "@/recoils/driver.state";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import {
  Typography,
  Button,
  Avatar,
  Input,
  Modal,
  Select,
  Divider,
  Form,
} from "antd";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import styled from "@emotion/styled";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import Link from "next/link";
import { borderRadius } from "@material-ui/system";

const { Title } = Typography;
const StyleInput = styled(Input)`
  display: flex;
  align-items: center;
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
const StyleInputModal = styled(Input)`
  border-color: #949494;
  height: 50px;
  width: 100%;
`;
const ButtonSummit = styled(Button)`
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  padding: 30px auto;
`;

export default function AccountPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOk = () => setOpen(false);
  const handleCancle = () => setOpen(false);

  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [user, setUser] = useUserState();
  const [driver, setDriver] = useDriverState();

  useEffect(() => {
    setUser(profile);
  }, [user]);
  useEffect(() => {
    setDriver(profile);
  }, [driver]);

  return (
    <div className="flex flex-col  mt-5">
      <div className="flex flex-col  pl-10 pr-5  pb-6 ">
        <div className="flex flex-col mb-3  mt-3 ">
          <div className="flex flex-row w-full    ">
            <p className="m-0 text-lg font-semibold flex w-full "> Address</p>
            <p className="m-0 text-xl font-semibold text-gray-500 flex w-full">
              {user?.address}
              <Link href={`/profile/edit-profile `}>
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
              </Link>
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

      <div className="flex flex-col  pl-10 pr-5  pb-6">
        <div className="flex title items-center justify-between">
          <Title className="flex items-center font-semibold text-xl" level={3}>
            Giấy phép lái xe
            <p className="rounded-lg border-solid border-black text-xs bg-orange-400 ">
              {driver?.status || "Chưa xác thực"}
            </p>
          </Title>

          <div className="flex items-baseline ">
            <Link href={`/profile/driverlicsense `}>
              <Button className="rounded-lg border-solid border-black font-bold text-xs">
                Chỉnh sửa
                <EditOutlined />
              </Button>
            </Link>
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
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={driver?.drivingLicenseNo}
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
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={driver?.fullName}
                />
              </div>
              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Dob
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={moment(user?.dob).format("DD/MM/YYYY") || driver?.dob}
                  // value={user?.dob}
                />
              </div>

              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Class
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={driver?.class}
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
                src={
                  driver?.image ||
                  "https://res.cloudinary.com/djllhxlfc/image/upload/v1698163098/cars/lnyyfgbsjmcb86wshum7.jpg"
                }
                alt="Image"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountPage.Layout = ProfileLayout;
