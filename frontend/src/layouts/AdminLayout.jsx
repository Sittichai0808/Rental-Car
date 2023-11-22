import { Avatar, Layout, Menu } from "antd";
import {
  BellOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  BookOutlined,
  ContactsOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { GPLXIcon } from "@/icons";
import { useRouter } from "next/router";
import { useUserState } from "@/recoils/user.state.js";

const { Sider, Header, Content } = Layout;

export const AdminLayout = ({ children }) => {
  const [user, setUser] = useUserState();
  const { pathname, push } = useRouter();

  const selectedKeys = [pathname.replace("/admin/", "")];

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
            <Avatar icon={<UserOutlined />} />
            <span>{user?.result?.username}</span>
          </div>
        </Header>
        <Content className="p-4 bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
};
