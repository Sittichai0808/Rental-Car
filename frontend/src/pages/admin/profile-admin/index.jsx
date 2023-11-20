import { AdminLayout } from "@/layouts/AdminLayout";
import { useUserState } from "@/recoils/user.state.js";
import moment from "moment";
import { UploadProfilePicture } from "@/components/UploadProfilePicture";

export default function AdminProfile() {
  const [user, setUser] = useUserState();
  return (
    <div className="flex flex-grow">
      <div
        className="flex flex-col mt-5 mx-5 relative border rounded-xl border-solid border-neutral-200 p-4 "
        style={{
          width: "30%",
          height: "50%",
          boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
        }}
      >
        <h2 className="flex ml-0 text-2x">My Profile</h2>
        <div className="flex w-full flex-col justify-center items-center ">
          <UploadProfilePicture />

          <div className="flex flex-col  ">
            <h5 className="text-lg font-semibold text-center mt-1 mb-2 ">
              {user?.result?.username}
            </h5>

            <p className="mt-0">
              Tham gia: {moment(user?.result?.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col mt-5 mx-5 relative border rounded-xl border-solid border-neutral-200 p-4  "
        style={{
          width: "70%",
          minHeight: "100vh",
          boxShadow: "0 .25rem 1.125rem rgba(75,70,92,.1)",
        }}
      >
        <h2 className="flex ml-0 text-2x">Details</h2>
      </div>
    </div>
  );
}

AdminProfile.Layout = AdminLayout;
