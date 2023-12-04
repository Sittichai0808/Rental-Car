import React from 'react'
import { AdminLayout } from "@/layouts/AdminLayout";
import {
  GET_COUPONS,
  GET_COUPON_BY_ID,
} from "@/constants/react-query-key.constant";
import { useUserState } from "@/recoils/user.state";

import { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon } from "@/apis/admin-coupons.api"
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
  message,
  Table,
} from "antd";
import { useState } from "react";
import useLocalStorage from '@/hooks/useLocalStorage';
import moment from 'moment';


function UpsertCouponForm({ couponId, onOk }) {
  const [accessToken] = useLocalStorage("access_token");
 
  console.log({ couponId });

  const isInsert = !couponId;

  const [form] = Form.useForm();
  console.log( couponId);
  const couponDetail = useQuery({
    queryFn: () => getCouponById(couponId),
    queryKey: [GET_COUPON_BY_ID, couponId],
  });

  console.log(couponDetail.data?.result);

  const apiCreateCoupon = useMutation({
    mutationFn: createCoupon,
  });
const apiGetCouponById = useMutation({
  mutationFn: getCouponById,
})

  const apiUpdateCoupon = useMutation({
    mutationFn: updateCoupon,
  });

  console.log(couponDetail.data?.results);
  console.log(accessToken)
  return (
    <Form
      form={form}
      layout="vertical"
      className="flex flex-col gap-4 mt-10"
      initialValues={{
        ...couponDetail.data?.result
      }}
      onFinish={async (values) => {
        console.log(values, couponId);

        if (isInsert) {
          await apiCreateCoupon.mutateAsync({ body: { ...values }, accessToken });
          console.log({ values })
        } else {
          console.log({ values });
          await apiUpdateCoupon.mutateAsync({
            couponId, body: { ...values }, accessToken});
        }

        onOk?.();
      }}
    >
      <div className="h-[60vh] overflow-y-scroll flex gap-2">
        <div className="w-2/3">
          <Form.Item label="Tên Mã Giảm Giá" required name="name">
            <Input />

          </Form.Item>
          <Form.Item label="Mức giảm giá" required name="discount" className="w-full">
            <InputNumber />

          </Form.Item>
          <Form.Item label="Mô tả chi tiết" required name="description">
            <Input />

          </Form.Item>
          <Form.Item label="Ngày hết hạn" required name="expiry">
            <InputNumber />

          </Form.Item>
          <div className="flex justify-end mt-10">
            <Button type="primary" htmlType="submit">
              {isInsert ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default function AdminManageCoupon() {


  const [accessToken] = useLocalStorage("access_token");

  const [upsertCouponModal, setUpsertCouponModal] = useState();
  const { data, refetch } = useQuery({
    queryFn: getCoupons,
    queryKey: [GET_COUPONS],
  });

  const dataSource = data?.result.map((item, idCoupon) => ({
    id: idCoupon + 1,
    _id: item?._id,
    name: item?.name,
    discount: item?.discount,
    description: item?.description,
    expiry: moment(item?.expiry).format("DD-MM-YYYY HH:mm")
  }));
  const handleInsertCoupon = () => {
    setUpsertCouponModal({ actionType: "insert" });
  };
  console.log(upsertCouponModal);
  

  // const handleInsertCoupon = () => {
  //   setUpsertCouponModal({ actionType: "insert" });
  // };
  const deleteCouponMt = useMutation(
    (couponId) => deleteCoupon(couponId, accessToken),
    {
      onSuccess: () => {
        message.success("Xoá thành công");
        refetch()
      },

      onError: (error) => {
        message.error(`Xoá thất bại: ${error.message}`);
      },
    }
  );

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
              render: (_, coupon) => (
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-500 text-white border-none hover:bg-blue-500/70"
                    onClick={() => {
                      setUpsertCouponModal({
                        actionType: "update",
                        couponId: coupon.id,
                      });
                    }}
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Bạn có chắc chắn muốn xoá coupon này?"
                    okText="Delete"
                    onConfirm={() => deleteCouponMt.mutate(coupon._id)}
                  >
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                      Delete
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
        open={upsertCouponModal}
        title={
          upsertCouponModal?.actionType === "insert" ? "Add New Coupon" : "Update Coupon"
        }
        width={400}
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