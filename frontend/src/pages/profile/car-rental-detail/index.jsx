import {
  LocationFilledIcon,
  StarFilledIcon,
  SeatIcon,
  TransmissionIcon,
} from "@/icons";
import React, { useState } from "react";
import { Button, Modal, Divider, Table, Rate, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";

import { Feedback } from "@/components/Feedback";
import styled from "@emotion/styled";
const { TextArea } = Input;
export default function EditPage({ dataCar }) {
  // export const DetailPage = ({ dataCar }) => {
  const BorderlessTable = styled(Table)`
    .ant-table {
      background-color: transparent;
    }
  `;

  return (
    <div className="flex flex-col border-b bg-slate-100 my-8 py-5  ">
      <p className="flex justify-center items-center text-2xl font-bold mt-0  ">
        Thông tin chi tiết
      </p>
      <div className=" flex flex-row  w-full px-5  ">
        <div className="flex flex-col  bg-gray-50 p-4 ml-5 mr-5 w-1/2 ">
          <h3 className="ml-5">Đặc điểm</h3>

          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 ml-5">
              <div className="flex items-center gap-6">
                <SeatIcon className="shrink-0 text-2xl text-green-500" />
                <div className="flex flex-col items-center text-base">
                  <span className="text-gray-800">Số ghê</span>
                  <span className="font-bold">7 chỗ</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <TransmissionIcon className="shrink-0 text-2xl text-green-500" />
                <div className="flex flex-col items-center text-base">
                  <span className="text-gray-800">Truyền động</span>
                  <span className="font-bold"> Số tự động</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full ">
              <div className=" p-4 w-full">
                <h3>Địa điểm giao xe</h3>
                <span className="font-medium text-gray-800 ">
                  Ngũ Hành Sơn, Đà Nẵng
                </span>
              </div>

              <div className=" w-full  p-4 mt-0">
                <h3>Thông tin người nhận</h3>
                <span className="font-medium text-gray-800">
                  Đặng Ngọc Thịnh
                </span>
                <p className="font-medium text-gray-800">(+84)049950925</p>
                <p className="font-medium text-gray-800">Đà Nẵng</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4  p-4   bg-gray-50  w-1/2 ">
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
                label: "Ngày nhận xe",
                price: "22-1-2021",
              },
              {
                label: "Ngày trả xe",
                price: "25-01-2021",
              },
              {
                label: "Đơn giá thuê",
                price: "780 000đ/ngày",
              },
              {
                label: "Phí dịch vụ",
                price: "Phí bảo hiểm",
              },
              {
                label: "Phương thức thanh toán",
                price: "VN Pay",
              },

              {
                label: <span className="font-bold">Tổng phí thuê xe</span>,
                price: <span className="font-bold ">1.000.000 VND</span>,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
