import React from "react";
import Translator from "Helpers/Translator";

const ProfileCard = ({ label, name }) => {
  return (
    <header className="pb-6 flex flex-col items-start justify-between border-b-2 border-grey-700 mb-8">
      <span className="uppercase text-betterfit-basic-blue text-xs tracking-extra-wide  font-semibold">
        {Translator(label)}
      </span>
      <h2 className="text-2xl font-medium text-betterfit-graphite">{name}</h2>
    </header>
  );
};

export default ProfileCard;
