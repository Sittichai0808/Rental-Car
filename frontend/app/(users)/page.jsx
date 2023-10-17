"use client";
import { Button } from "antd";
import { useLocalStorage } from "@/customHooks/useLocalStorage.js";
export default function HomePage() {
  const [profile, setProfile, clearProfile] = useLocalStorage("profile");

  return (
    <div>
      Hello
      <h1>{profile(profile)?.username}</h1>
      <span className="text-green-400 font-bold">OK nha</span>
      <Button type="primary">Click</Button>
    </div>
  );
}

HomePage.hideHeader = true;
