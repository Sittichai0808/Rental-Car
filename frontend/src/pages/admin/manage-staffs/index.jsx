import {
  upsertStaff,
  getStaffs,
  getUser,
  updateUserStatus,
} from "@/apis/admin-staff.api";
import { UploadImage } from "@/components/UploadImage";
import { GET_STAFFS } from "@/constants/react-query-key.constant.js";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/layouts/AdminLayout";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { Avatar, Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { omit } from "lodash-es";
import { useEffect, useState } from "react";

function UpsertStaffForm({ actionType, staffId, onClose }) {
  const [accessToken] = useLocalStorage("access_token");
  const isInsert = !staffId;
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => getUser({ accessToken, userId: staffId }),
    enabled: !!staffId,
  });

  // const staff = actionType===undefined ? null : data?.result;
  // console.log("yiy", staffId, staff);

  const [form] = Form.useForm();
  if (actionType === "insert") {
    // form.setFieldsValue(null);
  } else {
    const { password, profilePicture, ...rest } = { ...data?.result };
    console.log(rest);
    form.setFieldsValue({ ...rest, profilePicture: profilePicture });
  }
  // form.setFieldsValue({ ...data?.result });
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
        // initialValues={omit(staff, "password")}
      >
        <div className="col-span-2">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên hiển thị!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Name"
            required
            name="fullname"
            rules={[
              {
                required: true,
                message: "Hãy nhập họ và tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            required
            name="email"
            rules={[
              {
                required: true,
                message: "Hãy nhập email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            required
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Hãy nhập số điện thoại!",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Address"
            required
            name="address"
            rules={[
              {
                required: true,
                message: "Hãy nhập địa chỉ!",
              },
            ]}
          >
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
          {isInsert ? "Tạo mới" : "Cập nhật"}
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
    setUpsertStaffModal({ actionType: "insert", staffId: undefined });
  };

  return (
    <>
      <div className="pt-10">
        <div className="mb-4 flex justify-between items-center">
          <div className="max-w-[30%] flex gap-2 items-center">
            <Button onClick={handleInsertStaff}>
              <UserAddOutlined /> <span>Tạo nhân viên</span>
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
            { key: "name", title: "Họ tên", dataIndex: "fullname" },
            { key: "email", title: "Email", dataIndex: "email" },
            {
              key: "phoneNumber",
              title: "Số điện thoại",
              dataIndex: "phoneNumber",
            },
            // { key: "role", title: "Role", dataIndex: "role" },
            { key: "address", title: "Địa chỉ", dataIndex: "address" },
            {
              key: "action",
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
                    Cập nhật
                  </Button>
                  {staff?.status === "Hoạt động" && (
                    <Popconfirm
                      title="Bạn muốn chặn nhân viên này?"
                      okText="Chặn"
                      cancelText="Hủy"
                      onConfirm={() => {
                        apiUpdateStatus.mutateAsync({
                          accessToken,
                          userId: staff._id,
                          status: "Không hoạt động",
                        });
                      }}
                    >
                      <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                        Chặn
                      </Button>
                    </Popconfirm>
                  )}

                  {staff?.status === "Không hoạt động" && (
                    <Popconfirm
                      title="Bạn muốn bỏ chặn nhân viên này?"
                      okText="Bỏ chặn"
                      cancelText="Hủy"
                      onConfirm={() => {
                        apiUpdateStatus.mutateAsync({
                          accessToken,
                          userId: staff._id,
                          status: "Hoạt động",
                        });
                      }}
                    >
                      <Button className="bg-green-500 text-white border-none hover:bg-green-500/70">
                        Bỏ chặn
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
          actionType={upsertStaffModal?.actionType}
          staffId={upsertStaffModal?.staffId}
          onClose={() => setUpsertStaffModal(undefined)}
        />
      </Modal>
    </>
  );
}

AdminManageStaffs.Layout = AdminLayout;
