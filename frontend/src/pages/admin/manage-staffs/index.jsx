import {
  upsertStaff,
  getStaffs,
  getUser,
  updateUserStatus,
} from "@/apis/admin-staff.api";
import { UploadImage } from "@/components/UploadImage";
import { GET_STAFFS } from "@/constants/react-query-key.constant";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/layouts/AdminLayout";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { Avatar, Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { omit } from "lodash-es";
import { useState } from "react";

function UpsertStaffForm({ staffId, onClose }) {
  const [accessToken] = useLocalStorage("access_token");
  const isInsert = !staffId;
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => getUser({ accessToken, userId: staffId }),
    enabled: !!staffId,
  });

  const staff = data?.result;
  console.log("yiy", staffId, staff);

  const [form] = Form.useForm();

  const apiUpsertStaff = useMutation({
    mutationFn: upsertStaff,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_STAFFS]);
      message.success("Tạo staff thành công");
    },
    onError: (error) => {
      message.error(error);
    },
  });

  const handleAddStaff = async () => {
    const values = form.getFieldsValue();

    console.log(values);

    onClose?.();
    await apiUpsertStaff.mutateAsync({ accessToken, body: values, staffId });
  };

  return (
    <>
      <Form
        layout="vertical"
        className="grid grid-cols-3 gap-4 mt-10"
        form={form}
        initialValues={omit(staff, "password")}
      >
        <div className="col-span-2">
          <Form.Item label="Username" required name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" required name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Name" required name="fullname">
            <Input />
          </Form.Item>
          <Form.Item label="Email" required name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" required name="phoneNumber">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item label="Address" required name="address">
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>

        <div>
          <Form.Item label="Avatar" name="profilePicture">
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

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getStaffs({ accessToken }),
    queryKey: [GET_STAFFS],
  });
  const apiUpdateStatus = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: refetch,
  });

  const handleInsertStaff = () => {
    setUpsertStaffModal({ actionType: "insert" });
  };

  return (
    <>
      <div className="pt-10">
        <div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center">
            <Button onClick={handleInsertStaff}>
              <UserAddOutlined /> <span>Add staff</span>
            </Button>
          </div>
        </div>
        <Table
          loading={isLoading}
          columns={[
            {
              key: "id",
              title: "ID",
              dataIndex: "id",
              render: (_value, _record, idx) => idx + 1,
            },
            {
              key: "profilePicture",
              title: "Avatar",
              dataIndex: "profilePicture",
              render: (url) => <Avatar src={url} />,
            },
            { key: "username", title: "Username", dataIndex: "username" },
            { key: "name", title: "Name", dataIndex: "fullname" },
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
                    onClick={() =>
                      setUpsertStaffModal({
                        actionType: "update",
                        staffId: staff._id,
                      })
                    }
                  >
                    Update
                  </Button>
                  {staff?.status === "Hoạt động" && (
                    <Popconfirm
                      title="Are you sure to block this user?"
                      okText="Block"
                      onConfirm={() => {
                        apiUpdateStatus.mutateAsync({
                          accessToken,
                          userId: staff._id,
                          status: "Không hoạt động",
                        });
                      }}
                    >
                      <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                        Block
                      </Button>
                    </Popconfirm>
                  )}

                  {staff?.status === "Không hoạt động" && (
                    <Popconfirm
                      title="Are you sure active this user?"
                      okText="Active"
                      onConfirm={() => {
                        apiUpdateStatus.mutateAsync({
                          accessToken,
                          userId: staff._id,
                          status: "Hoạt động",
                        });
                      }}
                    >
                      <Button className="bg-green-500 text-white border-none hover:bg-green-500/70">
                        Unblock
                      </Button>
                    </Popconfirm>
                  )}
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
        title={
          upsertStaffModal?.actionType === "insert"
            ? "Add new staff"
            : "Update staff"
        }
        width={800}
        destroyOnClose
        footer={null}
        onCancel={() => setUpsertStaffModal(undefined)}
      >
        <UpsertStaffForm
          staffId={upsertStaffModal?.staffId}
          onClose={() => setUpsertStaffModal(undefined)}
        />
      </Modal>
    </>
  );
}

AdminManageStaffs.Layout = AdminLayout;
