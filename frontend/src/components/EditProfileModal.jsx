import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Input, Form, Upload, notification, Modal } from "antd";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const StyleInput = styled(Input)`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
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

export default function EditProfileModal({ open, handleCancle }) {
  const [form] = Form.useForm();
  const [user, setUser] = useUserState();
  const [loading, setLoading] = useState(false);
  console.log("abc2", user);
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  const updateProfile = async (values) => {
    try {
      const userId = user?.result?._id;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/update-user/${userId}`,
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
        setUser({ ...response.data });
        handleCancle();
        notification.success({
          message: "Cập nhật thành công",
        });
      } else {
        console.log(error.response.data.errors[0].msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isLoading } = useMutation(updateProfile, {
    onMutate: () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    },
  });

  return (
    <Modal
      open={open}
      onCancel={handleCancle}
      footer={[
        <ButtonSummit
          loading={isLoading}
          htmlType="submit"
          type="primary"
          onClick={() => mutate(form.getFieldsValue())}
        >
          Cập nhập
        </ButtonSummit>,
      ]}
    >
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
              type: "text",
              message: "Please input your name",
            },
          ]}
        >
          <StyleInputModal
            type="text"
            defaultValue={user?.result?.username}
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              type: "text",
              message: "The input is not valid name",
            },
          ]}
        >
          <StyleInputModal defaultValue={user?.result?.address} size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <StyleInputModal defaultValue={user?.result?.email} size="large" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              type: "text",
              message: "The input is not valid phonenumber!",
            },
          ]}
        >
          <StyleInputModal
            defaultValue={user?.result?.phoneNumber}
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
