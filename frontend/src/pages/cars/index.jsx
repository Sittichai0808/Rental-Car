import { CarCard } from "@/components/CarCard";
import React from "react";
import { FilterFilledIcon, SearchBrokenIcon } from "@/icons";
import { Button, Input, Space, Select, Spin, Slider, Modal, Radio } from "antd";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getListCars } from "@/apis/user-cars.api";
import { getBrands } from "@/apis/brands.api";
import { GET_BRANDS_KEY } from "@/constants/react-query-key.constant";
export default function ListCarsPage() {
  const { query, pathname } = useRouter();
  const router = useRouter();
  const {
    brand,
    numberSeat,
    transmissions,
    ["cost[gte]"]: costGte,
    ["cost[lte]"]: costLte,
    sort,
  } = query;

  const newQuery = { ...query };
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const showSortModal = () => {
    setSortModalVisible(true);
  };

  const handleSortOk = () => {
    setSortModalVisible(false);
  };

  const handleSortCancel = () => {
    setSortModalVisible(false);
  };

  const handleQueryChange = (key, selected) => {
    if (selected !== "all") {
      newQuery[key] = selected;
    } else {
      delete newQuery[key];
    }
    router.push({ pathname, query: newQuery });
  };

  const handleCostChange = (values) => {
    const [minCost, maxCost] = values;
    if (minCost === 0 && maxCost === 3000000) {
      delete newQuery["cost[gte]"];
      delete newQuery["cost[lte]"];
    } else {
      newQuery["cost[gte]"] = minCost;
      newQuery["cost[lte]"] = maxCost;
    }

    router.push({ pathname, query: newQuery });
  };

  const fetchCars = async ({ pageParam = 1 }) => {
    try {
      // Use the getCars function here
      const response = await getListCars({
        brand,
        numberSeat,
        transmissions,
        "cost[gte]": costGte,
        "cost[lte]": costLte,
        page: pageParam,
        sort,
      });

      return response;
    } catch (error) {
      console.log(error);
    }

    // Remove keys with "all" values
    Object.keys(newQuery).forEach(
      (key) => newQuery[key] === "all" && delete newQuery[key]
    );
  };

  const { isLoading, data } = useQuery({
    queryKey: ["getListCars", query],
    queryFn: () => fetchCars(query),
  });

  const { data: brandsData } = useQuery({
    queryKey: [GET_BRANDS_KEY],
    queryFn: getBrands,
  });

  return (
    <div className="max-w-6xl mx-auto">
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
                style={{ width: 130 }}
                onChange={(selected) => handleQueryChange("brand", selected)}
                value={brand || "Hãng xe"}
                options={[
                  {
                    value: "all",
                    label: "Hãng xe",
                  },
                  ...(brandsData?.result || []).map((brand) => ({
                    value: brand._id,
                    label: brand.name,
                  })),
                ]}
              />

              <Select
                placeholder="Số chỗ"
                style={{ width: 130 }}
                onChange={(selected) =>
                  handleQueryChange("numberSeat", selected)
                }
                value={numberSeat || "Số chỗ"}
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
                style={{ width: 130 }}
                onChange={(selected) =>
                  handleQueryChange("transmissions", selected)
                }
                value={transmissions || "Truyền động"}
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
            </Space>
          </div>
          <Button onClick={showSortModal} icon={<FilterFilledIcon />}>
            Sắp xếp theo
          </Button>

          <Modal
            title="Sắp xếp theo"
            visible={sortModalVisible}
            onOk={handleSortOk}
            onCancel={handleSortCancel}
          >
            <div>
              <h4>Giá</h4>
              <Slider
                style={{ width: 200 }}
                range
                step={100}
                min={0}
                max={3000000}
                value={[costGte || 0, costLte || 3000000]}
                onChange={handleCostChange}
              />
            </div>
            <div>
              <h4>Sắp xếp theo</h4>
              <Radio.Group
                onChange={(e) => handleQueryChange("sort", e.target.value)}
                value={newQuery.sort || "all"}
              >
                <Space direction="vertical">
                  <Radio value="all">Tất cả</Radio>
                  <Radio value="cost">Giá tăng dần</Radio>
                  <Radio value="-cost">Giá giảm dần</Radio>
                </Space>
              </Radio.Group>
            </div>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-10">
        {isLoading ? (
          <div className="example">
            <Spin />
          </div>
        ) : (
          data?.result.map((car, carIndex) => (
            <Link key={carIndex} href={`/cars/${car?._id}`}>
              <CarCard dataCar={car} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
