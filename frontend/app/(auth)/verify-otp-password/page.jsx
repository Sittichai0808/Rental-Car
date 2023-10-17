"use client";
import React from "react";
import { Button, Form, Input, Typography } from "antd";
import Image from "next/image";
import forgotPassword from "../../../public/forgotPassword.png";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const onSubmit = async (values) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users/verify-otp/${values.otp}`,

        { email },

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully");
        router.push(`/reset-password?email=${email}`);
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
            form={form}
            onFinish={(values) => {
              mutate(values);
            }}
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
