import { apiClient } from "./client";

export async function getContracts(accessToken) {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/contracts`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return data;
}
