import React from "react";
import { useHistory } from "react-router-dom";

type SubtleLinkProps = { text: string } & (
  | // either path or onClick is set, but never both
  {
      path: string;
      onClick?: never;
    }
  | {
      path?: never;
      onClick: () => void;
    }
);
const SubtleLink = ({ text, ...props }: SubtleLinkProps) => {
  const history = useHistory();
  return (
    <button
      className="text-center font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
      onClick={props.onClick ? props.onClick : () => history.push(props.path)}
    >
      {text}
    </button>
  );
};

export default SubtleLink;
