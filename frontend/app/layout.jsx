"use client";
import { themeConfigs } from "@/configs/ant.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { Manrope } from "next/font/google";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { queryClient } from "@/apis/client";
import { ToastContainer } from "react-toastify";
const primaryFont = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={primaryFont.className}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={themeConfigs}>
              <ToastContainer />
              {children}
            </ConfigProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
