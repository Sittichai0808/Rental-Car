import React from 'react'
import { AdminLayout } from "@/layouts/AdminLayout";
import {
  GET_COUPONS
} from "@/constants/react-query-key.constant";
import { useUserState } from "@/recoils/user.state";

import {getCoupons } from "@/apis/admin-coupons.api"
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
export default function AdminManageCoupon(){


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

  // const handleInsertCoupon = () => {
  //   setUpsertCouponModal({ actionType: "insert" });
  // };

  // console.log(upsertCouponModal);
  return (
    <>
    <div className="pt-10 px-4">

<div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center"></div>

          <div>
            <Button
              type="primary">            
              + Add Coupon
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
    {/* <Modal
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
  </Modal> */}
</>
  )
}


AdminManageCoupon.Layout = AdminLayout;