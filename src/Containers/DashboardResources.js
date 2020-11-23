import ListLink from "Components/Content/ListLink";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import ResourceDisplay from "Components/Resources/ResourceDisplay";
import TagFilterList from "Components/Resources/TagFilterList";
import SearchBar from "Components/Search/SearchBar";
import { useResources } from "Helpers/resourceUtils";
import Translator from "Helpers/Translator";
import React, { useState } from "react";
import Spinner from "Images/spinner.gif";

const DashboardResources = () => {
  // resources will be filtered by selected resource type
  const [selectedResType, setSelectedResType] = useState(null);
  const resourceFilters = [];
  const resourceTypeFilter = (resource) =>
    resource.resource_type === selectedResType;

  // the useResources hook handles caching, searching, filtering for us
  const {
    resourcesLoading,
    resources,
    setSearchTerm,
    selectedTagPKs,
    tagList,
    toggleTagSelect,
  } = useResources(resourceFilters);

  if (resourcesLoading) {
    return (
      <div className="relative w-full min-h-screen">
        <img
          className="absolute left-0 right-0 spinner"
          style={{ maxWidth: 150 }}
          src={Spinner}
        />
      </div>
    );
  }

  const resourceColors = {
    facility: "#56BAC8",
    lab: "#61C091",
    research: "#A799F3",
    supplier: "#EA8683",
    regulation: "#7FAAF4",
  };

  const onResTypeClick = (resType) => () => {
    if (selectedResType === resType) setSelectedResType(null);
    else setSelectedResType(resType);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden">
      <div style={{ flex: "0 0 320px" }}>
        <DashboardSideBar>
          <h2 className="text-3xl text-dark-blue my-3">{Translator("Resources")}</h2>
          <SearchBar
            performSearch={setSearchTerm}
            placeholderText={
              Translator("Search") + " " + Translator("Resources")
            }
          />
          <div className="border-b border-gray-400 mt-5" />
          <div>
            <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">
              Resource Type
            </h3>
            <div className="flex flex-col items-start">
              {Object.entries(resourceColors).map(
                ([resourceType, resourceColor]) => {
                  return (
                    <ListLink
                      bulletColor={resourceColor}
                      key={resourceType}
                      text={resourceType}
                      textStyle={{
                        textTransform: "capitalize",
                      }}
                      selected={resourceType === selectedResType}
                      toggleSelection={onResTypeClick(resourceType)}
                    />
                  );
                }
              )}
            </div>
          </div>
          <TagFilterList {...{ tagList, toggleTagSelect, selectedTagPKs }} />
        </DashboardSideBar>
      </div>

      <ResourceDisplay resources={resources} />
    </div>
  );
};

export default DashboardResources;
