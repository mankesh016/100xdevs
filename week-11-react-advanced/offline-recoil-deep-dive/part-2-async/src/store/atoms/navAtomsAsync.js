import { atom, selector } from "recoil";

export const notificationsAtom = atom({
  key: "notifications",
  default: {
    networkCount: 102,
    jobsCount: 0,
    messagesCount: 0,
    notificationCount: 12,
  },
});

export const notificationsAtomAsync = atom({
  key: "notificationsAtomAsync",
  default: selector({
    key: "notificationsSelectorAtom",
    get: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
      );
      const data = {
        networkCount: 90,
        jobsCount: 22,
        messagesCount: 30,
        notificationCount: 32,
      };
      return data;
    },
  }),
});

export const totalNotificationSelectorAsync = selector({
  key: "totalNotificationSelectorAsync",
  get: async ({ get }) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    const data = get(notificationsAtomAsync);
    return (
      data.networkCount +
      data.jobsCount +
      data.messagesCount +
      data.notificationCount
    );
  },
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const notifications = get(notificationsAtom);
    return (
      notifications.networkCount +
      notifications.jobsCount +
      notifications.messagesCount +
      notifications.notificationCount
    );
  },
});
