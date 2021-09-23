import TagLink from "Components/Resources/TagLink";
import Translator from "Helpers/Translator";
import React from "react";
import { Tag } from "Types";

interface TagFilterListProps {
  tagList: Tag[];
  toggleTagSelect: (tagPK: number) => void;
  selectedTagPKs: number[];
}

const TagFilterList = ({
  tagList,
  toggleTagSelect,
  selectedTagPKs = [],
}: TagFilterListProps) => {
  const onTagClick = (tagPK: number) => () => toggleTagSelect(tagPK);
  const { selectedTags, unselectedTags } = splitTagsBySelectionStatus(
    tagList,
    selectedTagPKs
  );

  return (
    <ul aria-label={Translator("Tag List")}>
      <h3 className="mb-4 md:mb-2 text-betterfit-graphite text-xs font-body m-2 pt-8 uppercase font-bold tracking-extra-wide opacity-50">
        {Translator("Tags")}
      </h3>
      {selectedTags.map((tag) => {
        return (
          <TagLink
            tag={tag}
            buttonProps={{ onClick: onTagClick(tag.pk) }}
            bold
            key={tag.pk}
          />
        );
      })}
      {unselectedTags.map((tag) => {
        return (
          <TagLink
            tag={tag}
            buttonProps={{ onClick: onTagClick(tag.pk) }}
            key={tag.pk}
          />
        );
      })}
    </ul>
  );
};

const splitTagsBySelectionStatus = (
  tagList: Tag[],
  selectedTagPKs: number[]
) => {
  const selectedTags: Tag[] = [];
  const unselectedTags: Tag[] = [];
  for (const tag of tagList) {
    if (selectedTagPKs.includes(tag.pk)) selectedTags.push(tag);
    else unselectedTags.push(tag);
  }
  return { selectedTags, unselectedTags };
};

export default TagFilterList;
