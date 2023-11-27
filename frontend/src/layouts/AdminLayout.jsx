import { Avatar, Layout, Menu, Dropdown, Space } from "antd";
import {
  BellOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  BookOutlined,
  ContactsOutlined,
  IdcardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useUserState } from "@/recoils/user.state.js";
import useLocalStorage from "@/hooks/useLocalStorage";

const { Sider, Header, Content } = Layout;

export const AdminLayout = ({ children }) => {
  const { pathname, push } = useRouter();
  const [user, setUser] = useUserState();
  const router = useRouter();
  const role = user?.result.role;
  const selectedKeys = [pathname.replace("/admin/", "")];
  const [accessToken, setAccessToken, clearAccessToken] =
    useLocalStorage("access_token");
  const items = [
    {
      label: (
        <div onClick={() => push("/admin/profile-admin")}>
          <UserOutlined className="mr-2" />
          My Profile
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => {
            clearAccessToken();
            setUser(null);
            router.push("/");
          }}
        >
          {" "}
          <LogoutOutlined className=" text-red-600 mr-2" />
          Logout
        </div>
      ),
      key: "1",
    },
  ];
  return (
    <Layout hasSider className="h-screen">
      <Sider theme="light" className="border-r shadow bg-white p-6" width={300}>
        <div className="w-full bg-green-100 h-32 flex justify-center items-center mb-10">
          LOGO
        </div>
        <Menu
          selectedKeys={selectedKeys}
          items={[
            {
              key: "manage-users",
              label: "Users management",
              icon: <UsergroupAddOutlined />,
            },
            role === "admin"
              ? {
                  key: "manage-staffs",
                  label: "Staffs management",
                  icon: <UsergroupAddOutlined />,
                }
              : undefined,
            {
              key: "manage-cars",
              label: "Cars management",
              icon: <CarOutlined />,
            },
            {
              key: "manage-bookings",
              label: "Bookings management",
              icon: <BookOutlined />,
            },
            {
              key: "manage-contracts",
              label: "Contracts management",
              icon: <ContactsOutlined />,
            },
            {
              key: "manage-gplx",
              label: "GPLX management",
              icon: <IdcardOutlined />,
            },
            {
              key: "profile-admin",
              label: "Profile",
              icon: <UserOutlined />,
            },
          ]}
          onClick={(item) => push(`/admin/${item.key}`)}
        />
      </Sider>
      <Layout>
        <Header className="bg-white sticky top-0 z-10 flex justify-between items-center shadow">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="flex gap-4 items-center">
            <BellOutlined className="text-xl" />
            <Dropdown
              className="cursor-pointer"
              menu={{
                items,
              }}
              placement="bottom"
              trigger={["click"]}
            >
              <Space>
                <Avatar src={user?.result?.profilePicture} />
              </Space>
            </Dropdown>
            <span className="flex ">{user?.result?.username}</span>
          </div>
        </Header>
        <Content className="p-4 bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
};
