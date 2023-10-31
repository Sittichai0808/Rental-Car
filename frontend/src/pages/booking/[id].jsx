"use client";
// import locale from "antd/en/date-picker/locale/zh_CN";

// import "dayjs/locale/zh-cn";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  Typography,
  Steps,
  Radio,
  Space,
  DateRangePicker,
  Divider,
  BorderlessTable,
  DatePicker,
} from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAccessTokenState } from "@/recoils/accessToken.state";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDatesState } from "@/recoils/dates.state";
const { Title } = Typography;
const { RangePicker } = DatePicker;
const BookingPage = () => {
  const router = useRouter();
  const { query, pathname } = useRouter();
  const carId = query?.id || "653912b7f01c77b98e74364c";
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const [amount, setAmount] = useState();
  const [value, setValue] = useState(1);
  const [costGetCar, setCostGetCar] = useState(0);

  const [dates, setDates] = useDatesState();

  const onChange = (e) => {
    setCostGetCar(e.target.value);
  };
  const status = ["process", "wait", "finish"];
  const [result, setResult] = useState("");
  const [current, setCurrent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [form] = Form.useForm();

  const codeTransaction = router.query?.vnp_TxnRef;
  const totalCost = router.query?.vnp_Amount;
  const timeTransaction = router?.query?.vnp_PayDate;

  const [startDate, endDate] = dates;

  const [totalDays, setTotalDays] = useState(endDate?.diff(startDate, "days"));
  const order = router.query?.vnp_OrderInfo;
  console.log(order);
  const orderInfo = order?.split(",");
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage(
    "access_token",
    ""
  );
  useEffect(() => {
    if (router.query.vnp_TransactionStatus) {
      if (router.query.vnp_TransactionStatus === "00") {
        const bookedCar = async () => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/bookings/${carId}`,
              {
                codeTransaction,
                totalCost,
                timeTransaction,

                phone: orderInfo[1],
                address: orderInfo[2],
                timeBookingStart: orderInfo[3],
                timeBookingEnd: orderInfo[4],
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            console.log(response.data.result);
            return response.data.result;
          } catch (error) {
            console.log(error);
          }
        };
        bookedCar();
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
  }, [router?.query?.vnp_TransactionStatus]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getCar", carId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cars/${carId}`,

          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data.result);
        return response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
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
      if (from === undefined || to === undefined) {
        moment(value[0]?.format("DD MM YYYY HH mm"))._i;
        from = moment(startDate?.format("DD MM YYYY HH mm"))._i;
        to = moment(endDate?.format("DD MM YYYY HH mm"))._i;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/payments/create_payment_url`,

        { ...values, from, to, id: data?._id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        window.location.assign(response.data);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

  const [validationMessage, setValidationMessage] = useState("");
  function isDateBooked(startDate, endDate) {
    for (const slot of bookedTimeSlots) {
      const bookedStart = new Date(slot.from);
      const bookedEnd = new Date(slot.to);

      console.log(bookedStart >= startDate, bookedEnd <= endDate);
      if (bookedStart >= startDate && bookedEnd <= endDate) return true;
    }

    return false; // Khoảng ngày không được đặt
  }

  const disabledDate = (current) => {
    // Kiểm tra nếu ngày là ngày quá khứ
    const isPastDate = current && current < moment().startOf("day");

    // Kiểm tra nếu ngày hiện tại nằm trong mảng bookedTimeSlots
    const isBookedDate = bookedTimeSlots.some((slot) => {
      const slotStart = moment(slot.from);
      const slotEnd = moment(slot.to);
      return current && current >= slotStart && current <= slotEnd;
    });

    return isPastDate || isBookedDate;
  };

  const result1 = useQuery({
    queryKey: ["getScheduleCar", carId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/bookings/${carId}`,

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setBookedTimeSlots(response.data.result);
        return response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    // Tính toán giá trị mới cho amount dựa trên totalDays
    const newAmount = totalDays * (data?.cost || 0) + (costGetCar || 0);

    // Cập nhật initialValues
    form.setFieldsValue({
      amount: newAmount, // Định dạng số tiền theo ý muốn
    });
  }, [totalDays, data?.cost, costGetCar]);

  const handleBack = () => {
    setTotalDays(endDate?.diff(startDate, "days"));
    setCurrent(0);
  };
  const selectTimeSlots = (value) => {
    if (value && value.length === 2) {
      const [startDate, endDate] = value;

      if (isDateBooked(startDate, endDate)) {
        setValidationMessage("Khoảng ngày đã được thuê.");
      } else {
        setValidationMessage("");
      }
    }

    setFrom(moment(value[0]?.format("DD MM YYYY HH mm"))._i);
    setTo(moment(value[1]?.format("DD MM YYYY HH mm"))._i);
    setTotalDays(value[1]?.diff(value[0], "days"));
  };
  const { mutate } = useMutation(onSubmit);
  const { mutate1 } = useMutation(onSubmitMOMO);
  const handleCheckout = (value) => {
    setTotalDays(totalDays);
    console.log(totalDays);
    setCurrent(1);
  };
  console.log(current);
  return (
    <div>
      <>
        {" "}
        <div class="flex flex-col mt-10 items-center justify-center border-b bg-slate-100 py-4 sm:flex-row sm:px-5 lg:px-5 xl:px-12">
          {/* <a href="#" class="text-2xl font-bold text-gray-800 w-1/3">
              My Checkout
            </a> */}
          <div class="flex  w-full mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base ">
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
            {/* <div class="relative">
                <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                  <li class="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </a>
                    <span class="font-semibold text-gray-900">Shop</span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li class="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                      href="#"
                    >
                      2
                    </a>
                    <span class="font-semibold text-gray-900">Shipping</span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li class="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                      href="#"
                    >
                      3
                    </a>
                    <span class="font-semibold text-gray-500">Payment</span>
                  </li>
                </ul>
              </div> */}
          </div>
        </div>
        {current === 0 && (
          <div class="grid sm:px-10 lg:grid-cols-2 p-5  bg-slate-100">
            <div class="px-10 pt-8 ">
              <p class="text-xl font-medium">Tổng kết đơn hàng</p>
              <p class="text-gray-400"></p>
              <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div class="flex flex-col rounded-lg bg-white sm:flex-row relative">
                  <div className="relative rounded-lg w-1/2">
                    <Image
                      alt="car"
                      src={data?.thumb}
                      layout="fill"
                      className="rounded-lg"
                    />
                  </div>

                  <div class="flex w-full flex-col px-4 py-4">
                    <span class="font-semibold text-lg">
                      {data?.model?.name} {data?.yearManufacture}
                    </span>
                    <span class="float-right text-gray-400">
                      {data?.transmissions} - {data?.numberSeat}
                    </span>
                    <p class="text-lg font-bold ">
                      {" "}
                      {data?.cost.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                      /ngày
                    </p>
                  </div>
                </div>
              </div>

              <p class="mt-8 text-lg font-medium">Phương thức nhận xe</p>
              <form class="mt-5 mb-5 grid gap-6">
                <Radio.Group onChange={onChange} value={costGetCar}>
                  <Space direction="vertical">
                    <Radio value={0}>Công ty CRT</Radio>
                    <Radio value={150000}>
                      Giao Tận nơi trong Thành phố Đà Nẵng (thêm 150k)
                    </Radio>
                  </Space>
                </Radio.Group>
              </form>
            </div>
            <div class="mt-14 bg-gray-50 px-10 pt-8 lg:mt-5">
              <p class="text-xl font-medium">Thông tin thuê chi tiết</p>
              <p class="text-gray-400">Thời gian thuê xe</p>
              <Space direction="vertical" size={12}>
                <RangePicker
                  showTime={{ format: "HH mm" }}
                  format="DD MM YYYY HH mm"
                  onChange={selectTimeSlots}
                  size="large"
                  disabledDate={disabledDate}
                  defaultValue={[startDate, endDate]}
                  // locale={locale}
                />
                {validationMessage && (
                  <p className="text-red-500">{validationMessage}</p>
                )}
              </Space>

              <p class="text-gray-400">Tổng Số ngày thuê: {totalDays} </p>
              <p class="text-gray-400">
                Giá 1 ngày thuê:{" "}
                {data?.cost.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p className="text-lg">
                Tổng giá thuê:{" "}
                {(totalDays * data?.cost + costGetCar).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>

              <button
                onClick={handleCheckout}
                className="mt-4 mb-2 w-full border-none  rounded-md bg-green-400 hover:bg-green-600 px-6 py-2 text-lg font-bold text-white cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}
        {current === 1 && (
          <div class="flex  justify-center  bg-slate-100">
            <div className="flex mt-5 mb-10 w-3/5 bg-slate-200 justify-center">
              <Form
                form={form}
                onFinish={(values) => {
                  mutate(values);
                }}
                layout="vertical"
                name="basic"
                initialValues={{
                  bankCode: "",
                  language: "vn",
                  amount: "0",
                }}
                style={{
                  width: 500,
                }}
                size="large"
                className="mt-5"
              >
                <Form.Item
                  name="fullname"
                  label="Họ và tên:"
                  rules={[
                    {
                      required: true,
                      message: "Họ và tên không được để trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại:"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ:"
                  rules={[
                    {
                      required: true,
                      message: "Địa chỉ không được để trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="date" label="Thời gian thuê xe">
                  <RangePicker
                    showTime={{ format: "HH mm" }}
                    format="DD MM YYYY HH mm"
                    onChange={selectTimeSlots}
                    defaultValue={[
                      dayjs(from || startDate, "DD MM YYYY HH mm"),
                      dayjs(to || endDate, "DD MM YYYY HH mm"),
                    ]}
                    disabled
                    style={{ width: "500px", color: "white" }}
                  />
                </Form.Item>
                <Form.Item name="amount" label="Số tiền:">
                  <Input readOnly />
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
                  <Space direction="horizontal">
                    <Button type="primary" htmlType="submit">
                      Thanh Toán
                    </Button>
                    <Button type="primary" onClick={handleBack}>
                      Trở về thủ tục thanh toán
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </>

      {/* {current === 1 && paymentMethod === "momo" && (
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
            </Form.Item>  */}

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
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thanh Toán
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}*/}

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
              <Link href="/">
                <Button type="primary">Trang chủ</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BookingPage;
