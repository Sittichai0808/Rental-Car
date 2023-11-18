import { getCars } from "@/apis/admin-cars.api";
import { GET_CARS_KEY } from "@/constants/react-query-key.constant";
import { AdminLayout } from "@/layouts/AdminLayout";
import { formatCurrency } from "@/utils/number.utils";
import {
  CloudUploadOutlined,
  PlusOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Upload,
} from "antd";
import { useState } from "react";

function UpsertCarForm({ carId }) {
  const isInsert = !carId;

  return (
    <>
      <Form layout="vertical" className="flex gap-4 mt-10">
        <div className="w-2/3">
          <Form.Item label="Brand" required>
            <Select
              options={[
                { value: "Audi" },
                { value: "Roll Royce" },
                { value: "Mercedes" },
                { value: "Hyndai" },
                { value: "Lamboghini" },
              ]}
            />
          </Form.Item>
          <Form.Item label="No. Seat" required>
            <Select
              options={[
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 },
              ]}
            />
          </Form.Item>
          <Form.Item label="Transmissions" required>
            <Select options={[{ value: "Auto" }, { value: "Manual" }]} />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="License Plate">
            <Input />
          </Form.Item>
          <Form.Item label="Cost">
            <InputNumber className="w-full" />
          </Form.Item>
        </div>

        <div className="grow">
          <Form.Item label="Thumbnail">
            <Upload.Dragger listType="picture-card" className="aspect-square">
              <CloudUploadOutlined />
            </Upload.Dragger>
          </Form.Item>
        </div>
      </Form>

      <div className="flex justify-end mt-10">
        <Button type="primary">{isInsert ? "Add" : "Update"}</Button>
      </div>
    </>
  );
}

export default function AdminManageCars() {
  const [upsertCarModal, setUpsertCarModal] = useState();

  const { data } = useQuery({
    queryFn: getCars,
    queryKey: [GET_CARS_KEY],
  });

  console.log(data?.result);

  const dataSource = data?.result.map((item, idx) => ({
    id: idx + 1,
    _id: item?._id,
    thumb: item?.thumb,
    brand: item?.brand?.name,
    numberSeat: item?.numberSeat,
    transmissions: item?.transmissions,
    numberCar: item?.numberCar,
    description: item?.description,
    cost: formatCurrency(item.cost),
    owner: item?.user?.username,
  }));

  const handleInsertCar = () => {
    setUpsertCarModal({ actionType: "insert" });
  };

  return (
    <>
      <div className="pt-10">
        <div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center">
            <Input prefix={<SearchOutlined />} />
            <Button type="primary">Search</Button>
          </div>

          <div>
            <Button onClick={handleInsertCar}>
              <PlusOutlined /> Add car
            </Button>
          </div>
        </div>
        <Table
          scroll={{ x: 800 }}
          columns={[
            { key: "id", title: "ID", dataIndex: "id" },
            {
              key: "thumb",
              title: "Thumbnail",
              dataIndex: "thumb",
              render: (url) => (
                <Image
                  className="h-32 aspect-video rounded-md object-cover"
                  src={url}
                />
              ),
            },
            { key: "brand", title: "Brand", dataIndex: "brand" },
            { key: "numberSeat", title: "No. Seat", dataIndex: "numberSeat" },
            {
              key: "transmissions",
              title: "Transmissions",
              dataIndex: "transmissions",
            },
            {
              key: "numberCar",
              title: "License plate",
              dataIndex: "numberCar",
            },
            {
              key: "description",
              title: "Description",
              dataIndex: "description",
            },
            { key: "cost", title: "Cost", dataIndex: "cost" },
            { key: "owner", title: "Owner", dataIndex: "owner" },
            {
              key: "action",
              title: "Action",
              render: (_, car) => (
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-500 text-white border-none hover:bg-blue-500/70"
                    onClick={() =>
                      setUpsertCarModal({ actionType: "update", carId: car.id })
                    }
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure to deactivate this car?"
                    okText="Deactivate"
                  >
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                      Deactivate
                    </Button>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          dataSource={dataSource}
          rowKey="id"
        />
      </div>

      <Modal
        open={upsertCarModal}
        title={
          upsertCarModal?.actionType === "insert" ? "Add New Car" : "Update Car"
        }
        width={800}
        destroyOnClose
        footer={null}
        onCancel={() => setUpsertCarModal(undefined)}
      >
        <UpsertCarForm carId={upsertCarModal?.carId} />
      </Modal>
    </>
  );
}

AdminManageCars.Layout = AdminLayout;
