import { atom } from "recoil";

// atom => (key:고유값, default:상태)

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
