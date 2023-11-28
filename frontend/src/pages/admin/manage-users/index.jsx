import { getUsers, updateUserStatus } from "@/apis/admin-staff.api";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AdminLayout } from "@/layouts/AdminLayout";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Button, Input, Popconfirm, Table } from "antd";

export default function AdminManageUsers() {
  const [accessToken] = useLocalStorage("access_token");

  const { data: users, refetch } = useQuery({
    queryFn: () => getUsers({ accessToken }),
  });

  const apiUpdateStatus = useMutation({
    mutationFn: updateUserStatus,
    onSuccess: refetch,
  });

  return (
    <>
      <div className="pt-10">
        <div className="mb-4 flex justify-between items-center"></div>
        <Table
          columns={[
            { key: "id", title: "ID", dataIndex: "id" },
            {
              key: "profilePicture",
              title: "Avatar",
              dataIndex: "profilePicture",
              render: (url) => <Avatar src={url} />,
            },
            { key: "name", title: "Name", dataIndex: "fullname" },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "phoneNumber", title: "Phone", dataIndex: "phoneNumber" },
            { key: "role", title: "Role", dataIndex: "role" },
            { key: "address", title: "Address", dataIndex: "address" },
            {
              key: "action",
              title: "Action",
              render: (_, user) => (
                <div className="flex gap-2">
                  {user?.status === "Hoạt động" && (
                    <Popconfirm
                      title="Are you sure to block this user?"
                      okText="Block"
                      onConfirm={() => {
                        apiUpdateStatus.mutateAsync({
                          accessToken,
                          userId: user._id,
                          status: "Không hoạt động",
                        });
                      }}
                    >
                      <Button className="bg-red-500 text-white border-none hover:bg-red-500/70">
                        Block
                      </Button>
                    </Popconfirm>
                  )}

                  {user?.status === "Không hoạt động" && (
                    <Popconfirm
                      title="Are you sure active this user?"
                      okText="Active"
                      onConfirm={() => {
                        apiUpdateStatus.mutateAsync({
                          accessToken,
                          userId: user._id,
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
          dataSource={users}
          rowKey="id"
        />
      </div>
    </>
  );
}

AdminManageUsers.Layout = AdminLayout;
