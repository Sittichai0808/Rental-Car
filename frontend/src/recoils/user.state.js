import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {},
});

// export const userSelector = selector({
//   key: "userCurrent",
//   get: ({ get }) => {
//     const getUser = get(userAtom);
//     return getUser;
//   },
//   set: ({ get, set }, newValue) => {
//     set(userAtom, { ...newValue });
//   },
// });

export const useUserState = () => useRecoilState(userAtom);
export const useUserValue = () => useRecoilValue(userAtom);
