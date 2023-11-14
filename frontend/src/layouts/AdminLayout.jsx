import { Avatar, Layout, Menu } from "antd";
import {
  BellOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  BookOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const { Sider, Header, Content } = Layout;

export const AdminLayout = ({ children }) => {
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
          ]}
          onClick={(item) => push(`/admin/${item.key}`)}
        />
      </Sider>
      <Layout>
        <Header className="bg-white sticky top-0 z-10 flex justify-between items-center shadow">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="flex gap-4 items-center">
            <BellOutlined className="text-xl" />
            <Avatar />
          </div>
        </Header>
        <Content className="p-4 bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
};
