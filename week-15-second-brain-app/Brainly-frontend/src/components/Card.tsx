import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";

export interface CardProps {
  type: "linkedin" | "youtube" | "link";
  title: string;
  link: string;
}

export const Card = (props: CardProps) => {
  return (
    <div className="bg-white border border-gray-300 shadow-sm rounded-md p-5 h-fit">
      <div className="flex justify-between items-center gap-2 pb-2">
        <div className="flex items-center gap-2">
          <DocumentIcon size="md" />
          <div>
            <b>{props.title}</b>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShareIcon size="md" />
          <DeleteIcon size="md" />
        </div>
      </div>

      <div className="pb-2 h-fit">
        {/* <iframe
          className="w-full rounded-md"
          src="https://www.youtube.com/embed/l6Nu4qS3MLQ?start=10&si=TF-UcHQqBTdJB1LU&amp;controls=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe> */}

        <iframe
          className="w-full h-96 max-h-64"
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7321242795367718912?collapsed=1"
          allowFullScreen
          title="Embedded post"
        ></iframe>
      </div>

      <div>Lorem ipsum dolor sit amet consectetu</div>

      <div className="text-gray-500 pt-5">Added on 31/03/2026</div>
    </div>
  );
};
