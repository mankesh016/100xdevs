import { DocumentIcon } from "../icons/DocumentIcon";
import { HashtagIcon } from "../icons/HashtagIcon";
import { LinkIcon } from "../icons/LinkIcon";
import VideoIcon from "../icons/VideoIcon";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 p-8 bg-white border-r border-gray-200">
      <img width="10px" src="../assets/vite.svg" alt="" />

      <div className="font-bold text-xl mb-3">Second Brain</div>

      <div className="flex flex-col gap-3">
        <div>
          {" "}
          <SidebarItem text="Links" startIcon={<LinkIcon size="md" />} />
        </div>
        <div>
          <SidebarItem
            text="Documents"
            startIcon={<DocumentIcon size="md" />}
          />
        </div>
        <div>
          <SidebarItem text="Videos" startIcon={<VideoIcon size="md" />} />
        </div>
        <div>
          <SidebarItem text="Hashtag" startIcon={<HashtagIcon size="md" />} />
        </div>
      </div>
    </div>
  );
};
