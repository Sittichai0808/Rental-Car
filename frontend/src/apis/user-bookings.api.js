import { apiClient } from "./client";


export async function getHistoryBooking(accessToken) {
    const { data } = await apiClient.request({
        method: "GET",
        url: `/bookings/historyBooking`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        withCredentials: true
    });

    return data;
}

