import clsx from "clsx";
import Translator from "Helpers/Translator";
import LeftArrow from "Images/Icons/left-arrow.svg";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";

const BackNavigation = ({
  link,
  onClickOverride,
  className,
}: {
  link: string;
  onClickOverride?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  const history = useHistory();
  const action = onClickOverride ? onClickOverride : () => history.goBack();
  return (
    <button
      onClick={action}
      className={clsx(
        className,
        "flex flex-row items-center cursor-pointer mb-2 ml-0 mr-auto"
      )}
    >
      <ReactSVG
        src={LeftArrow}
        className=" text-betterfit-basic-blue "
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 15px;");
        }}
      />
      <span className="ml-2 text-betterfit-basic-blue uppercase text-xs font-semibold">
        {Translator(link)}
      </span>
    </button>
  );
};
export default BackNavigation;
