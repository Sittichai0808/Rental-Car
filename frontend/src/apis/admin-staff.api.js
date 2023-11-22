import { message } from "antd";
import { apiClient } from "./client";

export const getStaffs = async ({ accessToken }) => {
  const { data } = await apiClient.request({
    method: "GET",
    url: `/admin/staffs`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const upsertStaff = async ({ accessToken, body, staffId }) => {
  const { data } = await apiClient.request({
    method: staffId ? "PUT" : "POST",
    url: staffId ? `/admin/update-staff/${staffId}` : `/admin/create-staffs`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: body,
  });

  return data;
};
