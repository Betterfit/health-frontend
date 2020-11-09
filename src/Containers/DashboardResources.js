import React, { useState, useEffect } from "react";
import ListLink from "Components/Content/ListLink";
import TagLink from "Components/Content/TagLink";
import ResourceLink from "Components/Content/ResourceLink";
import Search from "Components/Search/Search";
import Api from "Helpers/api";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import { useQuery } from "react-query";
import ResourceDisplay from "Components/Resources/ResourceDisplay";

const DashboardResources = () => {
    const [title, setTitle] = useState("Resources");
    const api = new Api();
    // react-query allows us to automatically do some pretty nifty caching
    const {
        data: resources,
        isLoading: resourcesLoading,
    } = useQuery("resources", () =>
        api.getResources().then((resp) => resp.data)
    );
    const { data: tagList, isLoading: tagsLoading } = useQuery("tags", () =>
        api.getTags().then((resp) => resp.data)
    );
    if (resourcesLoading || tagsLoading) {
        return <div>Loading</div>;
    }

    const resourceColors = {
        facility: "#56BAC8",
        lab: "#61C091",
        research: "#A799F3",
        supplier: "#EA8683",
        regulation: "#7FAAF4",
    };

    return (
        <div className="resource-dashboard">
            <DashboardSideBar>
                <h2 className="text-3xl text-dark-blue my-3">{title}</h2>
                <Search type="bar" />
                <div className="border-b border-gray-400 mt-5" />
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">
                        Resource Type
                    </h3>
                    {Object.entries(resourceColors).map(
                        ([resourceTitle, resourceColor]) => {
                            return (
                                <ListLink
                                    bulletColor={resourceColor}
                                    text={resourceTitle}
                                    textStyle={{ textTransform: "capitalize" }}
                                />
                            );
                        }
                    )}
                </div>
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">
                        Tags
                    </h3>
                    {tagList.map((tag) => {
                        return <TagLink tag={tag} />;
                    })}
                </div>
            </DashboardSideBar>

            <div className="resource-dashboard">
                <ResourceDisplay resources={resources} />
            </div>
        </div>
    );
};

export default DashboardResources;
