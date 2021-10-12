import React from "react";

const PrettyLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default PrettyLink;
