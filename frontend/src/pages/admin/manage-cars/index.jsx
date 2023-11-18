import { getBrands } from "@/apis/brands.api";
import { createCar, getCar, getCars, updateCar } from "@/apis/cars.api";
import { getMOdels } from "@/apis/model.api";
import { UploadImage } from "@/components/UploadImage";
import { UploadMultipleImage } from "@/components/UploadMultipleImage";
import { GET_BRANDS_KEY, GET_CARS_KEY, GET_CAR_KEY, GET_MODEL_KEY } from "@/constants/react-query-key.constant";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useUserState } from "@/recoils/user.state";
import { formatCurrency } from "@/utils/number.utils";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Image, Input, InputNumber, Modal, Popconfirm, Select, Skeleton, Table } from "antd";
import { useState } from "react";

function UpsertCarForm({ carId, onOk }) {
  console.log({ carId });
  const [user] = useUserState();
  const isInsert = !carId;

  const [form] = Form.useForm();
  const brandId = Form.useWatch(["brand"], form);

  console.log("8734643", carId);
  const carDetail = useQuery({
    queryFn: () => getCar(carId),
    queryKey: [GET_CAR_KEY, carId],
  });

  console.log(carDetail.data?.result);

  const apiCreateCar = useMutation({
    mutationFn: createCar,
  });

  const apiUpdateCar = useMutation({
    mutationFn: updateCar,
  });

  const { data: getModelsRes } = useQuery({
    queryFn: () => getMOdels(brandId),
    queryKey: [GET_MODEL_KEY, brandId],
    enabled: !!brandId,
  });

  const { data: getBrandsRes } = useQuery({
    queryFn: getBrands,
    queryKey: [GET_BRANDS_KEY],
  });

  const brandOptions = getBrandsRes?.result.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const modelOptions = getModelsRes?.result.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  if (carDetail.isLoading) {
    return <Skeleton active />;
  }

  console.log(carDetail.data?.results);
  return (
    <Form
      form={form}
      layout="vertical"
      className="flex flex-col gap-4 mt-10"
      initialValues={{
        ...carDetail.data?.result,
        brand: carDetail.data?.result?.brand._id,
        model: carDetail.data?.result?.model._id,
      }}
      onFinish={async (values) => {
        console.log(values, carId);

        if (isInsert) {
          await apiCreateCar.mutateAsync({ ...values, user: user?._id });
        } else {
          console.log({ values });
          await apiUpdateCar.mutateAsync({ carId, body: { ...values, user: user?._id } });
        }

        onOk?.();
      }}
    >
      <div className="h-[60vh] overflow-y-scroll flex gap-2">
        <div className="w-2/3">
          <Form.Item label="Brand" required name="brand">
            <Select options={brandOptions} />
          </Form.Item>
          <Form.Item label="Model" required name="model">
            <Select options={modelOptions} disabled={!brandId} />
          </Form.Item>
          <Form.Item label="No. Seat" required name="numSeat">
            <Select options={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]} />
          </Form.Item>
          <Form.Item label="Transmissions" required name="transmissions">
            <Select options={[{ value: "Số sàn" }, { value: "Số tự động" }]} />
          </Form.Item>
          <Form.Item label="Description" required name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="License Plate" name="numberCar">
            <Input />
          </Form.Item>
          <Form.Item label="Cost" name="cost">
            <InputNumber className="w-full" prefix="$" />
          </Form.Item>
        </div>

        <div className="grow w-1/3">
          <Form.Item label="Thumbnail" name="thumb">
            <UploadImage />
          </Form.Item>

          <Form.Item label="Images" name="images">
            <UploadMultipleImage />
          </Form.Item>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button type="primary" htmlType="submit">
          {isInsert ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default function AdminManageCars() {
  const [upsertCarModal, setUpsertCarModal] = useState();

  const { data, refetch } = useQuery({
    queryFn: getCars,
    queryKey: [GET_CARS_KEY],
  });

  const dataSource = data?.result.map((item, idx) => ({
    id: idx + 1,
    _id: item._id,
    thumb: item?.thumb,
    brand: item.brand?.name,
    numberSeat: item?.numberSeat,
    transmissions: item?.transmissions,
    numberCar: item?.numberCar,
    description: item?.description,
    cost: formatCurrency(item.cost),
    owner: item.user?.username,
  }));

  const handleInsertCar = () => {
    setUpsertCarModal({ actionType: "insert" });
  };

  console.log(upsertCarModal);
  return (
    <>
      <div className="pt-10 px-4">
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
              render: (url) => <Image className="h-32 aspect-video rounded-md object-cover" src={url} />,
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
                    onClick={() => {
                      setUpsertCarModal({ actionType: "update", carId: car._id });
                    }}
                  >
                    Edit
                  </Button>
                  <Popconfirm title="Are you sure to deactivate this car?" okText="Deactivate">
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">Deactivate</Button>
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
        title={upsertCarModal?.actionType === "insert" ? "Add New Car" : "Update Car"}
        width={800}
        destroyOnClose
        footer={null}
        onCancel={() => setUpsertCarModal(undefined)}
      >
        <UpsertCarForm
          carId={upsertCarModal?.carId}
          onOk={() => {
            setUpsertCarModal(false);
            refetch();
          }}
        />
      </Modal>
    </>
  );
}

AdminManageCars.Layout = AdminLayout;
