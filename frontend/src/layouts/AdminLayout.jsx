import { Avatar, Layout, Menu } from "antd";
import { BellOutlined, UsergroupAddOutlined, CarOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Sider, Header, Content } = Layout;

export const AdminLayout = ({ children }) => {
  const { pathname, push } = useRouter();

  return (
    <Layout hasSider className="h-screen">
      <Sider theme="light" className="border-r shadow bg-white p-6" width={300}>
        <div className="w-full bg-green-100 h-32 flex justify-center items-center mb-10">LOGO</div>
        <Menu
          activeKey={pathname.replace("/admin/", "")}
          items={[
            { key: "manage-users", label: "Manager Users", icon: <UsergroupAddOutlined /> },
            { key: "manage-cars", label: "Manager Cars", icon: <CarOutlined /> },
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
