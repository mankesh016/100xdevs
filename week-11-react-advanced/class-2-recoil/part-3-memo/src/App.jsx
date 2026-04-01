import { useState, memo } from "react";

// memo
function App() {
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Counter />
      </div>
      <div style={{ fontStyle: "italic", fontSize: "12px" }}>
        Inspect elements and see which components re-render with help 'React
        Developer Tools' Extension!
      </div>
    </>
  );
}

function Counter() {
  const [value, setValue] = useState(0);

  return (
    <div>
      Count: {value}
      <Increase setValue={setValue} />
      <Decrease setValue={setValue} />
    </div>
  );
}

const Increase = memo(({ setValue }) => {
  return (
    <div>
      <button onClick={() => setValue((c) => c + 1)}>Increase</button>
    </div>
  );
});

const Decrease = memo(({ setValue }) => {
  return (
    <div>
      <button onClick={() => setValue((c) => c - 1)}>Decrease</button>
    </div>
  );
});

export default App;
