import { AdminLayout } from "@/layouts/AdminLayout";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Upload } from "antd";
import { useState } from "react";

function UpsertUserForm({ userId }) {
  const isInsert = !userId;

  return (
    <>
      <Form layout="vertical" className="flex gap-4 mt-10">
        <div className="w-2/3">
          <Form.Item label="Name" required>
            <Input />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" required>
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Address" required>
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>

        <div className="grow">
          <Form.Item label="Avatar">
            <Upload.Dragger listType="picture-card" className="aspect-square">
              <UserAddOutlined />
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

export default function AdminManageUsers() {
  const [upsertUserModal, setUpsertUserModal] = useState();

  const handleInsertUser = () => {
    setUpsertUserModal({ actionType: "insert" });
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
            <Button onClick={handleInsertUser}>
              <UserAddOutlined /> Add user
            </Button>
          </div>
        </div>
        <Table
          columns={[
            { key: "id", title: "ID", dataIndex: "id" },
            {
              key: "profilePicture",
              title: "Avatar",
              dataIndex: "profilePicture",
              render: (url) => <Avatar src={url} />,
            },
            { key: "name", title: "Name", dataIndex: "name" },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "phoneNumber", title: "Phone", dataIndex: "phoneNumber" },
            { key: "role", title: "Role", dataIndex: "role" },
            { key: "address", title: "Address", dataIndex: "address" },
            {
              key: "action",
              title: "Action",
              render: (_, user) => (
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-500 text-white border-none hover:bg-blue-500/70"
                    onClick={() => setUpsertUserModal({ actionType: "update", userId: user.id })}
                  >
                    Update
                  </Button>
                  <Popconfirm title="Are you sure to block this user?" okText="Block">
                    <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">Block</Button>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          dataSource={[
            {
              id: 1,
              profilePicture:
                "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
              name: "Luong Cong Truong",
              email: "test@gmail.com",
              phoneNumber: "0982738236",
              role: "user",
              address: "Ngu Hanh Son, Da Nang",
            },
          ]}
          rowKey="id"
        />
      </div>

      <Modal
        open={upsertUserModal}
        title={upsertUserModal?.actionType === "insert" ? "Add new user" : "Update user"}
        width={800}
        destroyOnClose
        footer={null}
        onCancel={() => setUpsertUserModal(undefined)}
      >
        <UpsertUserForm userId={upsertUserModal?.userId} />
      </Modal>
    </>
  );
}

AdminManageUsers.Layout = AdminLayout;