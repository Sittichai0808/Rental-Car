import { atom, useRecoilState, useRecoilValue } from "recoil";

const getProfile = (key) => {
  try {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
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
