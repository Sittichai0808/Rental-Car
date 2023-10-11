"use client";
import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Image from "next/image";
import logo from "../../../public/logo.png";
import styled from "@emotion/styled";
import { GooglePlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const { Title } = Typography;

const StyleInput = styled(Input)`
  border-color: #949494;
  height: 50px;
  width: 400px;
`;
const StyleInputPassword = styled(Input.Password)`
  width: 400px;
  height: 50px;
  border-color: #949494;
`;

const ButtonSummit = styled(Button)`
  width: 400px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  padding: 30px auto;
`;

const LoginPage = () => {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",

        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { mutate } = useMutation(onSubmit);
  return (
    <div className="py-[30px] px-[20px] h-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src={logo} alt="logo" width={50} height={50} />
        <Title>Đăng nhập</Title>

        <div>
          <Form
            form={form}
            onFinish={(values) => {
              mutate(values);
            }}
            layout="vertical"
            name="basic"
            style={{
              maxWidth: 600,
            }}
            initialValues={{}}
            autoComplete="off"
            className="mt-5"
          >
            <Form.Item
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
              <StyleInput placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <StyleInputPassword
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <div className="flex justify-end">
              <Button
                type="text"
                className="  text-green-400 font-bold text-base  mb-3"
              >
                Quên mật khẩu?
              </Button>
            </div>

            <Form.Item>
              <ButtonSummit type="primary" htmlType="submit">
                Đăng nhập
              </ButtonSummit>
            </Form.Item>
          </Form>
          <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden  justify-end  ">
            <div className="flex justify-end">
              <div level={5}>
                Bạn chưa có tài khoản?{" "}
                <Button
                  type="text"
                  className="font-bold text-base text-green-500"
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
          <Title level={5} className="flex justify-center">
            Or
          </Title>
          <Button
            type="default"
            className="relative  text-base h-[50px] w-[400px] py-2 mt-2"
          >
            <GooglePlusOutlined
              style={{
                fontSize: "25px",
                position: "absolute",
                left: "20px",
                color: "gray",
              }}
            />
            Sign Up With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
