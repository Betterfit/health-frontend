import React from "react";

interface SubtleLinkProps {
  text: string;
  path: string;
}
const SubtleLink = ({ path, text }: SubtleLinkProps) => {
  return (
    <a
      className="text-center font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
      href={path}
    >
      {text}
    </a>
  );
};

export default SubtleLink;
