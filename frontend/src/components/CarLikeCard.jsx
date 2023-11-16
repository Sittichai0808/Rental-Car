import React from "react";
import { Button, Input, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { LocationFilledIcon, StarFilledIcon } from "@/icons";

export const CarLikeCard = () => {
  return (
    <div className=" flex flex-col border rounded-xl border-solid border-neutral-200 p-4 ">
      <div className="flex flex-row  ">
        <div className="flex flex-col relative aspect-video cursor-pointer">
          <Image
            src="https://res.cloudinary.com/djllhxlfc/image/upload/v1698239153/cars/i8xipppgcfy6d42m14do.jpg"
            alt="car"
            height={150}
            width={150}
            className="rounded-lg object-cover w-1/3"
          />
        </div>

        <div className="flex flex-col w-3/4 ml-5 justify-around ">
          <div>
            <Tag className="rounded-full ml-1  mt-0 m-0 " color="green">
              Số sàn
            </Tag>
            <h5 className="text-xl line-clamp-1 font-bold ml-2 m-0 ">
              Chevrolet Orlando 2017
            </h5>
          </div>
          <div className="flex  justify-between items-center">
            {/* <div className="">
              <span className=" line-clamp-1 text-green-500 font-black ml-2">
                3000
              </span>

              <span className="flex items-center gap-1 line-clamp-1 text-neutral-500 text-base ml-2">
                <StarFilledIcon className="text-yellow-300" /> 3
              </span>
            </div> */}
            <div className="flex items-center gap-1">
              <StarFilledIcon className="text-yellow-300 " />
              <span className="text-neutral-500 text-base">3</span>
            </div>
            <div className="flex gap-4 text-green-500 font-black">
              1.000.000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
