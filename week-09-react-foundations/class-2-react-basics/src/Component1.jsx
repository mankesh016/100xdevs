import { useEffect, useState } from "react";

// useState, useEffect, conditional rendering
function Component1() {
  const [isVisible, toggleVisible] = useState(true);

  useEffect(() => {
    setInterval(() => {
      toggleVisible((vis) => !vis);
    }, 5000);
  }, []);

  return (
    <div>
      <b>Welcome to react app!</b>
      <div>
        <em>
          Conditional Rendering: Counter visiblity toggles in every 5 secs!
        </em>
      </div>
      {isVisible ? <Counter /> : null}
      <b>See you!</b>
      <div>
        <em>Check logs!</em>
      </div>
    </div>
  );
}

// mounting, re-rendering, unmounting
function Counter() {
  const [count, setCount] = useState(0);
  // re-rendering

  useEffect(() => {
    console.log("mount");

    let clock = setInterval(() => {
      console.log("inside setInterval");
      setCount((cnt) => cnt + 1);
    }, 1000);

    return () => {
      console.log("unmount");
      clearInterval(clock);
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>counter</button>
    </div>
  );
}

export default Component1;
