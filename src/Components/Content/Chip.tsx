import React from "react";

interface ChipProps {
  text: string;
  onDelete: () => void;
}

/**
 * Displays a short string with an x button.
 */
const Chip = ({ text, onDelete }: ChipProps) => {
  return (
    <div className="flex justify-between max-w-md border-solid border-4 rounded-lg p-1 m-1">
      <p>{text}</p>
      <button onClick={onDelete} className="pl-2">
        ✖
      </button>
    </div>
  );
};

export default Chip;
