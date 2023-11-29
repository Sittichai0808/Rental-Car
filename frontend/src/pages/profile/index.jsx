import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useDriverState } from "@/recoils/driver.state";
import moment from "moment";
import { Typography, Button, Input, Image, Space } from "antd";
import {
  EditOutlined,
  QuestionCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";

import styled from "@emotion/styled";
import { apiClient } from "@/apis/client";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import EditProfileModal from "@/components/EditProfileModal";
import RegisterDriverModal from "@/components/RegisterDriverModal";
import { UploadProfilePicture } from "@/components/UploadProfilePicture";
import { LogoutOutlined } from "@ant-design/icons";
const { Title } = Typography;
const StyleInput = styled(Input)`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
`;

export default function AccountPage() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const showModalEdit = () => setOpenEditModal(true);
  const handleCancleEditModal = () => setOpenEditModal(false);

  const [openRegisterDriver, setOpenRegisterDriver] = useState(false);
  const showModalRegister = () => setOpenRegisterDriver(true);
  const handleCancleRegisterDriver = () => setOpenRegisterDriver(false);

  const [user, setUser] = useUserState();
  const [driver, setDriver] = useDriverState();
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const value = window.localStorage.getItem("access_token");

        if (value !== null) {
          const { data } = await apiClient.request({
            method: "GET",
            url: "/users/get-user",
            headers: {
              Authorization: `Bearer ${JSON.parse(value)}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          console.log(data);
          // Update the Recoil state with the fetched user data
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfile(); // Call the fetchData function
  }, [setUser]);

  const status = user?.result?.driverLicenses?.status || "Chưa xác thực";

  const backgroundColor = status === "Chưa xác thực" ? "#ffd0cd" : "#cff1db";

  return (
    <div className="flex flex-col mb-7 gap-5">
      <div
        className="flex flex-grow  relative border rounded-xl border-solid border-neutral-200 p-4  "
        style={{
          boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
        }}
      >
        <div
          className="flex flex-col relative justify-center items-center p-1 "
          style={{
            width: "30%",
          }}
        >
          <p className="  font-semibold text-xl mt-0 ">Thông tin tài khoản</p>

          <div className="flex w-full flex-col justify-center items-center mx-auto ">
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

        <div className="flex flex-col w-[calc(100%-30%)] mt-12 ">
          <div className="flex flex-col    ">
            <div className="flex flex-row">
              <p className="m-0 text-base font-semibold flex w-full ">
                {" "}
                Địa chỉ{" "}
              </p>
              <p className="m-0 text-xl font-semibold text-gray-500 flex w-full">
                {user?.result?.address}
              </p>
              <Button
                className="items-center absolute right-5"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
                onClick={showModalEdit}
              >
                <EditOutlined />
              </Button>
              <EditProfileModal
                openEditModal={openEditModal}
                handleCancleEditModal={handleCancleEditModal}
              />
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

          <div className="flex flex-col">
            <div className="flex flex-row w-full  ">
              <p className="mt-0 mb-0 text-base font-semibold flex w-full ">
                {" "}
                Email
              </p>
              <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
                {" "}
                {user?.result?.email}
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

          <div className="flex flex-col  ">
            <div className="flex flex-row w-full ">
              <p className="mt-0 mb-0 text-base font-semibold flex w-full ">
                {" "}
                Số điện thoại
              </p>
              <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
                {" "}
                {user?.result?.phoneNumber}
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
              <p className="mt-0 mb-0 text-base font-semibold flex w-full ">
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
      </div>
      <div
        className="flex flex-col  pl-10 pr-5  pb-6 relative border rounded-xl border-solid border-neutral-200 p-4"
        style={{
          boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
        }}
      >
        <div className="flex  items-center justify-between">
          <Title className="flex items-center font-semibold text-xl" level={3}>
            Giấy phép lái xe
            <p
              className={`rounded-lg text-xs ml-1 ${
                status === "Chưa xác thực" ? "text-red-500" : "text-green-500"
              }`}
              style={{
                background: backgroundColor,
                borderRadius: "100px",
                padding: "4px 6px",
              }}
            >
              {status}
            </p>
          </Title>
          <div className="flex items-baseline ">
            <Button
              className="rounded-lg border-solid border-black font-bold text-xs"
              onClick={showModalRegister}
            >
              Chỉnh sửa
              <EditOutlined />
            </Button>
            <RegisterDriverModal
              openRegisterDriver={openRegisterDriver}
              handleCancleRegisterDriver={handleCancleRegisterDriver}
            />
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
                  value={
                    driver?.result?.drivingLicenseNo ||
                    user?.result?.driverLicenses?.drivingLicenseNo
                  }
                />
              </div>

              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Hạng
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={
                    driver?.result?.class || user?.result?.driverLicenses?.class
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Hình ảnh
            </Title>

            <div className="flex flex-col justify-evenly h-full ">
              <Image
                className="w-full object-cover "
                src={
                  driver?.result?.image ||
                  user?.result?.driverLicenses?.image ||
                  "https://res.cloudinary.com/djllhxlfc/image/upload/v1700240517/cars/default-thumbnail_ycj6n3.jpg"
                }
                alt="Image"
                width={300}
                height={200}
                preview={{
                  toolbarRender: (
                    _,
                    {
                      transform: { scale },
                      actions: {
                        onFlipY,
                        onFlipX,
                        onRotateLeft,
                        onRotateRight,
                        onZoomOut,
                        onZoomIn,
                      },
                    }
                  ) => (
                    <Space size={12} className="toolbar-wrapper">
                      <SwapOutlined rotate={90} onClick={onFlipY} />
                      <SwapOutlined onClick={onFlipX} />
                      <RotateLeftOutlined onClick={onRotateLeft} />
                      <RotateRightOutlined onClick={onRotateRight} />
                      <ZoomOutOutlined
                        disabled={scale === 1}
                        onClick={onZoomOut}
                      />
                      <ZoomInOutlined
                        disabled={scale === 50}
                        onClick={onZoomIn}
                      />
                    </Space>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AccountPage.Layout = ProfileLayout;
