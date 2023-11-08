"use-client";
import {
  BackCameraIcon,
  BagFilledIcon,
  BluetoothIcon,
  DriverLicenceIcon,
  GasIcon,
  GpsIcon,
  IdCardIcon,
  ImageFilledIcon,
  InfoIcon,
  MapIcon,
  SeatIcon,
  ShieldCheckOutlineIcon,
  StarFilledIcon,
  TransmissionIcon,
  UsbIcon,
} from "@/icons";
import moment from "moment";
import dayjs from "dayjs";
import { Button, Divider, Table, Tag, DatePicker } from "antd";
import { DateRangePicker } from "@/components/antd";
import Image from "next/image";
import styled from "@emotion/styled";
import { Feedback } from "@/components/Feedback";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import { useDatesState } from "@/recoils/dates.state";
import { isSameOrAfter, isSameOrBefore } from "moment";

const carServices = [
  { icon: MapIcon, name: "Bản đồ" },
  { icon: BluetoothIcon, name: "Bluetooth" },
  { icon: BackCameraIcon, name: "Camera lùi" },
  { icon: GpsIcon, name: "Định vị GPS" },
  { icon: UsbIcon, name: "Khe cắm usb" },
];

const BorderlessTable = styled(Table)`
  .ant-table {
    background-color: transparent;
  }
`;

