import { AdminLayout } from "@/layouts/AdminLayout";
import { useUserState } from "@/recoils/user.state";

export default function AdminDashboard() {
  const [user] = useUserState();

  return <div>{JSON.stringify(user?.result)}</div>;
}

AdminDashboard.Layout = AdminLayout;
