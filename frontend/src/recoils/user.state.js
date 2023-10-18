import { atom, useRecoilState } from "recoil";

const userAtom = atom({
  key: "user-atom",
  default: null,
});

export const useUserState = () => useRecoilState(userAtom);
