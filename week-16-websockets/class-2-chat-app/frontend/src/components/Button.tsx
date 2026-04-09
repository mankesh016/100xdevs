import { memo } from "react";

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = memo((props: ButtonProps) => {
  return (
    <div
      className="bg-blue-400 text-white rounded-md cursor-pointer px-3 py-1 shadow-md flex justify-center items-center"
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
});
