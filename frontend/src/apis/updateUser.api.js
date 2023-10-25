import { atom, useRecoilState, useRecoilValue } from "recoil";
import { api } from "./client";
import queryString from "query-string";

export async function updateUser({
  params = {},
  queries = {},
  body = {},
} = {}) {
  const { data } = await api.request({
    method: "PUT",
    url: `/users/${params.id}`,
    data: body,
    params: queryString.stringify(queries),
  });

  return data;
}
const getProfile = (key) => {
  try {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const userAtom = atom({
  key: "user",
  default: getProfile("profile"),
});

export const useUserState = () => useRecoilState(userAtom);
export const useUserValue = () => useRecoilValue(userAtom);
