import { apiClient } from "./client";

export async function getCoupons() {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/coupons`,
  });

  return data;
}

export async function getCouponById(cId, accessToken) {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/coupon/${cId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return data;
}