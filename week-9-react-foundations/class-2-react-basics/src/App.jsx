import { useEffect, useState } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";

// useState, useEffect, conditional rendering
function App() {
  return (
    <div>
      <Component2 />
      <hr />
      <Component1 />
    </div>
  );
}

export default App;
