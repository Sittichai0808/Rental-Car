import { CarCard } from "@/components/CarCard";
import { SearchItem } from "@/components/SearchItem";
import { FilterFilledIcon, SearchBrokenIcon } from "@/icons";
import { Tag } from "antd";
import { Button, Input } from "antd";
// import { range } from "lodash-es";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ListCarsPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getListCars"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cars`,

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
            {["Hãng xe", "7 chỗ", "Xe 5 sao", "Số sàn", "Số tự động"].map(
              (item) => (
                <Button
                  key={item}

                  // type="primary"
                  // className="rounded-full border-none bg-slate-300 h-max py-1 px-2"
                >
                  {item}
                </Button>
              )
            )}
          </div>

          <div>
            <Button className="h-max" icon={<FilterFilledIcon />}>
              Bộ lọc
            </Button>
          </div>
        </div>
      </div>

      <div className="w- border p-4 flex justify-center mt-2 m-auto">
        <div className="w-4/5 flex-auto flex items-center gap-4">
          <SearchItem name="Hãng Xe" />
          <SearchItem name="Số chỗ" />
          <SearchItem name="Đánh giá" />
          <SearchItem name="Truyền động" />
        </div>
        <div className="w-1/5 flex">Sortby</div>
      </div>

      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-10">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          data.map((idx, index) => <CarCard key={index} dataCar={idx} />)
        )}
      </div>
    </div>
  );
}
