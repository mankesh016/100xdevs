import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";

// custom hooks

function Component() {
  const [query, setQuery] = useState("");
  const { debouncedValue } = useDebounce(query, 500);
  const inputRef2 = useRef();

  useEffect(() => {
    console.log("backend call");
  }, [debouncedValue]);

  function changeHandler() {
    setQuery(inputRef2.current.value);
    // console.log("debounce");
  }

  return (
    <div>
      <input ref={inputRef2} onChange={changeHandler} type="text" />
    </div>
  );
}

function App() {
  const inputRef = useRef();
  const clockRef = useRef();

  function backendSearch() {
    console.log("Backend search: " + inputRef.current.value);
  }

  function debounceSearch() {
    console.log("Debounce search: " + inputRef.current.value);
    clearTimeout(clockRef.current);

    clockRef.current = setTimeout(() => {
      backendSearch();
    }, 500);
  }

  return (
    <div>
      <div style={{ fontStyle: "italic", fontSize: "12px" }}>
        Both same just cleaner code with hooks
      </div>

      <div>
        <div>Without Using hook</div>
        <input ref={inputRef} onChange={debounceSearch} type="text" />
      </div>
      <hr />

      <div>
        Using Hook
        <Component />
      </div>

      <div style={{ fontStyle: "italic", fontSize: "12px" }}>
        Check console logs, for better understanding!
      </div>
    </div>
  );
}

export default App;
