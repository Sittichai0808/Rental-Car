import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Input, Form } from "antd";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";

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

export default function EditPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [user, setUser] = useUserState();
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  const onSubmit = async (values) => {
    console.log("User Object:", user);
    console.log("value:", values);
    console.log("user._id:", user._id);
    console.log("Access Token:", accessToken);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/update-user/${user._id}`,
        values,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setUser({ ...response.data.result });
        setProfile({ ...response.data.result });
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
          Cập nhật thông tin
        </p>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={(values) => {
            mutate(values);
          }}
          label
          initialValues={{}}
          autoComplete="off"
          className="mt-5 "
        >
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your name",
              },
            ]}
          >
            <StyleInputModal type="text" placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                type: "text",
                message: "The input is not valid name",
              },
              {
                required: true,
                message: "Please input your name",
              },
            ]}
          >
            <StyleInputModal placeholder="Address" size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <StyleInputModal placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            label="PhoneNumber"
            name="phoneNumber"
            rules={[
              {
                type: "text",
                message: "The input is not valid phonenumber!",
              },
              {
                required: true,
                message: "Please input your phonenumber",
              },
            ]}
          >
            <StyleInputModal placeholder="Phone Number" size="large" />
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
