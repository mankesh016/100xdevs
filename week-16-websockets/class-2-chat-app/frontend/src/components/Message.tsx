import { memo } from "react";

export interface MessageProps {
  messages: string[];
}

export const Message = memo((props: MessageProps) => {
  return (
    <>
      {props.messages.map((message, index) => {
        return (
          <div
            className="bg-white text-gray-600 w-fit rounded-3xl px-4 py-1 shadow-sm"
            key={index}
          >
            {message}
          </div>
        );
      })}
    </>
  );
});
