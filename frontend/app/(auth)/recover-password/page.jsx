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

const ButtonSummit = styled(Button)`
  width: 400px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  padding: 30px auto;
`;

const RecoverPasswordPage = () => {
  return (
    <div className="py-[30px] px-[20px] h-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src={forgotPassword} alt="logo" width={50} height={50} />
        <Title>Quên mật khẩu</Title>
        <Title level={5}>Nhập email để lấy lại mật khẩu</Title>

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
                Tiếp tục
              </ButtonSummit>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
