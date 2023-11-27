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
export async function createCoupon(body, accessToken) {
    const { data } = await apiClient.request({
      method: "POST",
      url: `/coupons/createCoupon`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: body,
    });
  
    return data;
  }
  
  
  export async function updateCoupon({ couponId, body, accessToken }) {
    console.log(couponId, body);
    const { data } = await apiClient.request({
      method: "PUT",
      url: `/coupon/updateCoupon/${couponId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: body,
    });
  
    return data;
  }