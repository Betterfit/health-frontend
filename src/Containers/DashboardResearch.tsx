import React from "react";
import ResourceDisplay from "Components/Resources/ResourceDisplay";
import { useQuery } from "react-query";
import Api from "Helpers/api";
import TagLink from "Components/Content/TagLink";
import Search from "Components/Search/Search";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import { Resource, Tag } from "Types";

const DashboardResearch = () => {
    const api = new Api();
    const {
        data: resources,
        isLoading: resourcesLoading,
    } = useQuery("resources", () =>
        api.getResources().then((resp: any) => resp.data)
    );
    const { data: tagList, isLoading: tagsLoading } = useQuery("tags", () =>
        api.getTags().then((resp: any) => resp.data)
    );
    if (resourcesLoading || tagsLoading) {
        return <div>Loading</div>;
    }

    const researchList = resources.filter(
        (resource: Resource) => resource.resource_type == "research"
    );
    return (
        <div className="resource-dashboard">
            <DashboardSideBar addonStyles={null}>
                <h2 className="text-3xl text-dark-blue my-3">Research</h2>
                <Search type="bar" />
                <div className="border-b border-gray-400 mt-5" />
                <div></div>
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">
                        Tags
                    </h3>
                    {tagList.map((tag: Tag) => {
                        return <TagLink tag={tag} />;
                    })}
                </div>
            </DashboardSideBar>
            <div className="resource-dashboard">
                {<ResourceDisplay resources={researchList as Resource[]} />}
            </div>
        </div>
    );
};

export default DashboardResearch;
