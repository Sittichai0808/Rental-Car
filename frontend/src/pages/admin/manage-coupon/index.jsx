import React from 'react'
import { AdminLayout } from "@/layouts/AdminLayout";
import { Table, Button, Popconfirm, message } from "antd";

export default function AdminManageCoupon(){
  return (
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
        
        rowKey="id"
     
      />
    </div>
  )
}


AdminManageCoupon.Layout = AdminLayout;