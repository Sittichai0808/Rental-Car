import { upsertStaff, getStaffs } from "@/apis/admin-staff.api";
import { UploadImage } from "@/components/UploadImage";
import { GET_STAFFS } from "@/constants/react-query-key.constant";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/layouts/AdminLayout";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { Avatar, Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Upload } from "antd";
import { useState } from "react";

function UpsertStaffForm({ staffId }) {
  const [accessToken] = useLocalStorage("access_token");
  const isInsert = !staffId;

  const [form] = Form.useForm();

  const apiAddStaff = useMutation({
    mutationFn: upsertStaff,
    onError: (error) => {
      message.error(error);
    },
  });

  const handleAddStaff = async () => {
    const values = form.getFieldsValue();

    await apiAddStaff.mutateAsync({ accessToken, body: values });
  };

  return (
    <>
      <Form layout="vertical" className="grid grid-cols-3 gap-4 mt-10" form={form}>
        <div className="col-span-2">
          <Form.Item label="Name" required name="fullname">
            <Input />
          </Form.Item>
          <Form.Item label="Email" required name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" required name="phoneNumber">
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Address" required name="address">
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>

        <div>
          <Form.Item label="Avatar" className="profilePicture">
            <UploadImage />
          </Form.Item>
        </div>
      </Form>

      <div className="flex justify-end mt-10">
        <Button type="primary" onClick={handleAddStaff}>
          {isInsert ? "Add" : "Update"}
        </Button>
      </div>
    </>
  );
}

export default function AdminManageStaffs() {
  const [accessToken] = useLocalStorage("access_token");
  const [upsertStaffModal, setUpsertStaffModal] = useState();

  const { data, isLoading } = useQuery({
    queryFn: () => getStaffs({ accessToken }),
    queryKey: [GET_STAFFS],
  });

  const handleInsertStaff = () => {
    setUpsertStaffModal({ actionType: "insert" });
  };

  console.log(data?.result);

  return (
    <>
      <div className="pt-10">
        <div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center">
            <Input prefix={<SearchOutlined />} />
            <Button type="primary">Search</Button>
          </div>

          <div>
            <Button onClick={handleInsertStaff}>
              <UserAddOutlined /> <span>Add staff</span>
            </Button>
          </div>
        </div>
        <Table
          loading={isLoading}
          columns={[
            { key: "id", title: "ID", dataIndex: "id", render: (_value, _record, idx) => idx + 1 },
            {
              key: "profilePicture",
              title: "Avatar",
              dataIndex: "profilePicture",
              render: (url) => <Avatar src={url} />,
            },
            { key: "username", title: "Username", dataIndex: "username" },
            { key: "name", title: "Name", dataIndex: "name" },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "phoneNumber", title: "Phone", dataIndex: "phoneNumber" },
            // { key: "role", title: "Role", dataIndex: "role" },
            { key: "address", title: "Address", dataIndex: "address" },
            {
              key: "action",
              title: "Action",
              render: (_, staff) => (
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-500 text-white border-none hover:bg-blue-500/70"
                    onClick={() => setUpsertStaffModal({ actionType: "update", staffId: staff.id })}
                  >
                    Update
                  </Button>
                  <Popconfirm title="Are you sure to block this staff?" okText="Block">
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">Block</Button>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          dataSource={data?.result}
          rowKey="id"
        />
      </div>

      <Modal
        open={upsertStaffModal}
        title={upsertStaffModal?.actionType === "insert" ? "Add new staff" : "Update staff"}
        width={800}
        destroyOnClose
        footer={null}
        onCancel={() => setUpsertStaffModal(undefined)}
      >
        <UpsertStaffForm staffId={upsertStaffModal?.staffId} />
      </Modal>
    </>
  );
}

AdminManageStaffs.Layout = AdminLayout;
