"use client";
import { Button } from "antd";
import { useLocalStorage } from "@/customHooks/useLocalStorage.js";
export default function HomePage() {
  const [profile, setProfile, clearProfile] = useLocalStorage("profile");

  return (
    <div>
      Hello {profile(profile).role}
      <span className="text-green-400 font-bold">OK nha</span>
      <Button type="primary">Click</Button>
    </div>
  );
}

HomePage.hideHeader = true;
