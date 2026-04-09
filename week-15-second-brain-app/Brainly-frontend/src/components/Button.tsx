import cn from "classnames";
import type { ReactElement } from "react";

export interface ButtonProps {
  type: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const varientStyles = {
  primary: "bg-purple-700 text-purple-100",
  secondary: "bg-purple-300 text-purple-500",
};

const defaultStyles = "rounded-md flex justify-center items-center";
const loadingStyles = "opacity-70";

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-xl",
};

const customPadding = {
  sm: "pr-1",
  md: "pr-2",
  lg: "pr-3",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={cn(
        varientStyles[props.type],
        defaultStyles,
        sizeStyles[props.size],
        { "w-full flex justify-center items-center": props.fullWidth },
        { [loadingStyles]: props.loading },
      )}
      disabled={props.loading}
      onClick={props.onClick}
    >
      {props.startIcon && (
        <div className={customPadding[props.size]}>{props.startIcon}</div>
      )}
      {props.text}
      {props.endIcon && (
        <div className={customPadding[props.size]}>{props.endIcon}</div>
      )}
    </button>
  );
};
