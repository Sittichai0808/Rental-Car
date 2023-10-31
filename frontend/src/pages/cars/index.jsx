import { CarCard } from "@/components/CarCard";
import { SearchItem } from "@/components/SearchItem";

import { FilterFilledIcon, SearchBrokenIcon } from "@/icons";
import { Tag } from "antd";
import { Button, Input, Space, Select, Slider } from "antd";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function ListCarsPage() {
  const { query, pathname } = useRouter();
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const brand = query.brand;
  const numberSeat = query.numberSeat;
  const transmissions = query.transmissions;

  // const { data, error, isLoading } = useSearch({ category, numberSeat, sort });

  const [params, setParams] = useState({});

  const products = data || [];

  const handleBrandChange = (selected) => {
    setParams({ ...params, brand: selected });
    router.push({ pathname, query: { ...query, brand: selected } });
  };

  const handleNumberSeatChange = (selected) => {
    setParams({ ...params, numberSeat: selected });
    router.push({ pathname, query: { ...query, numberSeat: selected } });
  };

  const handleTransmissionsChange = (selected) => {
    setParams({ ...params, transmissions: selected });
    router.push({ pathname, query: { ...query, transmissions: selected } });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onAfterChange = (value) => {
    console.log("onAfterChange: ", value);
  };

  useEffect(() => {
    if (brand) {
      setParams({ ...params, brand });
    }
    if (numberSeat) {
      setParams({ ...params, numberSeat });
    }
    if (transmissions) {
      setParams({ ...params, transmissions });
    }
  }, [brand, numberSeat, transmissions, pathname]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getListCars", params],
    queryFn: async () => {
      try {
        if (params?.brand === "all") {
          delete params.brand;
        }
        if (params?.numberSeat === "all") {
          delete params.numberSeat;
        }
        if (params?.transmissions === "all") {
          delete params.transmissions;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/cars`,
          { params: params },

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
          <div className="flex gap-2 justify-start">
            <Space wrap>
              <Select
                placeholder="Hãng xe"
                style={{
                  width: 130,
                }}
                onChange={handleBrandChange}
                options={[
                  {
                    value: "all",
                    label: "Hãng xe",
                  },
                  {
                    value: "652fd84e051a5a9426cb7e50",
                    label: "Chevrolet",
                  },
                  {
                    value: "651c2d68df427b5ab0f0b1b3",
                    label: "Toyota",
                  },
                  {
                    value: "652fd857051a5a9426cb7e52",
                    label: "Ford",
                  },
                  {
                    value: "652d66e7d26a40775861890f",
                    label: "BMW",
                  },
                ]}
              />
              <Select
                placeholder="Số chỗ"
                style={{
                  width: 130,
                }}
                onChange={handleNumberSeatChange}
                options={[
                  {
                    value: "all",
                    label: "Số chỗ ",
                  },
                  {
                    value: "4 chỗ",
                    label: "4 chỗ",
                  },
                  {
                    value: "5 chỗ",
                    label: "5 chỗ",
                  },
                  {
                    value: "7 chỗ",
                    label: "7 chỗ",
                  },
                  {
                    value: "8 chỗ",
                    label: "8 chỗ",
                  },
                ]}
              />
              <Select
                placeholder="Truyền Động"
                style={{
                  width: 130,
                }}
                onChange={handleTransmissionsChange}
                options={[
                  {
                    value: "all",
                    label: "Truyền động ",
                  },
                  {
                    value: "Số tự động",
                    label: "Số tự động",
                  },
                  {
                    value: "Số sàn",
                    label: "Số sàn",
                  },
                ]}
              />
              <Slider
                style={{
                  width: 200,
                }}
                range
                step={100}
                min={0}
                max={3000}
                defaultValue={[300, 900]}
                onChange={onChange}
                onAfterChange={onAfterChange}
              />
            </Space>
          </div>

          <div>
            <Button className="h-max" icon={<FilterFilledIcon />}>
              Bộ lọc
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-10">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          data.map((idx, index) => (
            <Link href={`/cars/${idx?._id}`}>
              <CarCard key={index} dataCar={idx} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
