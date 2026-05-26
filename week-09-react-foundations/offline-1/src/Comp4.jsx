import { useEffect } from "react";
import { useState } from "react";

// Navbar Select
function Comp4() {
  const [currentTodo, setCurrentTodo] = useState(1);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const todos = [1, 2, 3, 4];

  useEffect(() => {
    // fetch
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + currentTodo,
      );
      const data = await res.json();

      setMessage(data.title);
      setIsLoading(false);
    }
    fetchData();
  }, [currentTodo]);

  return (
    <div>
      {todos.map((id) => (
        <button
          key={id}
          onClick={() => setCurrentTodo(id)}
          style={{ color: currentTodo === id ? "red" : "black" }}
        >
          Todo #{id}
        </button>
      ))}

      <div>{isLoading ? "..." : message}</div>
    </div>
  );
}

export default Comp4;
