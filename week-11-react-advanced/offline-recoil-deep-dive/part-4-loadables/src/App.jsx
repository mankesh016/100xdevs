import {
  RecoilRoot,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { todosAtomFamily } from "./store/atoms/atomFamily";

// atomfamily async
function App() {
  return (
    <RecoilRoot>
      <div>Loadable todos... </div>
      <Todos />
    </RecoilRoot>
  );
}

function Todos() {
  const todo1 = useRecoilValueLoadable(todosAtomFamily(1)); // value
  const [todo2, setTodo2] = useRecoilStateLoadable(todosAtomFamily(2)); // state

  const updateTodo = useSetRecoilState(todosAtomFamily(2));

  //   setTimeout(() => {
  //     updateTodo({ id: 2, todo: "new todo" });
  //   }, 3000);

  if (todo1.state === "loading") {
    return <div>Loading</div>;
  } else {
    return (
      <>
        <div>todos: {JSON.stringify(todo1.contents.title)}</div>
        <div>todos: {JSON.stringify(todo1.contents)}</div>
        <div>todos: {JSON.stringify(todo2.contents)}</div>
      </>
    );
  }
}

export default App;
