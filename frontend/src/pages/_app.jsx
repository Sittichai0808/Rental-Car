import "./global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";
import { queryClient } from "@/apis/client";
import { themeConfigs } from "@/configs/ant.config";
import { UserWebLayout } from "@/layouts/UserLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  const { Layout = UserWebLayout, title = "Rental Car" } = Component;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfigs}>
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
