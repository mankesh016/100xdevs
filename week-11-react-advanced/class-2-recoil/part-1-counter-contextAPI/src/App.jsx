import { useState, useContext, createContext } from "react";
const CounterContext = createContext();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CounterContext.Provider value={{ count, setCount }}>
        <Counter />
      </CounterContext.Provider>
    </>
  );
}

function Counter() {
  const { count } = useContext(CounterContext);
  return (
    <div>
      Count: {count}
      <Increase />
      <Decrease />
      <div style={{ fontStyle: "italic", fontSize: "12px" }}>
        Inspect elements and see which components re-render with help 'React
        Developer Tools' Extension!
      </div>
    </div>
  );
}

function Increase() {
  const { setCount } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => setCount((x) => x + 1)}>Increase</button>
    </div>
  );
}

function Decrease() {
  const { setCount } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => setCount((x) => x - 1)}>Decrease</button>
    </div>
  );
}

export default App;
