import { createContext, useContext, useState } from "react";

// Context API
const BulbContext = createContext();

function LightBulb() {
  const [state, toggleState] = useState(false);

  return (
    <div>
      <BulbContext.Provider value={{ state, toggleState }}>
        <Bulb />
        <Switch />
      </BulbContext.Provider>
    </div>
  );
}

function Bulb() {
  const data = useContext(BulbContext);
  return <div>First Bulb: {data.state ? "On" : "Off"}</div>;
}

function Switch() {
  const data = useContext(BulbContext);
  function toggle() {
    data.toggleState((f) => !f);
  }
  return (
    <div>
      <button onClick={toggle}>Toggle State</button>
    </div>
  );
}

export default LightBulb;
