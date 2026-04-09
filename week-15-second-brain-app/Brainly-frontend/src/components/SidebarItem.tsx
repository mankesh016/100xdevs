import type { ReactElement } from "react";

export interface SidebarProps {
  text: string;
  startIcon: ReactElement;
}

export const SidebarItem = (props: SidebarProps) => {
  return (
    <div className="py-2 flex items-center">
      {<div className="pr-2">{props.startIcon}</div>}
      {props.text}
    </div>
  );
};
