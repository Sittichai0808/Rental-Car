"use client";
import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Image from "next/image";
import logo from "../../../public/logo.png";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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

const RegisterPage = () => {
  const loaderProp = ({ src }) => {
    return src;
  };
  const [form] = Form.useForm();
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",

        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        router.push("/");
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
    <div className="py-[30px] px-[20px] h-screen">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          loader={loaderProp}
        />
        <Title>Đăng ký thông tin</Title>
        {/* <Title level={5}>Đăng ký thông tin</Title> */}

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
            autoComplete="off"
            className="mt-5"
          >
            <Form.Item
              name="username"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your uesrname!",
                  whitespace: true,
                },
              ]}
            >
              <StyleInput
                placeholder="Username"
                size="large"
                // style={{ border: "2px solid red" }}
              />
            </Form.Item>
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

            <Form.Item
              name="confirm_password"
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

            <Form.Item
            //   wrapperCol={{
            //     offset: 8,
            //     span: 16,
            //   }}
            >
              <ButtonSummit type="primary" htmlType="submit">
                Đăng ký
              </ButtonSummit>
            </Form.Item>
          </Form>
          <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden  justify-end  ">
            <Title level={5}>
              Bạn đã có tài khoản?{" "}
              <Button
                type="text"
                className="font-bold text-base text-green-500"
              >
                Đăng Nhập
              </Button>
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
