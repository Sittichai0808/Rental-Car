import { CarCard } from "@/components/CarCard";
import { FilterFilledIcon, SearchBrokenIcon } from "@/icons";
import { Tag } from "antd";
import { Button, Input } from "antd";
import { range } from "lodash-es";

export default function ListCarsPage() {
  return (
    <div>
      <h2 className="text-center text-3xl">Danh sách xe</h2>

      <div className="rounded-md bg-neutral-100 p-4">
        <div className="flex gap-4">
          <Input placeholder="Tìm kiếm xe ..." size="large" />
          <Button type="primary" size="large" icon={<SearchBrokenIcon />}>
            Tìm kiếm
          </Button>
        </div>

        <div className="mt-6 flex justify-between">
          <div className="flex gap-2">
            {["Hãng xe", "7 chỗ", "Xe 5 sao", "Số sàn", "Số tự động"].map((item) => (
              <Tag key={item} className="rounded-full border-none bg-slate-300 h-max py-1 px-2">
                {item}
              </Tag>
            ))}
          </div>

          <div>
            <Button className="h-max" icon={<FilterFilledIcon />}>
              Bộ lọc
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-10">
        {range(12).map((idx) => (
          <CarCard key={idx} />
        ))}
      </div>
    </div>
  );
}
