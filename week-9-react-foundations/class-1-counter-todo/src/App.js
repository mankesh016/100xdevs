import { useState } from "react";

function App() {
  return (
    <>
      <Counter />
      <Todo />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  function onButtonClick() {
    setCount(count + 1);
  }
  return (
    <div style={{ margin: 50 }}>
      <h1>React Counter : useState</h1>
      <button onClick={onButtonClick}>Counter {count}</button>
    </div>
  );
}

function Todo() {
  const [todos, setTodo] = useState([
    { title: "go to gym", description: "at 5:00pm", done: false },
  ]);
  function addTodo() {
    const newTask = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      done: "false",
    };
    setTodo([...todos, newTask]);
  }

  return (
    <div style={{ margin: 50 }}>
      <input id="title" type="text" placeholder="title" />
      <input id="description" type="text" placeholder="description" />

      <button onClick={addTodo}>add todo</button>

      <div style={{ marginTop: 20 }}>{JSON.stringify(todos)}</div>
    </div>
  );
}

export default App;
