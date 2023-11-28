import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDriverState } from "@/recoils/driver.state.js";
import { useUserState } from "@/recoils/user.state.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Button,
  Input,
  Form,
  Upload,
  notification,
  Modal,
  InputNumber,
} from "antd";
import styled from "@emotion/styled";
import { UploadOutlined, UserAddOutlined } from "@ant-design/icons";
import moment from "moment";

const ButtonSummit = styled(Button)`
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  padding: 30px auto;
`;

export default function RegisterDriverModal({
  openRegisterDriver,
  handleCancleRegisterDriver,
}) {
  const [form] = Form.useForm();
  const [user, setUser] = useUserState();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [driver, setDriver] = useDriverState();

  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");

  useEffect(() => {
    setDriver(profile);
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "fullName",
      values.fullName || user?.result?.driverLicenses?.fullName
    );
    formData.append(
      "drivingLicenseNo",
      values.drivingLicenseNo || user?.result?.driverLicenses?.drivingLicenseNo
    );
    formData.append("dob", values.dob || user?.result?.driverLicenses?.dob);
    formData.append(
      "class",
      values.class || user?.result?.driverLicenses?.class
    );
    formData.append(
      "image",
      values.image?.file?.originFileObj || user?.result?.driverLicenses?.image
    );

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
        handleCancleRegisterDriver();
        const successMessage =
          driver || user?.result?.driverLicenses
            ? "Cập nhật thành công"
            : "Đăng kí thành công";

        notification.success({
          message: successMessage,
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
      open={openRegisterDriver}
      onCancel={handleCancleRegisterDriver}
      footer={[
        <ButtonSummit
          loading={isLoading}
          htmlType="submit"
          type="primary"
          onClick={() => mutate(form.getFieldsValue())}
        >
          {driver || user?.result?.driverLicenses ? "Cập nhật" : " Đăng kí"}
        </ButtonSummit>,
      ]}
    >
      <p className="flex justify-center items-center w-full text-2xl font-bold">
        {driver || user?.result?.driverLicenses
          ? "Cập nhật GPLX"
          : "Đăng kí GPLX"}
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
        className="flex gap-4 mt-10"
      >
        <div className="w-2/3">
          <Form.Item label="Họ và tên" name="fullName" required>
            <Input
              defaultValue={
                driver?.result?.fullName ||
                user?.result?.driverLicenses?.fullName
              }
            />
          </Form.Item>
          <Form.Item label="Số GPLX" name="drivingLicenseNo" required>
            <InputNumber
              defaultValue={
                driver?.result?.drivingLicenseNo ||
                user?.result?.driverLicenses?.drivingLicenseNo
              }
              className="w-full"
            />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dob" required>
            <Input
              defaultValue={
                driver?.result?.dob
                  ? moment(driver?.result?.dob).format("DD-MM-YYYY")
                  : user?.result?.driverLicenses?.dob
                  ? moment(user?.result?.driverLicenses?.dob).format(
                      "DD-MM-YYYY"
                    )
                  : user?.result?.driverLicenses?.dob || ""
              }
            />
          </Form.Item>
          <Form.Item label="Hạng" name="class" required>
            <Input
              defaultValue={
                driver?.result?.class || user?.result?.driverLicenses?.class
              }
            />
          </Form.Item>
        </div>

        <div className="grow">
          <Form.Item
            label="Hình ảnh"
            name="image"
            defaultValue={
              driver?.result?.image || user?.result?.driverLicenses?.image
            }
          >
            <Upload.Dragger
              listType="picture-card"
              className="aspect-square"
              showUploadList={true}
            >
              <UserAddOutlined />
            </Upload.Dragger>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
