import { apiClient } from "./client";

export async function getRatingsOfCar({ carId }) {
    const { data } = await apiClient.request({
        method: "GET",
        url: `cars/ratings/${carId}`,
    });

    return data;
}
