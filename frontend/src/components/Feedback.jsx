import { Rate } from "antd";
import Image from "next/image";

export const Feedback = ({ dataRatings }) => {
  return (
    <div className="flex items-center w-full h-[140px] gap-4 rounded-md p-6 border border-solid border-gray-200">
      <div className="aspect-square relative w-[70px] rounded-full overflow-hidden h-[70px] ml-6">
        <Image
          src={dataRatings.postBy.profilePicture}
          layout="fill"
          alt="avatar"
        />
      </div>
      <div className="grow">
        <div className="flex justify-between items-center">
          <span className="font-medium text-2xl">
            {dataRatings.postBy.username}
          </span>
          <span>08/10/2023</span>
        </div>

        <Rate
          className="text-base"
          value={dataRatings.star}
          disabled
          allowHalf
        />

        <div>{dataRatings.comment}</div>
      </div>
    </div>
  );
};
