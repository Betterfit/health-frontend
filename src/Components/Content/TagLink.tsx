import Translator from "Helpers/Translator";
import React from "react";
import { Tag } from "Types";

interface TagLinkProps {
  tag: Tag;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  bold?: boolean;
}
const TagLink = ({ tag, buttonProps, bold }: TagLinkProps) => {
  return (
    <button {...buttonProps} className="my-2 mx-1">
      <div
        className="border-2 resource-tag font-black text-gray-700 uppercase tracking-widest"
        style={{
          background: tag.background_color,
          color: tag.main_color,
          borderColor: bold ? tag.main_color : "transparent",
        }}
      >
        {Translator(tag?.title)}
      </div>
    </button>
  );
};

export default TagLink;
