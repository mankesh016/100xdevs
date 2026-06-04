"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onclick: () => void;
}

export const Button = ({ children, onclick }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      style={{
        padding: 10,
        margin: 10,
      }}
    >
      {children}
    </button>
  );
};
