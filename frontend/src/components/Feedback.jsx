import { Rate } from "antd";
import Image from "next/image";

export const Feedback = () => {
  return (
    <div className="flex gap-4 bg-gray-100 rounded-md p-3">
      <div className="aspect-square relative w-9 rounded-full overflow-hidden h-9">
        <Image src="/images/car.jpg" layout="fill" alt="avatar" />
      </div>
      <div className="grow">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Trần Nhật Huy</span>
          <span>08/10/2023</span>
        </div>

        <Rate value={4.5} allowHalf />

        <div>Xe chay rất thích, sẽ tiếp tục chọn thuê</div>
      </div>
    </div>
  );
};
