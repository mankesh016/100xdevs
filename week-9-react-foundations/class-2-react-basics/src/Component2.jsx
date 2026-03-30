import { useEffect, useState } from "react";

// useState, useEffect, props, dependency array
function Component2() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  function countInc() {
    setCount((x) => x + 1);
  }
  function countDec() {
    setCount2((x) => x - 1);
  }
  return (
    <div>
      <b>Welcome to react app!</b>
      <Counter count={count} count2={count2} />
      <button onClick={countInc}>increase count</button>
      <button onClick={countDec}>decrese count2</button>

      <div style={{ marginTop: 20 }}>
        <em>Have a nice day!</em>
      </div>
    </div>
  );
}

// mounting, re-rendering, unmounting
function Counter(props) {
  useEffect(() => {
    console.log("count changed");
    return () => {
      console.log("unmounting old count");
    };
  }, [props.count]);

  useEffect(() => {
    console.log("count2 changed");
    return () => {
      console.log("unmounting old count2");
    };
  }, [props.count2]);

  return (
    <div>
      <h3>{props.count}</h3>
      <h3>{props.count2}</h3>
    </div>
  );
}

export default Component2;
