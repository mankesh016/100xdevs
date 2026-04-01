import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 102,
});

export const JobsAtom = atom({
  key: "JobsAtom",
  default: 0,
});

export const messagesAtom = atom({
  key: "messagesAtom",
  default: 0,
});

export const notificationAtom = atom({
  key: "notificationAtom",
  default: 12,
});

export const totalNotificationSelector = selector({
  key: "totalNotificationAtom",
  get: ({ get }) => {
    const networkCount = get(networkAtom);
    const jobsCount = get(JobsAtom);
    const messagesCount = get(messagesAtom);
    const notificationCount = get(notificationAtom);
    return networkCount + jobsCount + messagesCount + notificationCount;
  },
});
