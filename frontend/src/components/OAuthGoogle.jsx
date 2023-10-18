import { GooglePlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/router";
function OAuthGoogle() {
  const router = useRouter();

  const handleGoogleAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await axios.post(
        "http://localhost:4000/users/google",

        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // const res = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: result.user.displayName,
      //     email: result.user.email,
      //     photo: result.user.photoURL,
      //   }),
      // });
      router.push("/");
    } catch (error) {
      console.log("couldn't not login with google", error);
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
