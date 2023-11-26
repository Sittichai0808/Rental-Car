import React from 'react'
import { AdminLayout } from "@/layouts/AdminLayout";
import {
  GET_COUPONS,
  GET_COUPONS_KEY
} from "@/constants/react-query-key.constant";
import { useUserState } from "@/recoils/user.state";

import { createCoupon, getCoupons } from "@/apis/admin-coupons.api"
import { getMOdels } from "@/apis/model.api";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
} from "antd";
import { useState } from "react";

function UpsertCouponForm({ couponId, onOk }) {
  console.log({ couponId });
  const [user] = useUserState();
  const isInsert = !couponId;

  const [form] = Form.useForm();


  //console.log("8734643", couponId);
  const couponDetail = useQuery({
    queryFn: () => getCoupons(couponId),
    queryKey: [GET_COUPONS_KEY, couponId],
  });

  console.log(couponDetail.data?.result);

  const apiCreateCoupon = useMutation({
    mutationFn: createCoupon,
  });

  // const apiUpdateCoupon = useMutation({
  //   mutationFn: updateCoupon,
  // });

  // const modelOptions = getModelsRes?.result.map((item) => ({
  //   value: item._id,
  //   label: item.name,
  // }));


  console.log(couponDetail.data?.results);
  return (
    <Form
      form={form}
      layout="vertical"
      className="flex flex-col gap-4 mt-10"
      // initialValues={{
      //   ...carDetail.data?.result,
      //   brand: carDetail.data?.result?.brand._id,
      //   model: carDetail.data?.result?.model._id,
      // }}
      onFinish={async (values) => {
        console.log(values, couponId);

        if (isInsert) {
          await apiCreateCoupon.mutateAsync({ ...values, user: user?._id });
        } else {
          console.log({ values });
          await apiUpdateCoupon.mutateAsync({
            carId,
            body: { ...values, user: user?._id },
          });
        }

        onOk?.();
      }}
    >
      <div className="h-[60vh] overflow-y-scroll flex gap-2">
        <div className="w-2/3">
          <Form.Item label="Tên Mã Giảm Giá" required name="name">
            <Input />

          </Form.Item>
          <Form.Item label="Mức giảm giá" required name="discount" prefix="%"  className="w-full">
            <Input />

          </Form.Item>
          <Form.Item label="Mô tả chi tiết" required name="description">
            <Input />

          </Form.Item>
          <Form.Item label="Ngày hết hạn" required name="expiry">
            <Input />

          </Form.Item>
          <div className="flex justify-end mt-10">
        <Button type="primary" htmlType="submit">
          {isInsert ? "Add" : "Update"}
        </Button>
      </div>
        </div>
      </div>

      {/* <div className="flex justify-end mt-10">
        <Button type="primary" htmlType="submit">
          {isInsert ? "Add" : "Update"}
        </Button>
      </div> */}
    </Form>
  );
}

export default function AdminManageCoupon() {


  const [upsertCouponModal, setUpsertCouponModal] = useState();

  const { data, refetch } = useQuery({
    queryFn: getCoupons,
    queryKey: [GET_COUPONS],
  });

  const dataSource = data?.result.map((item, idx) => ({
    id: idx + 1,
    _id: item?._id,
    name: item?.name,
    discount: item?.discount,
    description: item?.description,
    expiry: item?.expiry
  }));
  const handleInsertCoupon = () => {
    setUpsertCouponModal({ actionType: "insert" });
  };
  // const handleInsertCoupon = () => {
  //   setUpsertCouponModal({ actionType: "insert" });
  // };

  console.log(upsertCouponModal);
  return (
    <>
      <div className="pt-10 px-4">

        <div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center"></div>

          <div>
            <Button type="primary" onClick={handleInsertCoupon}>
              <PlusOutlined /> Add Coupon
            </Button>
          </div>
        </div>

        <Table
          scroll={{ y: 480 }}
          pagination={{ pageSize: 10 }}
          columns={[
            { key: "id", title: "ID", dataIndex: "id", width: "60px" },

            {
              key: "name",
              title: "Tên coupon",
              dataIndex: "name",

            },
            { key: "discount", title: "Mức giảm giá", dataIndex: "discount" },
            {
              key: "description",
              title: "Mô tả chi tiết",
              dataIndex: "description",
            },
            {
              key: "expiry",
              title: "Ngày hết hạn",
              dataIndex: "expiry",
            }
            ,
            {
              key: "action",
              title: "Action",
              render: (record) => (
                <div className="flex gap-2">
                  <Button className=" text-white border-none" disabled>
                    Chỉnh sửa
                  </Button>
                  <Button className=" text-white border-none" disabled>
                    Xoá
                  </Button>


                </div>
              ),
            },
          ]}
          dataSource={dataSource}
          rowKey="id"

        />
      </div>
      <Modal
        open={upsertCouponModal}
        title={
          upsertCouponModal?.actionType === "insert" ? "Add New Coupon" : "Update Coupon"
        }
        width={800}
        destroyOnClose
        footer={null}
        onCancel={() => setUpsertCouponModal(undefined)}
      >
        <UpsertCouponForm
          couponId={upsertCouponModal?.couponId}
          onOk={() => {
            setUpsertCouponModal(false);
            refetch();
          }}
        />
      </Modal>
    </>
  )
}


AdminManageCoupon.Layout = AdminLayout;