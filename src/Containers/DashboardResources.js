import ListLink from "Components/Content/ListLink";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import ResourceDisplay from "Components/Resources/ResourceDisplay";
import TagFilterList from "Components/Resources/TagFilterList";
import SearchBar from "Components/Search/SearchBar";
import Api from "Helpers/api";
import { useResources } from "Helpers/resourceUtils";
import React from "react";

const DashboardResources = () => {
    const api = new Api();
    // the useResources hook handles caching, searching, filtering for us
    const {
        resourcesLoading,
        resources,
        setSearchTerm,
        selectedTagPKs,
        tagList,
        toggleTagSelect,
    } = useResources([]);
    if (resourcesLoading) return <div>Loading</div>;

    const resourceColors = {
        facility: "#56BAC8",
        lab: "#61C091",
        research: "#A799F3",
        supplier: "#EA8683",
        regulation: "#7FAAF4",
    };

    return (
        <div className="flex flex-col md:flex-row overflow-x-hidden">
            <div style={{ flex: "0 0 320px" }}>
                <DashboardSideBar>
                    <h2 className="text-3xl text-dark-blue my-3">Resources</h2>
                    <SearchBar
                        performSearch={setSearchTerm}
                        placeholderText="Search Resources"
                    />
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
                                        textStyle={{
                                            textTransform: "capitalize",
                                        }}
                                    />
                                );
                            }
                        )}
                    </div>
                    <TagFilterList
                        {...{ tagList, toggleTagSelect, selectedTagPKs }}
                    />
                </DashboardSideBar>
            </div>

            <ResourceDisplay resources={resources} />
        </div>
    );
};

export default DashboardResources;
