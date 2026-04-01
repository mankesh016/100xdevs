import { atomFamily, selectorFamily } from "recoil";
import { TODOS } from "./todos";

// export const todosAtomFamily = atomFamily({
//   key: "todosAtomFamily",
//   default: (id) => {
//     return TODOS.find((x) => x.id == id);
//   },
// });

// async version
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selectorFamily({
    key: "todosAtomFamily/default",
    get: (id) => async () => {
      const promise = new Promise((resolve) => setTimeout(resolve, 3000));
      await promise;

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id,
      );
      const data = await response.json();
      return data;
    },
  }),
});
