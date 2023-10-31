import React, { useState } from "react";
import {
  Typography,
  Button,
  Avatar,
  Input,
  Modal,
  Select,
  Divider,
} from "antd";
import {
  EditOutlined,
  UserOutlined,
  LinkOutlined,
  FolderAddOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import styled from "@emotion/styled";
import { ProfileLayout } from "@/layouts/ProfileLayout";
const { Title } = Typography;
const StyleInput = styled(Input)`
  display: flex;
  align-items: center;
  border-color: #fff;
  background-color: #fff;
  font-weight: bold;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.88);
  padding: 12px;
  width: 100%;
`;
const StyleButton = styled(Button)`
  border-color: #5fcf86;
  background-color: #5fcf86;
  margin-top: 20px;
  height: 60px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyleSelect = styled(Select)`
  font-size: 2rem;
  border-color: #f6f6f6;
  color: #333;
`;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
export default function AccountPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOk = () => setOpen(false);
  const handleCancle = () => setOpen(false);

  const loaderProp = ({ src }) => {
    return src;
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col pl-10 pr-5 py-5 bg-white">
        <div className="flex title items-center justify-between">
          <Title className="flex items-center font-bold text-2xl" level={3}>
            Thông tin tài khoản
            <Button onClick={handleOpen}>
              <EditOutlined />
            </Button>
            <Modal
              open={open}
              onOk={handleOk}
              onCancel={handleCancle}
              footer={[
                <StyleButton key="back" onClick={handleOk}>
                  Cập nhật
                </StyleButton>,
              ]}
            >
              <div className="relative bg-transparent rounded-lg">
                <Title level={5} className="font-bold text-2xl text-center">
                  Cập nhật thông tin
                </Title>
                <div className="flex flex-col">
                  <div className="flex flex-col w-full justify-between">
                    <Title
                      level={5}
                      className="flex items-center text-sm font-medium"
                    >
                      Tên tài khoản
                    </Title>
                    <StyleInput
                      type="text"
                      placeholder="Email"
                      size="small"
                      defaultValue="Thịnh Tsubasa"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-between">
                    <Title
                      level={5}
                      className="flex items-center text-sm font-medium"
                    >
                      Ngày sinh
                    </Title>
                    <StyleInput
                      type="text"
                      placeholder="Email"
                      size="small"
                      defaultValue="01-01-1950"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-between">
                    <Title
                      level={5}
                      className="flex items-center text-sm font-medium"
                    >
                      Số điện thoại
                    </Title>
                    <StyleInput
                      type="text"
                      placeholder="Email"
                      size="small"
                      defaultValue="0149049104"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-between">
                    <Title
                      level={5}
                      className="flex items-center text-sm font-medium"
                    >
                      Email
                    </Title>
                    <StyleInput
                      type="text"
                      placeholder="Email"
                      size="small"
                      defaultValue="messithinh12345@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-between">
                    <Title
                      level={5}
                      className="flex items-center text-sm font-medium"
                    >
                      Giới tính
                    </Title>

                    <StyleSelect
                      defaultValue="Male"
                      onChange={handleChange}
                      options={[
                        { value: "Male", label: "Nam" },
                        { value: "Female", label: "Nữ" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Modal>
          </Title>
          <div className="flex items-baseline ">
            <Title
              className="flex  "
              level={3}
              style={{
                color: "#4ade80",
              }}
            >
              <EditOutlined />0
            </Title>
            <span className="flex">chuyến</span>
          </div>
        </div>
        <div className="flex content ">
          <div className="flex flex-col items-center font-bold w-1/3 pt-5">
            <Avatar
              className="flex justify-center "
              size={100}
              icon={<UserOutlined />}
            />
            <Title level={5} className="text-xl font-semibold">
              Thịnh Tsubasa
            </Title>
            <p className=" text-xs font-medium">Tham gia: 16/10/2023</p>
            <div className="flex items-center scroll-p-8">
              <Title className="flex text-base font-extrabold " level={3}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.57308 14.1633L5.57309 14.1633L5.57125 14.1605C4.82174 12.9893 4.39014 11.5926 4.39014 10.1C4.39014 5.90575 7.79668 2.5 11.9801 2.5C16.174 2.5 19.5801 5.90615 19.5801 10.1C19.5801 11.5801 19.1499 12.9674 18.4186 14.1411C18.1364 14.5732 17.8273 14.9664 17.4819 15.3312L17.4813 15.3317L17.4807 15.3323L17.4801 15.3329L17.4795 15.3335L17.4789 15.3341L17.4783 15.3347L17.4778 15.3353L17.4772 15.3358L17.4766 15.3364L17.476 15.337L17.4754 15.3376L17.4748 15.3382L17.4742 15.3388L17.4736 15.3394L17.473 15.34L17.4724 15.3406L17.4718 15.3412L17.4713 15.3417L17.4707 15.3423L17.4701 15.3429L17.4695 15.3435L17.4689 15.3441L17.4683 15.3447L17.4677 15.3453L17.4671 15.3459L17.4665 15.3465L17.4659 15.3471L17.4653 15.3477L17.4647 15.3483L17.4641 15.3489L17.4635 15.3495L17.463 15.35L17.4624 15.3506L17.4618 15.3512L17.4612 15.3518L17.4606 15.3524L17.46 15.353L17.4594 15.3536L17.4588 15.3542L17.4582 15.3548L17.4576 15.3554L17.457 15.356L17.4564 15.3566L17.4558 15.3572L17.4552 15.3578L17.4546 15.3584L17.454 15.359L17.4534 15.3596L17.4528 15.3602L17.4522 15.3608L17.4516 15.3614L17.451 15.362L17.4504 15.3626L17.4498 15.3632L17.4492 15.3638L17.4486 15.3644L17.448 15.365L17.4474 15.3656L17.4468 15.3662L17.4462 15.3668L17.4456 15.3674L17.445 15.368L17.4444 15.3686L17.4438 15.3692L17.4432 15.3698L17.4426 15.3704L17.442 15.371L17.4414 15.3716L17.4408 15.3722L17.4402 15.3728L17.4396 15.3734L17.439 15.374L17.4384 15.3746L17.4378 15.3752L17.4372 15.3758L17.4366 15.3764L17.436 15.377L17.4354 15.3776L17.4348 15.3782L17.4342 15.3788L17.4336 15.3794L17.433 15.38L17.4324 15.3806L17.4318 15.3812L17.4312 15.3818L17.4306 15.3824L17.43 15.383L17.4294 15.3836L17.4288 15.3842L17.4282 15.3848L17.4276 15.3854L17.427 15.386L17.4264 15.3866L17.4258 15.3872L17.4252 15.3878L17.4246 15.3884L17.424 15.3891L17.4233 15.3897L17.4227 15.3903L17.4221 15.3909L17.4215 15.3915L17.4209 15.3921L17.4203 15.3927L17.4197 15.3933L17.4191 15.3939L17.4185 15.3945L17.4179 15.3951L17.4173 15.3957L17.4167 15.3963L17.4161 15.3969L17.4155 15.3975L17.4149 15.3981L17.4143 15.3987L17.4136 15.3994L17.413 15.4L17.4124 15.4006L17.4118 15.4012L17.4112 15.4018L17.4106 15.4024L17.41 15.403L17.4094 15.4036L17.4088 15.4042L17.4082 15.4048L17.4076 15.4054L17.407 15.406L17.4064 15.4067L17.4057 15.4073L17.4051 15.4079L17.4045 15.4085L17.4039 15.4091L17.4033 15.4097L17.4027 15.4103L17.4021 15.4109L17.4015 15.4115L17.4009 15.4121L17.4003 15.4127L17.3997 15.4134L17.399 15.414L17.3984 15.4146L17.3978 15.4152L17.3972 15.4158L17.3966 15.4164L17.396 15.417L17.3954 15.4176L17.3948 15.4182L17.3942 15.4188L17.3936 15.4195L17.3929 15.4201L17.3923 15.4207L17.3917 15.4213L17.3911 15.4219L17.3905 15.4225L17.3899 15.4231L17.3893 15.4237L17.3887 15.4243L17.3881 15.425L17.3874 15.4256L17.3868 15.4262L17.3862 15.4268L17.3856 15.4274L17.385 15.428L17.3844 15.4286L17.3838 15.4292L17.3832 15.4298L17.3825 15.4305L17.3819 15.4311L17.3813 15.4317L17.3807 15.4323L17.3801 15.4329L17.3795 15.4335L17.3789 15.4341L17.3783 15.4347L17.3776 15.4354L17.377 15.436L17.3764 15.4366L17.3758 15.4372L17.3752 15.4378L17.3746 15.4384L17.374 15.439L17.3734 15.4396L17.3727 15.4403L17.3721 15.4409L17.3715 15.4415L17.3709 15.4421L17.3703 15.4427L17.3697 15.4433L17.3691 15.4439L17.3684 15.4446L17.3678 15.4452L17.3672 15.4458L17.3666 15.4464L17.366 15.447L17.3654 15.4476L17.3648 15.4482L17.3642 15.4489L17.3635 15.4495L17.3629 15.4501L17.3623 15.4507L17.3617 15.4513L17.3611 15.4519L17.3605 15.4525L17.3599 15.4532L17.3592 15.4538L17.3586 15.4544L17.358 15.455L17.3574 15.4556L17.3568 15.4562L17.3562 15.4568L17.3556 15.4575L17.3549 15.4581L17.3543 15.4587L17.3537 15.4593L17.3531 15.4599L17.3525 15.4605L17.3519 15.4611L17.3512 15.4618L17.3506 15.4624L17.35 15.463L17.3494 15.4636L17.3488 15.4642L17.3482 15.4648L17.3476 15.4654L17.3469 15.4661L17.3463 15.4667L17.3457 15.4673L17.3451 15.4679L17.3445 15.4685L17.3439 15.4691L17.3433 15.4697L17.3426 15.4704L17.342 15.471L17.3414 15.4716L17.3408 15.4722L17.3402 15.4728L17.3396 15.4734L17.3389 15.4741L17.3383 15.4747L17.3377 15.4753L17.3371 15.4759L17.3365 15.4765L17.3359 15.4771L17.3353 15.4777L17.3346 15.4784L17.334 15.479L17.3334 15.4796L17.3328 15.4802L17.3322 15.4808L17.3316 15.4814L17.331 15.4821L17.3303 15.4827L17.3297 15.4833L17.3291 15.4839L17.3285 15.4845L17.3279 15.4851L17.3273 15.4857L17.3266 15.4864L17.326 15.487L17.3254 15.4876L17.3248 15.4882L17.3242 15.4888L17.3236 15.4894L17.323 15.4901L17.3223 15.4907L17.3217 15.4913L17.3211 15.4919L17.3205 15.4925L17.3199 15.4931L17.3193 15.4937L17.3186 15.4944L17.318 15.495L17.3174 15.4956L17.3168 15.4962L17.3162 15.4968L17.3156 15.4974L17.315 15.498L17.3143 15.4987L17.3137 15.4993L17.3131 15.4999L17.3125 15.5005L17.3119 15.5011L17.3113 15.5017L17.3107 15.5023L17.31 15.503L17.3094 15.5036L17.3088 15.5042L17.3082 15.5048L17.3076 15.5054L17.307 15.506L17.3064 15.5067L17.3057 15.5073L17.3051 15.5079L17.3045 15.5085L17.3039 15.5091L17.3033 15.5097L17.3027 15.5103L17.3021 15.511L17.3014 15.5116L17.3008 15.5122L17.3002 15.5128L17.2996 15.5134L17.299 15.514L17.2984 15.5146L17.2978 15.5153L17.2971 15.5159L17.2965 15.5165L17.2959 15.5171L17.2953 15.5177L17.2947 15.5183L17.2941 15.5189L17.2935 15.5195L17.2928 15.5202L17.2922 15.5208L17.2916 15.5214L17.291 15.522L17.2904 15.5226L17.2898 15.5232L17.2892 15.5238L17.2886 15.5245L17.2879 15.5251L17.2873 15.5257L17.2867 15.5263L17.2861 15.5269L17.2855 15.5275L17.2849 15.5281L17.2843 15.5287L17.2836 15.5294L17.283 15.53L17.2824 15.5306L17.2818 15.5312L17.2812 15.5318L17.2806 15.5324L17.28 15.533L17.2794 15.5336L17.2788 15.5343L17.2781 15.5349L17.2775 15.5355L17.2769 15.5361L17.2763 15.5367L17.2757 15.5373L17.2751 15.5379L17.2745 15.5385L17.2739 15.5391L17.2732 15.5398L17.2726 15.5404L17.272 15.541L17.2714 15.5416L17.2708 15.5422L17.2702 15.5428L17.2696 15.5434L17.269 15.544L17.2684 15.5446L17.2678 15.5453L17.2671 15.5459L17.2665 15.5465L17.2659 15.5471L17.2653 15.5477L17.2647 15.5483L17.2641 15.5489L17.2635 15.5495L17.2629 15.5501L17.2623 15.5507L17.2617 15.5514L17.261 15.552L17.2604 15.5526L17.2598 15.5532L17.2592 15.5538L17.2586 15.5544L17.258 15.555L17.2574 15.5556L17.2568 15.5562L17.2562 15.5568L17.2556 15.5574L17.255 15.5581L17.2543 15.5587L17.2537 15.5593L17.2531 15.5599L17.2525 15.5605L17.2519 15.5611L17.2513 15.5617L17.2507 15.5623L17.2501 15.5629L17.2495 15.5635L17.2489 15.5641L17.2483 15.5647L17.2477 15.5653L17.2471 15.5659L17.2464 15.5666L17.2458 15.5672L17.2452 15.5678L17.2446 15.5684L17.244 15.569L17.2434 15.5696L17.2428 15.5702L17.2422 15.5708L17.2416 15.5714L17.241 15.572L17.2404 15.5726L17.2398 15.5732L17.2392 15.5738L17.2386 15.5744L17.238 15.575L17.2374 15.5756L17.2368 15.5762L17.2362 15.5768L17.2356 15.5775L17.2349 15.5781L17.2343 15.5787L17.2337 15.5793L17.2331 15.5799L17.2325 15.5805L17.2319 15.5811L17.2313 15.5817L17.2307 15.5823L17.2301 15.5829L17.2295 15.5835L17.2289 15.5841L17.2283 15.5847L17.2277 15.5853L17.2271 15.5859L17.2265 15.5865L17.2259 15.5871L17.2253 15.5877L17.2247 15.5883L17.2241 15.5889L17.2235 15.5895L17.2229 15.5901L17.2223 15.5907L17.2217 15.5913L17.2211 15.5919L17.2205 15.5925L17.2199 15.5931L17.2193 15.5937L17.2187 15.5943L17.2181 15.5949L17.2175 15.5955L17.2169 15.5961L17.2163 15.5967L17.2157 15.5973L17.2151 15.5979L17.2145 15.5985L17.2139 15.5991L17.2133 15.5997L17.2127 15.6003L17.2121 15.6009L17.2115 15.6015L17.2109 15.6021L17.2103 15.6027L17.2097 15.6033L17.2091 15.6039L17.2085 15.6045L17.2079 15.6051L17.2073 15.6057L17.2067 15.6063L17.2061 15.6069L17.2055 15.6075L17.2049 15.6081L17.2043 15.6087L17.2037 15.6093L17.2032 15.6099L17.2026 15.6104L17.202 15.611L17.2014 15.6116L17.2008 15.6122L17.2002 15.6128L17.1996 15.6134L17.199 15.614L17.1984 15.6146L17.1978 15.6152L17.1972 15.6158L17.1966 15.6164L17.196 15.617L17.1954 15.6176L17.1948 15.6182L17.1942 15.6188L17.1937 15.6194L17.1931 15.6199L17.1925 15.6205L17.1919 15.6211L17.1913 15.6217L17.1907 15.6223L17.1901 15.6229L17.1895 15.6235L17.1889 15.6241L17.1883 15.6247L17.1877 15.6253L17.1872 15.6259L17.1866 15.6264L17.186 15.627L17.1854 15.6276L17.1852 15.6278C17.1384 15.6701 17.0908 15.7112 17.0383 15.7566L17.0362 15.7584C16.985 15.8026 16.929 15.851 16.8722 15.9024C16.8249 15.9416 16.7773 15.9795 16.724 16.0219L16.7075 16.035C16.6509 16.0801 16.5891 16.1295 16.524 16.1841C16.2428 16.3828 15.9434 16.5737 15.6256 16.7567C15.5876 16.7724 15.5534 16.7901 15.5198 16.8104C15.4584 16.8393 15.3986 16.8693 15.3446 16.8963L15.3415 16.8978C15.2753 16.9309 15.2173 16.9599 15.1606 16.986C15.0387 17.0423 14.9088 17.0979 14.7906 17.1433L14.4701 17.2666V17.2737C14.1293 17.3919 13.7757 17.4831 13.4048 17.5473L13.3975 17.5486L13.3901 17.5501C12.934 17.6432 12.4676 17.69 11.9801 17.69C11.5033 17.69 11.0442 17.6433 10.5923 17.5586L10.5923 17.5585L10.587 17.5576C10.115 17.4743 9.64863 17.3348 9.20751 17.1564L9.19797 17.1526L9.18828 17.1491C9.07263 17.1078 8.96243 17.0573 8.82965 16.996C8.69766 16.9351 8.58149 16.8813 8.46718 16.8198L8.46369 16.8179C7.96449 16.5542 7.49711 16.2455 7.07894 15.8932C7.05998 15.8761 7.03788 15.8555 7.01362 15.833C6.94987 15.7737 6.8712 15.7007 6.7955 15.6383L6.506 15.3488C6.15171 14.9849 5.84409 14.5932 5.57308 14.1633ZM16.1703 9.84689L16.1703 9.84691L16.1737 9.84354C16.6275 9.38972 16.3887 8.60452 15.7423 8.49679L15.7423 8.49668L15.7318 8.49515L13.6306 8.19093L12.6991 6.29L12.6991 6.28999L12.6973 6.2864C12.4031 5.69788 11.5672 5.69788 11.2729 6.2864L11.2729 6.2864L11.2711 6.29L10.3397 8.19093L8.23847 8.49515L8.23846 8.49504L8.22792 8.49679C7.58155 8.60452 7.34274 9.38972 7.79656 9.84354L7.79653 9.84357L7.80107 9.84799L9.31945 11.3284L8.95749 13.4145L8.95748 13.4145L8.95694 13.4178C8.84693 14.0778 9.5337 14.5422 10.1037 14.2572L10.1038 14.2573L10.1136 14.2522L11.9901 13.2615L13.8667 14.2522L13.8666 14.2523L13.8765 14.2572C14.4466 14.5422 15.1333 14.0778 15.0233 13.4178L15.0233 13.4178L15.0228 13.4145L14.6607 11.328L16.1703 9.84689Z"
                    fill="#FFC634"
                    stroke="#FFC634"
                  ></path>
                  <path
                    d="M9.21907 19.2802L8.01768 21.3689C7.96623 21.4563 7.88004 21.4999 7.80013 21.4999H7.80007H7.80001H7.79995H7.79989H7.79983H7.79978H7.79972H7.79966H7.7996H7.79954H7.79948H7.79942H7.79937H7.79931H7.79925H7.79919H7.79913H7.79907H7.79901H7.79896H7.7989H7.79884H7.79878H7.79872H7.79866H7.79861H7.79855H7.79849H7.79843H7.79837H7.79831H7.79825H7.7982H7.79814H7.79808H7.79802H7.79796H7.7979H7.79785H7.79779H7.79773H7.79767H7.79761H7.79756H7.7975H7.79744H7.79738H7.79732H7.79727H7.79721H7.79715H7.79709H7.79703H7.79698H7.79692H7.79686H7.7968H7.79674H7.79669H7.79663H7.79657H7.79651H7.79645H7.7964H7.79634H7.79628H7.79622H7.79617H7.79611H7.79605H7.79599H7.79594H7.79588H7.79582H7.79576H7.79571H7.79565H7.79559H7.79554H7.79548H7.79542H7.79536H7.79531H7.79525H7.79519H7.79514H7.79508H7.79502H7.79497H7.79491H7.79485H7.7948H7.79474H7.79468H7.79463H7.79457H7.79451H7.79446H7.7944H7.79434H7.79429H7.79423H7.79417H7.79412H7.79406H7.79401H7.79395H7.79389H7.79384H7.79378H7.79373H7.79367H7.79362H7.79356H7.7935H7.79345H7.79339H7.79334H7.79328H7.79323H7.79317H7.79312H7.79306H7.79301H7.79295H7.7929H7.79284H7.79279H7.79273H7.79268H7.79262H7.79257H7.79251H7.79246H7.7924H7.79235H7.79229H7.79224H7.79218H7.79213H7.79208H7.79202H7.79197H7.79191H7.79186H7.79181H7.79175H7.7917H7.79165H7.79159H7.79154H7.79149H7.79143H7.79138H7.79133H7.79129C7.69193 21.494 7.61239 21.4363 7.57736 21.3663L7.57737 21.3663L7.57573 21.363L6.45573 19.1631L6.30829 18.8734L5.98377 18.8906L3.52375 19.0206L3.52374 19.0205L3.51687 19.021C3.41106 19.028 3.34466 18.9878 3.29723 18.9099L3.29726 18.9099L3.29413 18.9049C3.24494 18.8262 3.24329 18.7353 3.29201 18.6518L3.29336 18.6495L4.65814 16.2808C4.8552 16.5148 5.06382 16.7362 5.28004 16.9468C6.14574 17.8017 7.17908 18.4868 8.32683 18.961C8.61899 19.0852 8.91719 19.1908 9.21907 19.2802Z"
                    fill="#FFC634"
                    stroke="#FFC634"
                  ></path>
                  <path
                    d="M15.9997 21.3817L15.9998 21.3816L15.9931 21.3701L14.7813 19.269C15.0799 19.1796 15.3735 19.0742 15.6641 18.9507C16.7989 18.4776 17.831 17.7942 18.6966 16.9305C18.9248 16.7192 19.1355 16.4935 19.3322 16.258L20.7129 18.6428C20.7576 18.7289 20.757 18.8262 20.7138 18.9077C20.6525 18.9956 20.5796 19.0269 20.4944 19.0211L20.4944 19.021L20.4863 19.0206L18.0163 18.8906L17.6918 18.8735L17.5444 19.1631L16.4244 21.363L16.4244 21.363L16.4228 21.3663C16.3863 21.4393 16.305 21.4941 16.2182 21.4999H16.2181H16.2181H16.218H16.218H16.2179H16.2179H16.2178H16.2178H16.2177H16.2177H16.2177H16.2176H16.2176H16.2175H16.2175H16.2174H16.2174H16.2173H16.2173H16.2172H16.2172H16.2171H16.2171H16.217H16.217H16.217H16.2169H16.2169H16.2168H16.2168H16.2167H16.2167H16.2166H16.2166H16.2165H16.2165H16.2165H16.2164H16.2164H16.2163H16.2163H16.2162H16.2162H16.2162H16.2161H16.2161H16.216H16.216H16.2159H16.2159H16.2158H16.2158H16.2158H16.2157H16.2157H16.2156H16.2156H16.2156H16.2155H16.2155H16.2154H16.2154H16.2153H16.2153H16.2153H16.2152H16.2152H16.2151H16.2151H16.2151H16.215H16.215H16.2149H16.2149H16.2149H16.2148H16.2148H16.2147H16.2147H16.2147H16.2146H16.2146H16.2145H16.2145H16.2145H16.2144H16.2144H16.2143H16.2143H16.2143H16.2142H16.2142H16.2142H16.2141H16.2141H16.214H16.214H16.214H16.2139H16.2139H16.2139H16.2138H16.2138H16.2138H16.2137H16.2137H16.2136H16.2136H16.2136H16.2135H16.2135H16.2135H16.2134H16.2134H16.2134H16.2133H16.2133H16.2133H16.2132H16.2132H16.2132H16.2131H16.2131H16.2131H16.213H16.213H16.213H16.2129H16.2129H16.2129H16.2128H16.2128H16.2128H16.2127H16.2127H16.2127H16.2127H16.2126H16.2126H16.2126H16.2125H16.2125H16.2125H16.2124H16.2124H16.2124H16.2123H16.2123H16.2123H16.2123H16.2122H16.2122H16.2122H16.2121H16.2121H16.2121H16.2121H16.212H16.212H16.212H16.212H16.2119H16.2119H16.2119H16.2118H16.2118H16.2118H16.2118H16.2117H16.2117H16.2117H16.2117H16.2116H16.2116H16.2116H16.2116H16.2115H16.2115H16.2115H16.2115H16.2114H16.2114H16.2114H16.2114H16.2114H16.2113H16.2113H16.2113H16.2113H16.2112H16.2112H16.2112H16.2112H16.2112H16.2111H16.2111H16.2111H16.2111H16.2111H16.211H16.211H16.211H16.211H16.211H16.2109H16.2109H16.2109H16.2109H16.2109H16.2108H16.2108H16.2108H16.2108H16.2108H16.2108H16.2107H16.2107H16.2107H16.2107H16.2107H16.2107H16.2106H16.2106H16.2106H16.2106H16.2106H16.2106H16.2105H16.2105H16.2105H16.2105H16.2105H16.2105H16.2105H16.2104H16.2104H16.2104H16.2104H16.2104H16.2104H16.2104H16.2104H16.2103H16.2103H16.2103H16.2103H16.2103H16.2103H16.2103H16.2103H16.2103H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2102H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.2101H16.21H16.21H16.21H16.21H16.21H16.21C16.1131 21.4999 16.0374 21.4514 15.9997 21.3817Z"
                    fill="#FFC634"
                    stroke="#FFC634"
                  ></path>
                </svg>
                0 điểm
              </Title>
            </div>
          </div>
          <div className="flex flex-col w-2/3 ">
            <div className="flex flex-col rounded-lg pl-5   ">
              <div className="flex items-baseline justify-between ">
                <Title level={5} className="text-xs font-medium ">
                  Ngày sinh
                </Title>
                <Title level={5} className="text-lg font-semibold">
                  ----/----/--------
                </Title>
              </div>
              <div className="flex items-baseline justify-between ">
                <Title level={5} className="text-xs font-medium ">
                  Giới tính
                </Title>
                <Title level={5} className="text-lg font-semibold ">
                  Nam
                </Title>
              </div>
            </div>
            <div className="flex flex-col  ">
              <div className="w-full flex items-center justify-between  ">
                <Title
                  level={5}
                  className=" flex items-center text-xs font-medium "
                >
                  Số điện thoại
                </Title>

                <Title level={5} className="text-lg font-semibold">
                  +024243552535
                </Title>
              </div>
              <div className="w-full flex items-center justify-between ">
                <Title
                  level={5}
                  className=" flex items-center text-xs font-medium "
                >
                  Email
                </Title>

                <Title level={5} className="text-lg font-semibold">
                  messthinh12345@gmail.com
                </Title>
              </div>
              <div className="w-full flex items-center justify-between ">
                <Title
                  level={5}
                  className=" flex items-center text-xs font-medium "
                >
                  Facebook
                </Title>

                <Title level={5} className="text-lg font-semibold">
                  Thêm liên kết
                  <LinkOutlined />
                </Title>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex flex-col  pl-10 pr-5 bg-white pb-6">
        <div className="flex title items-center justify-between">
          <Title className="flex items-center font-semibold text-xl" level={3}>
            Giấy phép lái xe
            <Button>
              <EditOutlined />
            </Button>
          </Title>
          <div className="flex items-baseline ">
            <Button className="rounded-lg border-solid border-black font-bold text-xs">
              Chỉnh sửa
              <EditOutlined />
            </Button>
          </div>
        </div>
        <div className="flex items-center ">
          <Title className="text-xs font-medium ">
            Vì sao tôi phải xác thực GPLX
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2164_37736)">
                <path
                  d="M8.00065 14.6673C11.6825 14.6673 14.6673 11.6825 14.6673 8.00065C14.6673 4.31875 11.6825 1.33398 8.00065 1.33398C4.31875 1.33398 1.33398 4.31875 1.33398 8.00065C1.33398 11.6825 4.31875 14.6673 8.00065 14.6673Z"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.06055 6.00038C6.21728 5.55483 6.52665 5.17912 6.93385 4.9398C7.34105 4.70049 7.81981 4.61301 8.28533 4.69285C8.75085 4.7727 9.17309 5.01473 9.47726 5.37607C9.78144 5.7374 9.94792 6.19473 9.94721 6.66705C9.94721 8.00038 7.94721 8.66705 7.94721 8.66705"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8 11.334H8.00667"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2164_37736">
                  <rect width="16" height="16" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </Title>
        </div>
        <div className="content flex flex-row">
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Thông tin chung
            </Title>
            <div className="w-4/5 flex flex-col">
              <div className="flex flex-col  justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Số GPLX
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold"
                  placeholder="Email"
                  size="small"
                  defaultValue="09248205850"
                />
              </div>
              <div className="flex flex-col  justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium "
                >
                  Họ và tên
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold"
                  placeholder="Email"
                  size="small"
                  defaultValue="NGUYEN NGOC NGAN"
                />
              </div>
              <div className="flex flex-col justify-between">
                <Title
                  level={5}
                  className="flex items-center text-xs font-medium"
                >
                  Ngày sinh
                </Title>
                <StyleInput
                  disabled
                  type="text"
                  className="flex items-center text-base font-semibold"
                  placeholder="Email"
                  size="small"
                  defaultValue="01-01-1970"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <Title level={5} className="font-semibold">
              Hình ảnh
            </Title>
            <div className="flex flex-col justify-evenly h-full">
              <Image
                className="w-full object-cover rounded-xl"
                src="/images/car-detail.jpg"
                alt="bgImage"
                width={300}
                height={200}
                loader={loaderProp}
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-10 pr-5 bg-white p-6">
        <div className="flex flex-row justify-between">
          <div className="title items-baseline">
            <Title className="font-bold text-xl" level={3}>
              Giới thiệu bạn mới
            </Title>
            <Title className="text-xs font-medium ">
              Tìm hiểu chi tiết chương trình
              <QuestionCircleOutlined />
            </Title>
          </div>

          <Image
            className="rounded-xl "
            src="https://www.mioto.vn/static/media/banner.9bfc25cb.png"
            alt="bgImage"
            width={400}
            height={300}
            loader={loaderProp}
            unoptimized={true}
          />
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-5 bg-white">
        <div className="flex items-center justify-between">
          <Title className="  font-bold text-xl" level={3}>
            Thẻ của tôi
          </Title>
          <div className="flex items-baseline ">
            <Button className="rounded-lg border-solid border-black font-bold text-xs">
              Thêm thẻ
              <FolderAddOutlined />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Image
            className="  rounded-xl "
            src="https://www.mioto.vn/static/media/my-card.c94c4868.svg"
            alt="bgImage"
            width={340}
            height={360}
            loader={loaderProp}
            unoptimized={true}
          />
          <Title className="font-semibold text-xl text-zinc-400">
            Bạn chưa có thẻ nào
          </Title>
        </div>
      </div>

      <div className="flex flex-col pl-10 pr-5 mb-14 bg-white">
        <div className="flex items-center justify-between">
          <Title className="  font-bold text-xl" level={3}>
            Danh sách xe
          </Title>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Image
            className="  rounded-xl "
            src="https://www.mioto.vn/static/media/empty-mycar.e023e681.svg"
            alt="bgImage"
            width={340}
            height={338}
            loader={loaderProp}
            unoptimized={true}
          />
          <Title className="font-semibold text-xl text-zinc-400">
            Không tìm thấy xe nào
          </Title>
        </div>
      </div>
    </div>
  );
}

AccountPage.Layout = ProfileLayout;
