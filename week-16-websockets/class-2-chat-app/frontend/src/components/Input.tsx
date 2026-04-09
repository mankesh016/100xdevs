import { memo } from "react";

export interface InputProps {
  ref: any;
}

export const Input = memo((props: InputProps) => {
  return (
    <div className="bg-white shadow-md rounded-md flex-1">
      <input
        ref={props.ref}
        className="w-full px-3 py-2 text-gray-500 outline-none"
        type="text"
        placeholder="Type something..."
      />
    </div>
  );
});
