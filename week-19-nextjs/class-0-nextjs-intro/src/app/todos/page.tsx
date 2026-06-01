import axios from "axios";
import { todo } from "node:test";

async function getTodos() {
  const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return todos.data;
}
export default async function Todos() {
  const todos = await getTodos();
  return (
    <div>
      {todos.map((todo: any) => (
        <Todo key={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </div>
  );
}

interface TodoInterface {
  title: string;
  completed: boolean;
}
function Todo({ title, completed }: TodoInterface) {
  return (
    <div>
      {title} - {completed ? "Done" : "Not done"}
    </div>
  );
}
