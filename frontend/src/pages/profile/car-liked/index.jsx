import { getCarsLiked } from "@/apis/user-cars.api";
import { CarLikeCard } from "@/components/CarLikeCard";
import { GET_CARS_LIKED } from "@/constants/react-query-key.constant";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function CarLiked() {
  const [accessToken] = useLocalStorage("access_token");
  console.log(accessToken);

  const { isLoading, data } = useQuery({
    queryKey: [GET_CARS_LIKED],
    queryFn: () => getCarsLiked(accessToken),
  });
  console.log(data?.result);
  return (
    <div>
      <CarLikeCard />
    </div>
  );
}
