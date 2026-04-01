import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { todosAtomFamily } from "./atomFamily";

// todos, atom family

function App() {
  return (
    <RecoilRoot>
      <Todos />
    </RecoilRoot>
  );
}

function Todos() {
  const todo1 = useRecoilValue(todosAtomFamily(1));
  const todo2 = useRecoilValue(todosAtomFamily(2));
  const updateTodo = useSetRecoilState(todosAtomFamily(2));

  //   setTimeout(() => {
  //     updateTodo({ id: 2, todo: "new todo" });
  //   }, 3000);

  return (
    <>
      <div>todos: {JSON.stringify(todo1)}</div>
      <div>todos: {JSON.stringify(todo2)}</div>
    </>
  );
}

export default App;
