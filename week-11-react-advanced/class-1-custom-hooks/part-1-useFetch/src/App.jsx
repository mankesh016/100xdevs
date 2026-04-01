import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

// custom hook
function App() {
  const [post, setPost] = useState(1);

  const { finalData, isLoading } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/" + post,
  );

  return (
    <div>
      <button onClick={() => setPost(1)}>Post 1</button>
      <button onClick={() => setPost(2)}>Post 2</button>
      <button onClick={() => setPost(3)}>Post 3</button>
      <button onClick={() => setPost(4)}>Post 4</button>
      <div> {isLoading ? "loading..." : JSON.stringify(finalData)}</div>
    </div>
  );
}

export default App;
