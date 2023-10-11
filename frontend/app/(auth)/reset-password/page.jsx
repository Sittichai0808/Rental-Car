"use client";
import React from "react";
import { Button, Form, Input, Typography } from "antd";
import Image from "next/image";
import forgotPassword from "../../../public/forgotPassword.png";
import styled from "@emotion/styled";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const { Title } = Typography;

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

const ResetPasswordPage = () => {
  return (
    <div className="py-[30px] px-[20px] h-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src={forgotPassword} alt="logo" width={50} height={50} />
        <Title>Đặt lại mật khẩu mới</Title>
        <Title level={5} className="text-gray-400">
          Nhập lại mật khẩu mới để đăng nhập
        </Title>

        <div>
          <Form
            layout="vertical"
            name="basic"
            style={{
              maxWidth: 600,
            }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="mt-5"
          >
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

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <StyleInputPassword
                type="password"
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <ButtonSummit type="primary" htmlType="submit">
                Cập nhập
              </ButtonSummit>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
