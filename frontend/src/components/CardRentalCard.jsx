import React from "react";
import { Button, Modal, Rate, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import car from "../../public/images/car.jpg";
import { useState } from "react";
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

  return (
    <div className=" flex flex-col border rounded-xl border-solid border-neutral-200 p-4 ">
      <div className="flex flex-row ">
        <div className="flex flex-col relative aspect-video cursor-pointer">
          <Image
            src={car}
            alt="car"
            height={150}
            width={150}
            className="rounded-lg object-cover w-1/3"
          />
        </div>

        <div className="flex flex-col w-3/4 ml-5 justify-around">
          <div>
            <h5 className="text-xl line-clamp-1 font-bold ml-2 mt-0 m-0">
              Chevrolet Orlando 2017
            </h5>
            <h2 className="line-clamp-1 text-red-500 font-bold ml-2 m-0">
              2.000.000 VND
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <span className="line-clamp-1 font-normal ml-2">
                Ngày thuê: 10-08-2023
              </span>
              <span className="line-clamp-1 font-normal ml-2">
                Ngày trả: 11-08-2023
              </span>
            </div>
            <div className="flex gap-4">
              <Link href={`/profile/car-rental-detail`}>
                <Button className="" type="primary ">
                  Chi tiết
                </Button>
              </Link>
              <div>
                <Button
                  className=" bg-red-600 text-gray-50"
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
        </div>
      </div>
    </div>
  );
};
