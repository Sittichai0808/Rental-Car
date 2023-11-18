import { apiClient } from "./client";

export async function getCars() {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/cars`,
  });

  return data;
}

export async function getCar(carId) {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/cars/${carId}`,
  });

  return data;
}

export async function createCar(body) {
  const { data } = await apiClient.request({
    method: "POST",
    url: `/cars/createCar`,
    data: body,
  });

  return data;
}

export async function updateCar({ carId, body }) {
  console.log(carId, body);
  const { data } = await apiClient.request({
    method: "PUT",
    url: `/cars/updateCar/${carId}`,
    data: body,
  });

  return data;
}
