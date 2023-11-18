import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDriverState } from "@/recoils/driver.state.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Input, Form, Upload, notification, Modal } from "antd";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { UploadOutlined, UserAddOutlined } from "@ant-design/icons";

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

export default function RegisterDriverModal({ open2, handleCancle2 }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [driver, setDriver] = useDriverState();
  useEffect(() => {
    setDriver(profile);
  });
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  const onSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("drivingLicenseNo", values.drivingLicenseNo);
    formData.append("dob", values.dob);
    formData.append("class", values.class);
    formData.append("image", values.image.file.originFileObj);

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

        setDriver({ ...response.data });
        setProfile({ ...response.data });
        handleCancle2();
        notification.success({
          message: "Đăng kí thành công",
        });
      } else {
        console.log(error.response.data.errors[0].msg);
      }
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  const { mutate, isLoading } = useMutation(onSubmit, {
    onMutate: () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  return (
    <Modal
      open={open2}
      onCancel={handleCancle2}
      footer={[
        <ButtonSummit
          loading={isLoading}
          htmlType="submit"
          type="primary"
          onClick={() => mutate(form.getFieldsValue())}
        >
          Đăng kí
        </ButtonSummit>,
      ]}
    >
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
        initialValues={{}}
        autoComplete="off"
        className="mt-5 "
      >
        <Form.Item
          label="Họ và tên"
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
          label="Số GPLX"
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
          label="Ngày sinh"
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
          label="Hạng"
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

        <Form.Item label="Hình ảnh" name="image">
          <Upload.Dragger listType="picture-card" showUploadList={true}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
}
