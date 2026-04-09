import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL, CONTENT_TYPES } from "../config";

export interface CreateComponentModalProps {
  open: boolean;
  onClose: () => void;
}

// Controlled Component
export const CreateComponentModal = ({
  open,
  onClose,
}: CreateComponentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(CONTENT_TYPES.YOUTUBE);

  async function submit() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      BACKEND_URL + "/api/v1/content",
      {
        title: title,
        link: link,
        type: type,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
    );

    onClose();
  }

  return (
    <>
      {open && (
        <div>
          <div
            className="w-screen h-screen fixed left-0 top-0 bg-gray-500 opacity-70"
            onClick={() => onClose()}
          ></div>

          <div className="bg-white w-80 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex flex-col gap-4 m-4">
              <div className="flex justify-end">
                <div onClick={() => onClose()} className="cursor-pointer">
                  <CrossIcon size="lg" />
                </div>
              </div>

              <Input ref={titleRef} placeholder="Title" />
              <Input ref={linkRef} placeholder="Link" />

              <div className="flex gap-2 flex-wrap">
                {Object.entries(CONTENT_TYPES).map(([key, value]) => (
                  <Button
                    key={value}
                    size="sm"
                    type={type === value ? "primary" : "secondary"}
                    text={key.charAt(0) + key.slice(1).toLowerCase()}
                    fullWidth={false}
                    onClick={() => {
                      setType(value);
                    }}
                  />
                ))}
              </div>

              <Button
                size="md"
                type="primary"
                text="Submit"
                fullWidth={true}
                onClick={() => submit()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
