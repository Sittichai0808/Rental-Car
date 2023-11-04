import { apiClient } from "./client";

export async function getCars() {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/cars`,
  });

  return data;
}
