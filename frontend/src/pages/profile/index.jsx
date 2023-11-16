import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/recoils/user.state.js";
import { useDriverState } from "@/recoils/driver.state";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Typography,
  Button,
  Input,
  Modal,
  Form,
  Upload,
  notification,
} from "antd";
import {
  EditOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import styled from "@emotion/styled";
import { ProfileLayout } from "@/layouts/ProfileLayout";
import Link from "next/link";

const { Title } = Typography;
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

export default function AccountPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    });
  };
  const handleCancle = () => setOpen(false);

  const [user, setUser] = useUserState();
  const [driver, setDriver] = useDriverState();
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  const updateProfile = async (values) => {
    console.log("User Object:", user);
    console.log("value:", values);
    console.log("user._id:", user?.result?._id);
    console.log("Access Token:", accessToken);
    try {
      const formData = new FormData();
      if (values.address !== undefined) {
        formData.append("address", values.address);
      }
      if (values.email !== undefined) {
        formData.append("email", values.email);
      }
      if (values.username !== undefined) {
        formData.append("username", values.username);
      }
      if (values.phoneNumber !== undefined) {
        formData.append("phoneNumber", values.phoneNumber);
      }
      if (values.profilePicture !== undefined) {
        formData.append(
          "profilePicture",
          values.profilePicture.file.originFileObj
        );
      }

      const userId = user?.result?._id;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/update-user/${userId}`,
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
        setUser({ ...response.data });
        handleOk();
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
      }, 1000);
    },
  });
  return (
    <div className="flex flex-col  mt-5">
      <div className="flex flex-col  pl-10 pr-5  pb-6 ">
        <div className="flex flex-col mb-3  mt-3 ">
          <div className="flex flex-row w-full    ">
            <p className="m-0 text-lg font-semibold flex w-full "> Address</p>
            <p className="m-0 text-xl font-semibold text-gray-500 flex w-full">
              {user?.result?.address}

              <Button
                className="items-center absolute right-5"
                style={{
                  border: "1px solid #e0e0e0",

                  borderRadius: "100%",
                  cursor: "pointer",
                }}
                onClick={showModal}
              >
                <EditOutlined />
              </Button>
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
                    label="Address"
                    name="address"
                    rules={[
                      {
                        type: "text",
                        message: "The input is not valid name",
                      },
                    ]}
                  >
                    <StyleInputModal
                      defaultValue={user?.result?.address}
                      size="large"
                    />
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
                    <StyleInputModal
                      defaultValue={user?.result?.email}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    label="PhoneNumber"
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

                  <Form.Item label="ProfilePicture" name="profilePicture">
                    <Upload showUploadList={true} accept="image/*">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Form>
              </Modal>
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>

        <div className="flex flex-col mb-3 justify-center items-center">
          <div className="flex flex-row w-full  ">
            <p className="mt-0 mb-0 text-lg font-semibold flex w-full ">
              {" "}
              Email
            </p>
            <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
              {" "}
              {user?.result?.email}
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>

        <div className="flex flex-col  mb-3">
          <div className="flex flex-row w-full ">
            <p className="mt-0 mb-0 text-lg font-semibold flex w-full ">
              {" "}
              PhoneNumber
            </p>
            <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
              {" "}
              {user?.result?.phoneNumber}
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex flex-row w-full ">
            <p className="mt-0 mb-0 text-lg font-semibold flex w-full ">
              {" "}
              Giới tính
            </p>
            <p className="mt-0 mb-0 text-xl font-semibold text-gray-500 flex w-full">
              {" "}
              Nam
            </p>
          </div>
          <hr
            className="w-full"
            style={{
              margin: "1rem 0",
              color: "inherit",
              opacity: ".25",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col  pl-10 pr-5  pb-6">
        <div className="flex title items-center justify-between">
          <Title className="flex items-center font-semibold text-xl" level={3}>
            Giấy phép lái xe
            <p className="rounded-lg border-solid border-black text-xs bg-orange-400 ">
              {driver?.result?.status || "Chưa xác thực"}
            </p>
          </Title>
          <div className="flex items-baseline ">
            <Link href={`profile/driverlicsense`}>
              <Button className="rounded-lg border-solid border-black font-bold text-xs">
                Chỉnh sửa
                <EditOutlined />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center ">
          <Title className="text-xs font-medium ">
            Vì sao tôi phải xác thực GPLX
            <QuestionCircleOutlined />
          </Title>
        </div>
        <div className="content flex flex-row">
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Thông tin chung
            </Title>
            <div className="w-4/5 flex flex-col">
              <div className="flex flex-col  justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Số GPLX
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={driver?.result?.drivingLicenseNo}
                />
              </div>
              <div className="flex flex-col  justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium "
                >
                  Họ và tên
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={driver?.result?.fullName}
                />
              </div>
              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Ngày sinh
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={
                    driver?.result?.dob
                      ? moment(driver?.result?.dob).format("DD/MM/YYYY")
                      : driver?.result?.dob
                  }
                />
              </div>
              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Class
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold text-slate-950"
                  size="small"
                  value={driver?.result?.class}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Hình ảnh
            </Title>
            <div className="flex flex-col justify-evenly h-full">
              <Image
                className="w-full object-cover rounded-xl"
                src={driver?.result?.image}
                alt="Image"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountPage.Layout = ProfileLayout;
