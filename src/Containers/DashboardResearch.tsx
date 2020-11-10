import React from "react";
import ResourceDisplay from "Components/Resources/ResourceDisplay";
import { useQuery } from "react-query";
import Api from "Helpers/api";
import TagLink from "Components/Content/TagLink";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import AddResearch from "Components/Resources/AddResearch";
import { Resource, Tag } from "Types";
import useResources from "Helpers/useResources";
import SearchBar from "Components/Search/SearchBar";

const DashboardResearch = () => {
    const api = new Api();
    // filters out
    const researchFilter = (resource: Resource) =>
        resource.resource_type === "research";
    const { resourcesLoading, resources, setSearchTerm } = useResources([
        researchFilter,
    ]);
    const { data: tagList, isLoading: tagsLoading } = useQuery("tags", () =>
        api.getTags().then((resp: any) => resp.data)
    );
    if (resourcesLoading || tagsLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="flex flex-col md:flex-row overflow-x-hidden">
            <DashboardSideBar addonStyles={null}>
                <h2 className="text-3xl text-dark-blue my-3">Research</h2>
                <SearchBar performSearch={setSearchTerm} />
                <div className="border-b border-gray-400 mt-5" />
                <div className="mt-2">
                    <AddResearch />
                </div>
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest ">
                        Tags
                    </h3>
                    {tagList.map((tag: Tag) => {
                        return <TagLink tag={tag} key={"tag" + tag.pk} />;
                    })}
                </div>
            </DashboardSideBar>
            {<ResourceDisplay resources={resources as Resource[]} />}
        </div>
    );
};

export default DashboardResearch;
