import { apiClient } from "./client";


export async function getCarDetail(carId) {
    const { data } = await apiClient.request({
        method: "GET",
        url: `/cars/${carId}`,
        withCredentials: true
    });

    return data;
}

export async function likeCars(accessToken, carId) {
    const { data } = await apiClient.request({
        method: "PUT",
        url: `/cars/${carId}/like`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        withCredentials: true
    });

    return data;
}

export async function getCarsLiked(accessToken) {
    const { data } = await apiClient.request({
        method: 'GET',
        url: `cars/get/liked`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    return data
}

