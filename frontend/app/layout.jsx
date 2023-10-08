"use client";
import "./globals.css";
import { ConfigProvider } from "antd";
import { Manrope } from "next/font/google";
import { themeConfigs } from "@/configs/ant.config";
import { RecoilRoot } from "recoil";

const primaryFont = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={primaryFont.className}>
        <RecoilRoot>
          <ConfigProvider theme={themeConfigs}>{children}</ConfigProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
