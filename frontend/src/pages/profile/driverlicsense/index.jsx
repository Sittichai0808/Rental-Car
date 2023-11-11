import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useDriverState } from "@/recoils/driver.state.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Input, Form, Upload } from "antd";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";

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

export default function DriverPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [driver, setDriver] = useDriverState();
  const [user, setUser] = useUserState();
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("drivingLicenseNo", values.drivingLicenseNo);
    formData.append("dob", values.dob);
    formData.append("class", values.class);
    formData.append("status", values.status);
    formData.append("image", values.image);

    console.log("User Object:", driver);
    console.log("value:", values);
    console.log("user._id:", user._id);
    console.log("Access Token:", accessToken);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/drivers/registerDriver`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        setDriver({ ...response.data.result });
        setProfile({ ...user, ...response.data.result });
        console.log("User Object:", driver);
        router.push("/profile");
      } else {
        console.log(error.response.data.errors[0].msg);
      }
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const { mutate } = useMutation(onSubmit);
  return (
    <div className="flex flex-col mt-10 items-center justify-center border-b bg-slate-100 py-4 sm:flex-row sm:px-5 lg:px-5 xl:px-12">
      <div className="flex flex-col justify-center  pl-10 pr-5  pb-6 w-1/2 ">
        <p className="flex justify-center items-center w-full text-2xl font-bold">
          Đăng kí GPLX
        </p>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={(values) => {
            mutate(values);
          }}
          label
          initialValues={{ status: driver?.status || "Chưa xác thực" }}
          autoComplete="off"
          className="mt-5 "
        >
          <Form.Item
            label="FullName"
            name="fullName"
            rules={[
              {
                type: "text",
                message: "Please input your name",
              },
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <StyleInputModal type="text" size="large" />
          </Form.Item>
          <Form.Item
            label="drivingLicenseNo"
            name="drivingLicenseNo"
            rules={[
              {
                type: "text",
                message: "The input is not valid drivingLicenseNo",
              },
              {
                required: true,
                message: "Please input your drivingLicenseNo!",
              },
            ]}
          >
            <StyleInputModal size="large" />
          </Form.Item>
          <Form.Item
            label="Dob"
            name="dob"
            rules={[
              {
                type: "text",
                message: "The input is not valid dob!",
              },
              {
                required: true,
                message: "Please input your drivingLicenseNo!",
              },
            ]}
          >
            <StyleInputModal size="large" />
          </Form.Item>
          <Form.Item
            label="Class"
            name="class"
            rules={[
              {
                type: "text",
                message: "The input is not valid class!",
              },
              {
                required: true,
                message: "Please input your class!",
              },
            ]}
          >
            <StyleInputModal size="large" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                type: "text",
                message: "The input is not valid status!",
              },
            ]}
          >
            <StyleInputModal size="large" />
          </Form.Item>
          <Form.Item label="image" name="image">
            <Upload showUploadList={false} accept="image/*">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <ButtonSummit type="primary" htmlType="submit">
              Cập nhập
            </ButtonSummit>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
