import { useEffect } from "react";
import { useRef } from "react";

export function usePrev(value) {
  const ref = useRef();
  console.log("above: ", ref.current);

  useEffect(() => {
    console.log("before: ", ref.current);
    ref.current = value;
    console.log("after: ", ref.current);
  });
  console.log("below: ", ref.current);

  return ref.current;
}
