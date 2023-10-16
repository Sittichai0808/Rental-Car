"use client";
import { themeConfigs } from "@/configs/ant.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { Manrope } from "next/font/google";
import { RecoilRoot } from "recoil";
import "./globals.css";
import { queryClient } from "@/apis/client";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

const primaryFont = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={primaryFont.className}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <StyledComponentsRegistry>
              <ConfigProvider theme={themeConfigs}>{children}</ConfigProvider>
            </StyledComponentsRegistry>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
