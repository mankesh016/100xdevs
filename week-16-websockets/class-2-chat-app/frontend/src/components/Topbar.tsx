import { memo } from "react";

export interface TopbarProps {
  roomId: number;
}
export const Topbar = memo((props: TopbarProps) => {
  return (
    <>
      <div className="text-white font-bold text-3xl font-mono">
        Room:{props.roomId}
      </div>

      <div className="text-white font-mono italic text-sm">
        Open in two different tabs and chat
      </div>
    </>
  );
});
