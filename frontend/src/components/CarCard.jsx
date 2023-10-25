import { LocationFilledIcon, StarFilledIcon } from "@/icons";
import { Button, Divider, Tag } from "antd";
import Image from "next/image";

export const CarCard = ({}) => {
  return (
    <div className="border rounded-xl border-solid border-neutral-200 p-4">
      <div className="relative aspect-video mb-4">
        <Image
          src="/images/car.jpg"
          alt="car"
          height={250}
          width={300}
          // layout="fill"
          className="rounded-lg object-cover"
        />
      </div>

      <div>
        <Tag className="rounded-full" color="green">
          Số tự động
        </Tag>

        <h5 className="text-xl line-clamp-1 mt-2 font-bold mb-2">
          Honda City 2014
        </h5>

        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <StarFilledIcon className="text-yellow-300" />
            <span className="text-neutral-500 text-base">4.8</span>
          </div>
          <div className="grow text-right text-green-500 font-black">850K</div>
        </div>
      </div>

      <Divider className="mb-2" />
      <div className="flex justify-center text-neutral-500 items-center font-medium">
        <Button type="primary">Chọn thuê</Button>
      </div>
    </div>
  );
};
