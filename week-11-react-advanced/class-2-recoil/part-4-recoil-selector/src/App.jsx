import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom, evenSelector } from "./store/atom/atom";

// Selectors in Recoil
// npm install react@18 react-dom@18 recoil
// recoil working with react@18, react-dom@18
// A component re-renders itself and its childs

function App() {
  return (
    <>
      <RecoilRoot>
        <Counter />
        <Increase />
        <Decrease />
        <Message />
      </RecoilRoot>
    </>
  );
}

function Counter() {
  const value = useRecoilValue(counterAtom);
  const isEven = useRecoilValue(evenSelector);

  return (
    <div style={{ marginTop: "20px" }}>
      Count: {value}
      <div>{isEven ? "even" : "odd"}</div>
    </div>
  );
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <div>
      <button onClick={() => setCount((x) => x + 1)}>Increase</button>
    </div>
  );
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <div>
      <button onClick={() => setCount((x) => x - 1)}>Decrease</button>
    </div>
  );
}
function Message() {
  return (
    <div style={{ fontStyle: "italic", fontSize: "12px" }}>
      Inspect elements and see which components re-render with help 'React
      Developer Tools' Extension!
    </div>
  );
}
export default App;
