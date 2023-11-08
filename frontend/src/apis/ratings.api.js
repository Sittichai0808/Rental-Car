import { apiClient } from "./client";

export async function getHistoryBooking() {
    const { data } = await apiClient.request({
        method: "GET",
        url: `/bookings/historyBooking`,
    });

    return data;
}
