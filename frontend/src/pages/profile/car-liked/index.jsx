import { getCarsLiked } from "@/apis/user-cars.api";
import { GET_CARS_LIKED } from "@/constants/react-query-key.constant";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function CarLiked() {
  const [accessToken] = useLocalStorage("access_token");
  console.log(accessToken);

  const { isLoading, data } = useQuery({
    queryKey: [GET_CARS_LIKED],
    queryFn: () => getCarsLiked(accessToken),
  });
  console.log(data?.result);
  return <h1>Car Liked</h1>;
}
