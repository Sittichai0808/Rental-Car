import { LocationFilledIcon, StarFilledIcon } from "@/icons";
import { Button, Divider, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
export const CarCard = ({ dataCar }) => {
  return (
    <div className="border rounded-xl border-solid border-neutral-200 p-4">
      <Link href={`/cars/${dataCar?._id}`}>
        <div className="relative aspect-video mb-4 cursor-pointer">
          <Image
            src={dataCar?.thumb}
            alt="car"
            height={250}
            width={300}
            className="rounded-lg object-cover"
          />
        </div>
      </Link>

      <div>
        <Tag className="rounded-full" color="green">
          {dataCar?.transmissions}
        </Tag>

        <h5 className="text-xl line-clamp-1 mt-2 font-bold mb-2">
          {dataCar?.model.name} {dataCar?.yearManufacture}
        </h5>

        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <StarFilledIcon className="text-yellow-300" />
            <span className="text-neutral-500 text-base">
              {dataCar?.totalRatings}
            </span>
          </div>
          <div className="grow text-right text-green-500 font-black">
            {dataCar?.cost}
          </div>
        </div>
      </div>

      <Divider className="mb-2" />
      <div className="flex justify-center text-neutral-500 items-center font-medium">
        <Button type="primary">Chọn thuê</Button>
      </div>
    </div>
  );
};
