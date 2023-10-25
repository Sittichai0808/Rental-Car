"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Typography, Steps, Radio, Space } from "antd";
import axios from "axios";

import { useRouter } from "next/router";

const { Title } = Typography;
const BookingPage = () => {
  const status = ["process", "wait", "finish"];
  const [result, setResult] = useState("");
  const [current, setCurrent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [form] = Form.useForm();

  const router = useRouter();
  useEffect(() => {
    if (router.query.vnp_TransactionStatus) {
      if (router.query.vnp_TransactionStatus === "00") {
        setResult("Giao Dịch thành công");
      } else if (router.query.vnp_TransactionStatus === "01") {
        setResult("Giao dịch chưa hoàn tất");
      } else if (router.query.vnp_TransactionStatus === "02") {
        setResult("Giao dịch bị lỗi");
      } else if (router.query.vnp_TransactionStatus === "03") {
        setResult(
          "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)"
        );
      } else {
        setResult("Giao dịch bị nghi ngờ gian lận");
      }
      setCurrent(2);
    }
  });
  const handleCheckoutVNPAY = () => {
    setCurrent(1);
    setPaymentMethod("vnpay");
  };
  const handleCheckoutMOMO = () => {
    setCurrent(1);
    setPaymentMethod("momo");
  };
  //   vnp_TransactionStatus;
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/payments/create_payment_url`,

        values,
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );

      if (response.status === 200) {
        window.location.assign(response.data);
      } else {
        console.log(error);
        // toast.error(error.response.data.errors[0].msg, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      }
    } catch (error) {
      console.log(error);
      //   toast.error(error.response.data.errors[0].msg, {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
    }
  };

  const onSubmitMOMO = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/payments/create_payment_url_momo`,

        values,
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );

      if (response.status === 200) {
        window.location.assign(response.data);
      } else {
        console.log(error);
        // toast.error(error.response.data.errors[0].msg, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      }
    } catch (error) {
      console.log(error);
      //   toast.error(error.response.data.errors[0].msg, {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
    }
  };

  const { mutate } = useMutation(onSubmit);
  const { mutate1 } = useMutation(onSubmitMOMO);
  return (
    <div>
      <Steps
        className="mt-5"
        current={current}
        items={[
          {
            title: "Thủ tục thanh toán",
          },

          {
            title: "Thanh toán",
          },
          {
            title: "Kết quả",
          },
        ]}
      />

      {current === 0 && (
        <div className="mt-5">
          <Space direction="vertical">
            <Button
              type="primary"
              className="font-bold"
              onClick={handleCheckoutVNPAY}
            >
              Thanh toán VNPAY
            </Button>
            <Button
              type="primary"
              className="font-bold"
              onClick={handleCheckoutMOMO}
            >
              Thanh toán MOMO
            </Button>
          </Space>
        </div>
      )}

      {current === 1 && paymentMethod === "vnpay" && (
        <div className="mt-5">
          <Form
            form={form}
            onFinish={(values) => {
              mutate(values);
            }}
            layout="vertical"
            name="basic"
            initialValues={{ bankCode: "", language: "vn" }}
            style={{
              maxWidth: 600,
            }}
            size="large"
            className="mt-5"
          >
            <Form.Item
              name="amount"
              label="Số tiền:"
              rules={[
                {
                  required: true,
                  message: "Số tiền không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="bankCode" label="Chọn Phương thức thanh toán:">
              <Radio.Group name="bankCode">
                <Space direction="vertical">
                  <Radio value="" checked={true}>
                    Cổng thanh toán VNPAYQR
                  </Radio>
                  <Radio name="bankCode" value="VNPAYQR">
                    Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                  </Radio>
                  <Radio name="bankCode" value="VNBANK">
                    Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                  </Radio>
                  <Radio name="bankCode" value="INTCARD">
                    Thanh toán qua thẻ quốc tế
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="language" label="Ngôn ngữ:">
              <Radio.Group name="language">
                <Space direction="vertical">
                  <Radio value="vn">Tiếng việt</Radio>
                  <Radio value="en">Tiếng anh</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thanh Toán
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {current === 1 && paymentMethod === "momo" && (
        <div className="mt-5">
          <Form
            form={form}
            onFinish={(values) => {
              mutate1(values);
            }}
            layout="vertical"
            name="basic"
            initialValues={{ bankCode: "", language: "vn" }}
            style={{
              maxWidth: 600,
            }}
            size="large"
            className="mt-5"
          >
            <Form.Item
              name="amount"
              label="Số tiền:"
              rules={[
                {
                  required: true,
                  message: "Số tiền không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item name="bankCode" label="Chọn Phương thức thanh toán:">
              <Radio.Group name="bankCode">
                <Space direction="vertical">
                  <Radio value="" checked={true}>
                    Cổng thanh toán VNPAYQR
                  </Radio>
                  <Radio name="bankCode" value="VNPAYQR">
                    Thanh toán qua ứng dụng hỗ trợ VNPAYQR
                  </Radio>
                  <Radio name="bankCode" value="VNBANK">
                    Thanh toán qua ATM-Tài khoản ngân hàng nội địa
                  </Radio>
                  <Radio name="bankCode" value="INTCARD">
                    Thanh toán qua thẻ quốc tế
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="language" label="Ngôn ngữ:">
              <Radio.Group name="language">
                <Space direction="vertical">
                  <Radio value="vn">Tiếng việt</Radio>
                  <Radio value="en">Tiếng anh</Radio>
                </Space>
              </Radio.Group>
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thanh Toán
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {current === 2 && (
        <div className="flex justify-center items-start mt-5 text-gray-700">
          {router.query.vnp_TransactionStatus === "00" ? (
            <div className="flex flex-col justify-center items-center mt-5 text-gray-700">
              <CheckCircleOutlined
                style={{ fontSize: "35px", color: "#22c12a" }}
              />

              <h1>{result}</h1>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-5 text-gray-700">
              <CloseCircleOutlined
                style={{ fontSize: "35px", color: "#c12222" }}
              />

              <h1>{result}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BookingPage;
