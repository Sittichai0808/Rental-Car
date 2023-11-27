import { apiClient } from "./client";

export async function getCars() {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/cars`,
  });

  return data;
}

export async function getCar(carId, accessToken) { 
  const { data } = await apiClient.request({
    method: "GET",
    url: `/cars/${carId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function createCar(body, accessToken) {
  const { data } = await apiClient.request({
    method: "POST",
    url: `/cars/createCar`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: body,
  });

  return data;
}

export async function updateCar({ carId, body, accessToken }) {
  console.log(carId, body);
  const { data } = await apiClient.request({
    method: "PUT",
    url: `/cars/updateCar/${carId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: body,
  });

  return data;
}
