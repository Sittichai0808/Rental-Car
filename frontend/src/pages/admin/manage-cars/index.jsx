import { getBrands } from "@/apis/brands.api";
import { createCar, getCar, getCars, updateCar } from "@/apis/cars.api";
import { getMOdels } from "@/apis/model.api";
import { UploadImage } from "@/components/UploadImage";
import { UploadMultipleImage } from "@/components/UploadMultipleImage";
import {
  GET_BRANDS_KEY,
  GET_CARS_KEY,
  GET_CAR_KEY,
  GET_MODEL_KEY,
} from "@/constants/react-query-key.constant";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useUserState } from "@/recoils/user.state";
import { formatCurrency } from "@/utils/number.utils";
import {
  CloseCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from "antd";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

function UpsertCarForm({ carId, onOk }) {
  console.log({ carId });
  const [user] = useUserState();
  const [accessToken] = useLocalStorage("access_token");
  const isInsert = !carId;
  const [form] = Form.useForm();
  const brandId = Form.useWatch(["brand"], form);

  const carDetail = useQuery({
    queryFn: () => getCar(carId, accessToken),
    queryKey: [GET_CAR_KEY, carId],
  });

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

  const brandOptions = getBrandsRes?.result?.map((item) => ({
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
          await apiCreateCar.mutateAsync({
            body: { ...values, user: user.id },
            accessToken,
          });
        } else {
          console.log({ values });
          await apiUpdateCar.mutateAsync({
            carId,
            body: { ...values, user: user.id },
            accessToken,
          });
        }

        onOk?.();
      }}
    >
      <div className="h-[60vh] overflow-y-scroll flex gap-2">
        <div className="grow w-2/5 p-2">
          <Form.Item label="Ảnh tiêu đề" name="thumb" className="w-4/5 h-4/5">
            <UploadImage />
          </Form.Item>

          <Form.Item label="Ảnh" name="images">
            <UploadMultipleImage />
          </Form.Item>
        </div>
        <div className="w-3/5 p-2">
          <Form.Item label="Hãng xe" required name="brand">
            <Select options={brandOptions} />
          </Form.Item>
          <Form.Item label="Loại xe" required name="model">
            <Select options={modelOptions} disabled={!brandId} />
          </Form.Item>
          <Form.Item label="Số ghế" required name="numberSeat">
            <Select
              options={[
                { value: "2 chỗ" },
                { value: "4 chỗ" },
                { value: "5 chỗ" },
                { value: "7 chỗ" },
                { value: "9 chỗ" },
                { value: "12 chỗ" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Truyền động" required name="transmissions">
            <Select options={[{ value: "Số sàn" }, { value: "Số tự động" }]} />
          </Form.Item>
          <Form.Item label="Biển số xe" name="numberCar">
            <Input />
          </Form.Item>
          <Form.Item label="Năm sản xuất" name="yearManufacture">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" required name="description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Cost" name="cost">
            <InputNumber className="w-full" />
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

  const dataSource = data?.result?.cars.map((item, idx) => ({
    id: idx + 1,
    _id: item?._id,
    thumb: item?.thumb,
    brand: item?.brand?.name,
    model: item?.model?.name,
    numberSeat: item?.numberSeat,
    transmissions: item?.transmissions,
    yearManufacture: item?.yearManufacture,
    numberCar: item?.numberCar,
    description: item?.description,
    cost: formatCurrency(item.cost),
    owner: item?.user?.username,
    status: item?.status,
  }));

  const handleInsertCar = () => {
    setUpsertCarModal({ actionType: "insert" });
  };

  console.log(upsertCarModal);
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Button onClick={handleInsertCar}>
            <PlusOutlined /> Tạo mới xe
          </Button>
        </div>
      </div>

      <div className="shadow-lg rounded-md">
        <Table
          scroll={{ y: 460, x: 2000 }}
          pagination={{ pageSize: 4 }}
          columns={[
            {
              key: "thumb",
              title: "Ảnh xe",
              dataIndex: "thumb",
              render: (url) => (
                <Image
                  className="h-32 aspect-video rounded-md object-cover"
                  src={url}
                />
              ),
            },
            { key: "model", title: "Hãng xe", dataIndex: "model" },
            { key: "numberSeat", title: "Số ghế", dataIndex: "numberSeat" },
            {
              key: "transmissions",
              title: "Truyền động",
              dataIndex: "transmissions",
            },
            {
              key: "yearManufacture",
              title: "Năm sản xuất",
              dataIndex: "yearManufacture",
            },
            {
              key: "numberCar",
              title: "Biển số xe",
              dataIndex: "numberCar",
            },
            {
              key: "description",
              title: "Mô tả",
              dataIndex: "description",
            },
            { key: "cost", title: "Giá", dataIndex: "cost" },
            // { key: "owner", title: "Owner", dataIndex: "owner" },
            {
              key: "status",
              title: "Trạng thái",
              dataIndex: "status",
              render: (status) => (
                <>
                  {status === "Hoạt động" ? (
                    <>
                      <p className="text-green-500 justify-center">Hoạt động</p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-500 justify-center">
                        Không hoạt động
                      </p>
                    </>
                  )}
                </>
              ),
            },
            {
              key: "action",
              fixed: "right",
              width: "8%",
              render: (_, car) => (
                <div className="flex gap-2">
                  <Tooltip
                    placement="top"
                    title={"Chỉnh sửa xe"}
                    color="#108ee9"
                  >
                    <Button
                      className="bg-blue-500 text-white border-none hover:bg-blue-500/70"
                      onClick={() => {
                        setUpsertCarModal({
                          actionType: "update",
                          carId: car._id,
                        });
                      }}
                    >
                      <EditOutlined />
                    </Button>
                  </Tooltip>

                  <Popconfirm
                    title="Bạn có chắc vô hiệu hóa xe?"
                    okText="Có"
                    cancelText="Hủy"
                  >
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                      <CloseCircleOutlined />
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
          upsertCarModal?.actionType === "insert"
            ? "Tạo mới xe"
            : "Chỉnh sửa xe"
        }
        width={1000}
        style={{ top: 20 }}
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
