import { useState } from "react";
import { usePrev } from "./hooks/usePrev";

// custom hooks
function App() {
  const [value, setValue] = useState(0);
  const prev = usePrev(value);

  return (
    <div>
      <div>
        <div>Current Value : {value}</div>
        <div>Previous Value : {prev}</div>
        <button onClick={() => setValue((val) => val + 1)}>Click Me!</button>
        <div style={{ fontStyle: "italic", fontSize: "12px" }}>
          Check console logs, for better understanding!
        </div>
      </div>
    </div>
  );
}

export default App;
