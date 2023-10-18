import { Button, Col, Layout, Row, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import bgImage from "../../public/bgImage.jpg";
import { useRouter } from "next/router";
const { Title } = Typography;

export const AuthLayout = ({ children }) => {
  const loaderProp = ({ src }) => {
    return src;
  };
  const { pathname } = useRouter();

  return (
    <Layout className="max-w-6xl mx-auto min-h-screen bg-white">
      <Row>
        <Col className="  gutter-row" xs={0} sm={0} md={12} lg={12} xl={12}>
          <div className="bg-cover bg-center relative ">
            <div className=" absolute inset-0 mx-[20px] my-[30px] rounded-[10px]  bg-green-500 bg-opacity-50"></div>
            <div className="h-screen px-[20px] py-[30px]">
              <Image
                className="w-full h-full rounded-[10px]"
                src={bgImage}
                loader={loaderProp}
                unoptimized={true}
                priority
                alt="Picture of the author"
              />
            </div>
            <div className="absolute inset-0  mx-[20px] my-[30px]  bg-opacity-50 rounded-[10px]">
              <Title level={1} className="text-white mx-6 my-20 w-3/4">
                CRT - Hành trình theo cách của bạn
              </Title>
            </div>
            <div className="absolute inset-x-0 bottom-0 mx-[20px] my-[30px] left-0    bg-green-900 bg-opacity-50 rounded-b-lg">
              <div className="flex justify-center items-center h-24">
                <Title level={5} className="text-white">
                  {pathname === "/register" ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}
                  <Button type="text" className="text-white font-bold text-base">
                    {pathname === "/register" ? (
                      <Link href="/login"> Đăng nhập</Link>
                    ) : (
                      <Link href="/register"> Đăng ký</Link>
                    )}
                  </Button>
                </Title>
              </div>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
          <div>{children}</div>
        </Col>
      </Row>
    </Layout>
  );
};