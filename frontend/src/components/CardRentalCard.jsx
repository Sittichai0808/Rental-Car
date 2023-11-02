import {
  LocationFilledIcon,
  StarFilledIcon,
  SeatIcon,
  TransmissionIcon,
} from "@/icons";
import React from "react";
import { Button, Modal, Divider, Table, Rate, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import car from "../../public/images/car.jpg";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import { useDatesState } from "@/recoils/dates.state";
import styled from "@emotion/styled";
const { TextArea } = Input;
export const CarRentalCard = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const BorderlessTable = styled(Table)`
    .ant-table {
      background-color: transparent;
    }
  `;

  return (
    <div className=" flex flex-col border rounded-xl border-solid border-neutral-200 p-4 ">
      <div className="flex flex-row ">
        <div className="flex flex-col relative aspect-video mb-4 cursor-pointer">
          <Image
            // src={data?.thumb}

            src={car}
            alt="car"
            height={150}
            width={150}
            // layout="fill"
            className="rounded-lg object-cover w-1/3"
          />
        </div>

        <div className="flex flex-col w-2/3  ml-5 ">
          <h5 className="text-xl line-clamp-1  font-bold ml-2 mt-0 mb-3">
            Chevrolet Orlando 2017
          </h5>
          <h5 className="text-xl line-clamp-1 text-red-500 font-bold ml-2 mt-0">
            2.000.000 VND
          </h5>
        </div>
      </div>

      <div className="flex flex-row justify-between text-neutral-500 items-center font-medium  ">
        <div className="flex ">
          <Link href={`/profile/car-rental-detail`}>
            <Button className="flex " type="primary ">
              Chi tiết
            </Button>
          </Link>
        </div>

        <div className="flex">
          <Button
            className="flex border rounded-xl border-solid border-neutral-200 bg-red-600 text-gray-50"
            danger
            onClick={showModal}
          >
            Đánh giá
          </Button>
          <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                OK
              </Button>,
            ]}
          >
            <div className="mt-10">
              <h3>Đánh giá </h3>
              <Rate className="mb-5" allowHalf defaultValue={5} />
              <div className="flex flex-col ">
                <Form.Item>
                  <TextArea />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Add Comment
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
