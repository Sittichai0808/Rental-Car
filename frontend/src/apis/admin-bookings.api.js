import { apiClient } from "./client";

export async function getBookings() {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/bookings`,
  });

  return data;
}
