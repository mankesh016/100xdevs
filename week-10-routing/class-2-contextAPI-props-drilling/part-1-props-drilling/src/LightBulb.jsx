import { useState } from "react";

// Props Drilling
function LightBulb() {
  const [state, toggleState] = useState(false);

  return (
    <div>
      <Bulb state={state} />
      <Switch toggleState={toggleState} />
    </div>
  );
}

function Bulb({ state }) {
  return <div>{state ? "bulb on" : "bulb off"}</div>;
}

function Switch({ toggleState }) {
  function toggle() {
    toggleState((f) => !f);
  }
  return (
    <div>
      <button onClick={toggle}>Toggle State</button>
    </div>
  );
}

export default LightBulb;
