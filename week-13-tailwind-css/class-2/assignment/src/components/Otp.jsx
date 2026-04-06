import { useEffect, useRef } from "react";

// TODO
function Otp() {
  const ref = useRef([]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-blue-700">
        <div className="text-white">Enter Otp</div>
        <div>
          {Array(5)
            .fill(1)
            .map((x, index) => (
              <InputBox
                index={index}
                ref={(el) => (ref.current[index] = el)}
                onDone={(e) => {
                  console.log("focus", ref.current[index].value);
                  if (index < 4 && ref.current[index].value)
                    ref.current[index + 1].focus();
                }}
                onKeydown={(e) => {
                  if (e.key === "Backspace") {
                    if (index > 0 && !ref.current[index].value) {
                      ref.current[index - 1].focus();
                      //   ref.current[index].value = "";
                    }
                  }
                }}
              />
            ))}
        </div>
        <Button disabled={true} onClick={() => {}}>
          Verify Otp
        </Button>
      </div>
    </>
  );
}

const InputBox = ({ index, ref, onDone, onKeydown, onBack }) => {
  return (
    <input
      key={index}
      ref={ref}
      type="text"
      onChange={onDone}
      onKeyDown={onKeydown}
      className="h-10 w-10 p-2 m-2 bg-blue-500 rounded-md"
    />
  );
};

const Button = ({ disabled, children, onClick }) => {
  return (
    <span
      className={`flex justify-center items-center w-60 h-10 rounded-lg text-white ${disabled ? "bg-blue-300" : "bg-green-300"}`}
      onClick={() => onClick()}
    >
      {children}
    </span>
  );
};
export default Otp;
