import { useState } from "react";

// Conditionally Rendering
function Comp3() {
  return (
    <div>
      <ToggleMessage />
    </div>
  );
}

function ToggleMessage() {
  const [isVisible, toggle] = useState(true);

  function toggleVisiblity() {
    toggle((c) => !c);
  }
  return (
    <div>
      <button onClick={toggleVisiblity}>Toggle Visiblity</button>

      {isVisible ? (
        <div>this message is conditionally rendered</div>
      ) : (
        <div>hi</div>
      )}
    </div>
  );
}
export default Comp3;
