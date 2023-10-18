import { CarCard } from "@/components/CarCard";
import { CalendarFilledIcon, LocationFilledIcon } from "@/icons";
import { Button, DatePicker, Form, Input } from "antd";
import Image from "next/image";
import { Button } from "antd";
export default function HomePage() {
  return (
    <div>
      <div className="mb-12">
        <div className="relative h-[50vh]">
          <Image src="/images/bg-landingpage.png" alt="banner" layout="fill" className="object-cover rounded-md" />
        </div>

        <div className="bg-white rounded-lg -mt-10 w-4/5 mx-auto z-50 relative pt-6 px-4 shadow-lg">
          <Form layout="vertical" className="flex gap-6 items-center h-full">
            <Form.Item
              className="grow"
              label={
                <div className="font-bold text-lg flex gap-2 items-center text-gray-800">
                  <LocationFilledIcon />
                  <span>Địa điểm</span>
                </div>
              }
            >
              <Input placeholder="Địa điểm" size="large" />
            </Form.Item>

            <Form.Item
              className="grow"
              label={
                <div className="font-bold text-lg flex gap-2 items-center text-gray-800">
                  <CalendarFilledIcon />
                  <span>Thời gian</span>
                </div>
              }
            >
              <DatePicker.RangePicker size="large" className="w-full" />
            </Form.Item>
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
        <h2 className="text-center text-2xl">Ưu Điểm Của Mioto</h2>
        <p className="text-center font-semibold text-neutral-700 mb-8">
          Những tính năng giúp bạn dễ dàng hơn khi thuê xe trên Mioto.
        </p>

        <div className="w-5/6 mx-auto grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-1.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">An tâm đặt xe</h5>
            <p className="text-center">
              Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến
              trong vòng 7 ngày trước chuyến đi.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-2.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Thủ tục đơn giản</h5>
            <p className="text-center">
              Chỉ cần có CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên Mioto.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-3.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Thanh toán dễ dàng</h5>
            <p className="text-center">
              Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử (Momo, VnPay, ZaloPay).
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-4.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Giao xe tận nơi</h5>
            <p className="text-center">Bạn có thể lựa chọn giao xe tận nhà/sân bay... Phí tiết kiệm chỉ từ 15k/km.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-5.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Dòng xe đa dạng</h5>
            <p className="text-center">Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/ad-6.svg" alt="ad" layout="fill" />
            </div>
            <h5 className="text-lg mb-0">Lái xe an toàn</h5>
            <p className="text-center">Vững tay lái với gói bảo hiểm thuê xe từ nhà bảo hiểm MIC & VNI.</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center text-2xl">Hướng Dẫn Thuê Xe</h2>
        <p className="text-center font-semibold text-neutral-700 mb-8">
          Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng
        </p>

        <div className="grid grid-cols-4 gap-10">
          <div className="flex flex-col">
            <div className="relative aspect-square w-60 h-60">
              <Image src="/images/guide-1.svg" alt="guide" layout="fill" />
            </div>
            <div className="flex gap-4 text-xl font-black justify-center">
              <span className="text-green-500 text-3xl">01</span>
              <span>Đặt xe trên app/web Mioto</span>
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

      <div className="mt-10 p-4 rounded-md bg-neutral-200 grid grid-cols-2 gap-6">
        <div className="flex flex-col justify-center items-center">
          <h3>Bạn muốn hợp tác với chúng tôi?</h3>
          <div className="text-center">
            Bạn muốn cho thuê xe? Bấm xem thêm để biết thêm thông tin chi tiết về việc hợp tác với chúng tôi
          </div>
          <Button className="mt-10" type="primary">
            Xem thêm
          </Button>
        </div>

        <div className="relative aspect-video rounded-md overflow-hidden">
          <Image alt="hh" src="/images/car.jpg" layout="fill" />
        </div>
      </div>

      <div className="mt-10 p-4 rounded-md bg-neutral-200 grid grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-md overflow-hidden">
          <Image alt="hh" src="/images/car.jpg" layout="fill" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3>Bạn muốn biết thêm thông tin về chúng tôi?</h3>
          <div className="text-center">
            CRT là mang lại một ứng dụng cho thuê xe tự lái ở Đà Nẵng và sẽ mở rộng ra hơn khắp Việt Nam trong thời gian
            tới. CRT mong rằng sẽ đem lại trải nghiệp thuê xe tự lái một cách an toàn và chuyên nghiệp nhất
          </div>
          <Button className="mt-10" type="primary">
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
