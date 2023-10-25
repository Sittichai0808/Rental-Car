import { GooglePlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUserState } from "@/apis/updateUser.api";
function OAuthGoogle() {
  const router = useRouter();
  const [user, setUser] = useUserState();
  const [profile, setProfile, clearProfile] = useLocalStorage("profile", "");
  const [accessToken, setAccessToken, clearAccessToken] = useLocalStorage(
    "access_token",
    ""
  );
  const handleGoogleAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/google`,

        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        setUser({ ...res.data.result });
        setProfile({ ...res.data.result });
        setAccessToken(res.data.access_token);
        router.push("/");
      } else {
        console.log(error.res.data.errors[0].msg);
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      <Button
        onClick={handleGoogleAuthClick}
        type="default"
        className="relative  text-base h-[50px] w-[400px] py-2 mt-2"
      >
        <GooglePlusOutlined
          style={{
            fontSize: "25px",
            position: "absolute",
            left: "20px",
            color: "gray",
          }}
        />
        Sign Up With Google
      </Button>
    </>
  );
}

export default OAuthGoogle;
