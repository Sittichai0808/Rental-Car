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

const StyleInput = styled(Input)`
  border-color: #949494;
  height: 50px;
  width: 400px;
`;

const ButtonSummit = styled(Button)`
  width: 400px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  padding: 30px auto;
`;

const VerifyOTPPasswordPage = () => {
  return (
    <div className="py-[30px] px-[20px] h-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src={forgotPassword} alt="logo" width={50} height={50} />
        <Title>Quên mật khẩu</Title>
        <div>CRT vừa gửi mã OTP vào email của bạn.</div>
        <Title level={5} className="text-gray-500">
          Vui lòng nhập mã gồm 6 số vào ô bên dưới để xác minh.
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
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please input your OTP!",
                },
              ]}
            >
              <StyleInput placeholder="Nhập mã OTP từ email" size="large" />
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

export default VerifyOTPPasswordPage;
