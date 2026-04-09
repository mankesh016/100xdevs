import { useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "./Button";
import { Card } from "./Card";
import { CreateComponentModal } from "./CreateComponentModal";

const MainContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-screen p-10">
      <div className="flex justify-between items-center mb-5">
        <div>All Notes</div>
        <div className="flex gap-5">
          <Button
            startIcon={<ShareIcon size="md" />}
            type="secondary"
            size="md"
            text="Share Brain"
            onClick={() => {}}
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            type="primary"
            size="md"
            text="Add Content"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
      </div>

      <CreateComponentModal open={open} onClose={() => setOpen(false)} />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <Card title="Linkedin Post" type="linkedin" link="" />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
