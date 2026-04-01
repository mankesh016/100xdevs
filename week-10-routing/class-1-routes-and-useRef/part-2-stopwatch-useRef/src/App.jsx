import { useRef, useState } from "react";

function App() {
  const inputRef = useRef();

  function focusOnInput() {
    // document.getElementById("inputName").focus();
    inputRef.current.focus();
  }

  return (
    <div>
      Input Focus
      <input
        ref={inputRef}
        id="inputName"
        type="text"
        placeholder="Enter Your Name"
      />
      <button onClick={focusOnInput}>Focus</button>
      <hr />
      <Clock />
    </div>
  );
}

// A clock with START and STOP button
function Clock() {
  const style = {
    color: "white",
    border: "none",
    padding: "10px",
    marginTop: "20px",
  };

  const [value, setValue] = useState(0.0);

  const [timer, setTimer] = useState();
  const clockRef = useRef();

  function startClock() {
    let temp = setInterval(() => {
      setValue((value) => value + 1);
    }, 1000);
    setTimer(temp);
    clockRef.current = temp;
  }

  function stopClock() {
    // clearInterval(timer); // causes re-render
    clearInterval(clockRef.current);
  }

  return (
    <div>
      <div
        style={{
          height: 50,
          width: 100,
          border: "1px solid gray",
          marginTop: "20px",
        }}
      >
        Time: {value}
      </div>

      <button
        onClick={() => startClock()}
        style={{ ...style, background: "#3f8f29" }}
      >
        START
      </button>
      <button
        onClick={() => stopClock()}
        style={{ ...style, background: "#de1a24" }}
      >
        STOP
      </button>
    </div>
  );
}

export default App;
