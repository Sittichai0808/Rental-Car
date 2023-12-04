import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserFilledIcon } from "@/icons";
import styled from "@emotion/styled";
import { Divider, Layout, Menu } from "antd";

const { Footer } = Layout;

export default function FooterComponent() {
  return (
    <Footer
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      Footer
    </Footer>
  );
}
