import { CarCard } from "@/components/CarCard";
import { SearchBrokenIcon } from "@/icons";
import { Select } from "antd";
import { Button, Form } from "antd";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <div className="mb-12">
        <div className="relative h-[50vh]">
          <Image
            src="/images/bg-landingpage.png"
            alt="banner"
            layout="fill"
            className="object-cover rounded-md"
          />
        </div>

        <div className="bg-white rounded-lg -mt-10 w-4/5 mx-auto z-50 relative pt-6 px-4 shadow-lg">
          <Form layout="vertical" className="grid grid-cols-5 gap-6 h-full">
            <Form.Item name="brand">
              <Select
                size="large"
                placeholder="Hãng xe"
                options={[{ value: "Cambri" }, { value: "Mecedes" }]}
              />
            </Form.Item>
            <Form.Item name="brand">
              <Select
                size="large"
                placeholder="Số ghế"
                options={[{ value: "4 chỗ" }, { value: "7 chỗ" }]}
              />
            </Form.Item>
            <Form.Item name="brand">
              <Select
                size="large"
                placeholder="Truyền động"
                options={[{ value: "Số sàn" }, { value: "Số tự động" }]}
              />
            </Form.Item>
            <Form.Item name="brand">
              <Select
                size="large"
                placeholder="Giá"
                options={[{ value: "0 - 500K" }, { value: "501K - 1000K" }]}
              />
            </Form.Item>

            <Button type="primary" icon={<SearchBrokenIcon />} size="large">
              Tìm kiếm
            </Button>
          </Form>
        </div>
      </div>
      <div className="mb-40">
        <h2 className="text-center text-2xl">Xe dành cho bạn</h2>

        <div className="grid grid-cols-4 gap-3">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>
      </div>
      <div className="mb-40">
        <h2 className="text-center text-2xl">Ưu Điểm Của CRT</h2>
        <p className="text-center font-semibold text-neutral-700 mb-8">
          Những tính năng của CRT giúp bạn dễ dàng an tâm hơn khi thuê xe
        </p>

        <div className="w-5/6 mx-auto grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-1.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Thuê xe an toàn</h5>
            <p className="text-center">
              Tất cả các xe trên CRT đã được kiểm duyệt và chịu sự quản lý của
              CRT
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-2.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Thủ tục đơn giản</h5>
            <p className="text-center">
              Chỉ cần cung cấp CCCD và bằng lái xe cho chúng tôi
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-3.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Thanh toán dễ dàng</h5>
            <p className="text-center">
              Có thể lựa chọn thanh toán khi hoàn tất chuyến đi hoặc qua trang
              thanh toán trực tuyến
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-4.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Giao xe tận nơi</h5>
            <p className="text-center">
              CRT cho bạn chọn địa điểm nhận xe hoặc bạn có thể đến trực tiếp
              CRT nhận xe
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-5.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Nhiều mẫu mã</h5>
            <p className="text-center">
              Đa dạng các dòng xe với giá cả rất phải chăng
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-6.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">An toàn khi lái xe</h5>
            <p className="text-center">Tất cả các xe đều có bảo hiểm</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center text-2xl">Hướng Dẫn Thuê Xe</h2>
        <p className="text-center font-semibold text-neutral-700 mb-8">
          Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh
          chóng
        </p>

        <div className="grid grid-cols-4 gap-10">
          <div className="flex flex-col">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/guide-1.svg" alt="guide" layout="fill" />
            </div>
            <div className="flex gap-4 text-xl font-black justify-center">
              <span className="text-green-500 text-3xl">01</span>
              <span>Đặt xe trên app/web CRT</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/guide-2.svg" alt="guide" layout="fill" />
            </div>
            <div className="flex gap-4 text-xl font-black justify-center">
              <span className="text-green-500 text-3xl">02</span>
              <span>Nhận xe</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/guide-3.svg" alt="guide" layout="fill" />
            </div>
            <div className="flex gap-4 text-xl font-black justify-center">
              <span className="text-green-500 text-3xl">03</span>
              <span>Bắt đầu hành trình</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/guide-4.svg" alt="guide" layout="fill" />
            </div>
            <div className="flex gap-4 text-xl font-black justify-center">
              <span className="text-green-500 text-3xl">04</span>
              <span>Trả xe & kết thúc chuyến đi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 p-4 rounded-xl bg-green-50 grid grid-cols-2 gap-6">
        <div className="flex flex-col justify-center items-center">
          <h1>Bạn muốn hợp tác với chúng tôi?</h1>
          <div className="text-center text-base">
            Bạn muốn cho thuê xe? Bấm xem thêm để biết thêm thông tin chi tiết
            về việc hợp tác với chúng tôi
          </div>
          <Button className="mt-10" type="primary">
            Xem thêm
          </Button>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image alt="hh" src="/images/car.jpg" layout="fill" />
        </div>
      </div>

      <div className="mt-10 p-4 rounded-xl bg-blue-100 grid grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image alt="hh" src="/images/car.jpg" layout="fill" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1>Bạn muốn biết thêm thông tin về chúng tôi?</h1>
          <div className="text-center text-base">
            CRT mang lại một ứng dụng cho thuê xe tự lái ở Đà Nẵng và sẽ mở rộng
            ra hơn khắp Việt Nam trong thời gian tới. CRT mong rằng sẽ đem lại
            trải nghiệp thuê xe tự lái một cách an toàn và chuyên nghiệp nhất
          </div>
          <Button className="mt-10" type="primary">
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
