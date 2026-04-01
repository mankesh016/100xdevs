import { atom, selector } from "recoil";

export const counterAtom = atom({
  key: "counterAtom",
  default: 0,
});

export const evenSelector = selector({
  key: "isEvenSelector",
  get: ({ get }) => {
    const count = get(counterAtom);
    const isEven = count % 2 == 0;
    return isEven;
  },
});
