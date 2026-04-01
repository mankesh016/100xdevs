import { createContext, useContext, useState } from "react";

// Context API
// Cleaner Syntax
const BulbContext = createContext();

function BulbProvider({ children }) {
  const [state, toggleState] = useState(false);

  return (
    <BulbContext.Provider value={{ state, toggleState }}>
      {children}
    </BulbContext.Provider>
  );
}

function LightBulb2() {
  return (
    <div>
      <BulbProvider>
        <Bulb />
        <Switch />
      </BulbProvider>
    </div>
  );
}

function Bulb() {
  const data = useContext(BulbContext);
  return <div>Second Bulb: {data.state ? "On" : "Off"}</div>;
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

export default LightBulb2;
