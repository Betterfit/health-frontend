import CardTitle from "Components/ResourceProfile/ResourceTitle";
import TagLink from "Components/Resources/TagLink";
import Translator from "Helpers/Translator";
import React from "react";
import { Tag } from "Types";

interface ResourceCardProps {
  name: string;
  color: string;
  children: React.ReactChildren;
  tagList: Tag[];
  type: string;
}

export const ResourceCard = ({
  name,
  color,
  children,
  tagList,
  type,
}: ResourceCardProps) => {
  return (
    <div role="dialog">
      <div
        className="h-1 rounded-md mb-5 -mx-4"
        style={{ background: color }}
      />
      <CardTitle
        label={Translator(type)}
        name={Translator(name)}
        color={color}
      />
      <div className="space-y-6">
        {children}
        {tagList.map((tag, i) => (
          <TagLink key={i} tag={tag} buttonProps={{ disabled: true }} />
        ))}
      </div>
    </div>
  );
};