export default function CarDetailPage() {
  const router = useRouter();
  const carId = router.query.id;
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage(
    "access_token",
    ""
  );
  const [dates, setDates] = useDatesState();
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

  const [validationMessage, setValidationMessage] = useState("");
  function isDateBooked(startDate, endDate) {
    for (const slot of bookedTimeSlots) {
      const bookedStart = new Date(slot.from);
      const bookedEnd = new Date(slot.to);
      console.log(bookedStart, bookedEnd);
      console.log(bookedStart >= startDate, bookedEnd <= endDate);
      if (bookedStart >= startDate && bookedEnd <= endDate) return true;
    }

    return false; // Khoảng ngày không được đặt
  }

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;

      if (isDateBooked(startDate, endDate)) {
        setValidationMessage("Khoảng ngày đã được thuê.");
      } else {
        setValidationMessage("");
      }
    }

    setDates(dates);
  };

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

  const result = useQuery({
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
        console.log(response.data.result);
        setBookedTimeSlots(response.data.result);
        return response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <div className="grid h-[600px] gap-4 grid-cols-4 grid-rows-3 relative">
        <div className="relative col-span-3 row-span-3 rounded-md overflow-hidden">
          <Image alt="car" src={data?.thumb} layout="fill" />
        </div>
        <div className="relative rounded-md overflow-hidden">
          <Image alt="car" src={data?.images[0]} layout="fill" />
        </div>
        <div className="relative rounded-md overflow-hidden">
          <Image alt="car" src={data?.images[1]} layout="fill" />
        </div>
        <div className="relative rounded-md overflow-hidden">
          <Image alt="car" src={data?.images[2]} layout="fill" />
        </div>

        <div className="absolute bg-white rounded-md px-4 py-2 bottom-4 right-4 flex items-center gap-2 text-gray-800">
          <ImageFilledIcon className="text-" />
          Xem tất cả ảnh
        </div>
      </div>

      <div className="grid grid-cols-5 mt-10 gap-4">
        <div className="col-span-3">
          <h2 className="text-3xl m-0 font-bold">
            {data?.brand.name} {data?.yearManufacture}
          </h2>
          <div className="flex gap-4 mt-2 text-gray-800">
            <div className="flex items-center gap-1">
              <StarFilledIcon className="text-yellow-500" />
              <span>{data?.totalRatings}</span>
            </div>

            <div className="flex items-center gap-1">
              <BagFilledIcon className="text-green-500" />
              <span>27 chuyến</span>
            </div>

            <div>Ngũ Hành Sơn, Đà Nẵng</div>
          </div>

          <div className="flex gap-2 mt-4">
            <Tag className="rounded-full border-none bg-green-100">
              {data?.transmissions}
            </Tag>
            {/* <Tag className="rounded-full border-none bg-rose-100">
              Đặt xe nhanh
            </Tag> */}
          </div>

          <Divider />

          <div>
            <h3>Đặc điểm</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-6">
                <SeatIcon className="shrink-0 text-2xl text-green-500" />
                <div className="flex flex-col items-center text-base">
                  <span className="text-gray-800">Số ghê</span>
                  <span className="font-bold">{data?.numberSeat}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <TransmissionIcon className="shrink-0 text-2xl text-green-500" />
                <div className="flex flex-col items-center text-base">
                  <span className="text-gray-800">Truyền động</span>
                  <span className="font-bold"> {data?.transmissions}</span>
                </div>
              </div>

              {/* <div className="flex items-center gap-4">
                <GasIcon className="shrink-0 text-2xl text-green-500" />
                <div className="flex flex-col items-center text-base">
                  <span className="text-gray-800">Nhiên liệu</span>
                  <span className="font-bold">Xăng</span>
                </div>
              </div> */}
            </div>
          </div>

          <Divider />

          <div>
            <h3>Mô tả</h3>
            <p>{data?.description}</p>
          </div>

          <Divider />

          <div>
            <h3>Các tiện nghi khác</h3>
            <div className="grid grid-cols-3 gap-x-y gap-y-8">
              {carServices.map(({ icon: Icon, name }) => (
                <div key={name} className="flex items-center gap-3">
                  <Icon className="text-xl" />
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3>Giấy tờ thuê xe</h3>
            <div className="bg-amber-100 border-transparent rounded-md p-4 border-solid border-l-4 border-l-amber-600">
              <h4 className="flex items-center gap-1 text-gray-800 m-0 font-medium">
                <InfoIcon />
                <span>Chọn 1 trong 2 hình thức</span>
              </h4>
              <div className="mt-4 font-bold flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <IdCardIcon className="text-xl" />
                  <span>GPLX & CCCD gắn chip (đối chiếu)</span>
                </div>
                <div className="flex gap-2 items-center">
                  <DriverLicenceIcon className="text-xl" />
                  <span>GPLX (đối chiếu) & Passport (giữ lại)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3>Điều khoản</h3>
            <ul>
              <li>Sử dụng xe đúng mục đích.</li>
              <li>
                Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
              </li>
              <li>Không sử dụng xe thuê để cầm cố, thế chấp.</li>
              <li>Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
              <li>Không chở hàng quốc cấm dễ cháy nổ.</li>
              <li>Không chở hoa quả, thực phẩm nặng mùi trong xe.</li>
            </ul>
          </div>

          <div className="mt-10">
            <h3>Chính sách hủy chuyến</h3>
            <div>Miễn phí hủy chuyến trong vòng 1 giờ sau khi đặt cọc</div>
          </div>

          <Divider />

          <div className="mt-10">
            <h3>Đánh giá</h3>
            <div className="flex flex-col gap-4">
              <Feedback />
              <Feedback />
            </div>
          </div>
        </div>

        <div className="col-span-2 ">
          <div className="flex gap-4 border border-solid rounded-lg border-gray-300 p-4 items-center">
            <ShieldCheckOutlineIcon className="text-green-500" />
            <div className="flex flex-col gap-2">
              <span className="text-lg text-green-500 font-bold">
                Hỗ trợ bảo hiểm với VNI
              </span>
              <span className="font-medium text-xs text-gray-900">
                Xem chi tiết
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-solid rounded-lg border-gray-300 p-4 bg-green-50 mt-10">
            <h1>
              {data?.cost.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              /ngày
            </h1>
            <DateRangePicker
              showTime={{ format: "HH mm" }}
              format="DD MM YYYY HH mm"
              // defaultValue={[
              //   dayjs(from, "DD-MM-YYYY HH:mm"),
              //   dayjs(to, "DD-MM-YYYY HH:mm"),
              // ]}
              disabledDate={disabledDate}
              className="rounded-full"
              value={dates}
              onChange={handleDateChange}
            />
            {validationMessage && (
              <p className="text-red-500 ml-2">{validationMessage}</p>
            )}

            <div className="border border-solid rounded-lg border-gray-300 bg-white p-4">
              <h4 className="m-0 mb-3 font-medium text-gray-800">
                Địa điểm giao xe
              </h4>
              <span className="text-xl font-bold">Ngũ Hành Sơn, Đà Nẵng</span>
              <p className="text-sm text-gray-500">
                Bạn sẽ nhận trả xe tại địa chỉ xe do chủ xe không hỗ trợ giao
                nhận tận nơi. Địa chỉ cụ thể sẽ được hiển thị sau khi đặt cọc.
              </p>
            </div>

            <Divider />
            {/* 
            <BorderlessTable
              columns={[
                { dataIndex: "label" },
                { dataIndex: "price", className: "text-right" },
              ]}
              bordered={false}
              showHeader={false}
              pagination={false}
              rowKey={(row) => row.label}
              dataSource={[
                {
                  label: "Đơn giá thuê",
                  price: "780 000đ/ngày",
                },
                {
                  label: "Phí dịch vụ",
                  price: "Phí bảo hiểm",
                },
                {
                  label: <span className="font-bold">Tổng phí thuê xe</span>,
                  price: <span className="font-bold">971 880đ</span>,
                },
              ]}
            /> */}
            <div className="flex justify-center ">
              <Link href={`/booking/${data?._id}`}>
                <Button type="primary">Chọn thuê</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
