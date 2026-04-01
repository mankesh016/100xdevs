import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/atom";

// npm install react@18 react-dom@18 recoil
// recoil working with react@18, react-dom@18
// A component re-renders itself and its childs

function App() {
  return (
    <>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  );
}

function Counter() {
  const value = useRecoilValue(counterAtom);

  return (
    <div style={{ marginTop: "20px" }}>
      Count: {value}
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
export default App;
