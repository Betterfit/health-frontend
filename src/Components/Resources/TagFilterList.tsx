import TagLink from "Components/Content/TagLink";
import React from "react";
import { Tag } from "Types";

interface TagFilterListProps {
    tagList: Tag[];
    toggleTagSelect: (tag: Tag) => void;
}

const TagFilterList = ({ tagList, toggleTagSelect }: TagFilterListProps) => {
    return (
        <div>
            <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">
                Tags
            </h3>
            {tagList.map((tag) => {
                return <TagLink tag={tag} />;
            })}
        </div>
    );
};

export default TagFilterList;
