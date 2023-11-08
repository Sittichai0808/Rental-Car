import { CarRentalCard } from "@/components/CardRentalCard";
import { useQuery } from "@tanstack/react-query";
import { getHistoryBooking } from "@/apis/user-bookings.api";
import { GET_HISTORY_BOOKING_KEY } from "@/constants/react-query-key.constant";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function CarRentalPage() {
  const [accessToken] = useLocalStorage("access_token");
  const { isLoading, data } = useQuery({
    queryKey: [GET_HISTORY_BOOKING_KEY],
    queryFn: () => getHistoryBooking(accessToken),
  });
  console.log(data?.result);
  return (
    <div>
      <div className="mb-20">
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
          />
        ) : (
          <div className="flex flex-col gap-5 ">
            {data?.result.map((value, index) => (
              <CarRentalCard key={index} info={value} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
