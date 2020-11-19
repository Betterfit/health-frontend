import React from "react";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import AddResearch from "Components/Resources/AddResearch";
import ResourceDisplay from "Components/Resources/ResourceDisplay";
import TagFilterList from "Components/Resources/TagFilterList";
import SearchBar from "Components/Search/SearchBar";
import Api from "Helpers/api";
import { useResources } from "Helpers/resourceUtils";
import { Resource, Tag } from "Types";
import Translator from "Helpers/Translator";
import Spinner from "Images/spinner.gif";

const DashboardResearch = () => {
  const api = new Api();
  // filters out
  const researchFilter = (resource: Resource) =>
    resource.resource_type === "research";
  const {
    resourcesLoading,
    resources,
    setSearchTerm,
    selectedTagPKs,
    tagList,
    toggleTagSelect,
  } = useResources([researchFilter]);

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

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden">
      <div style={{ flex: "0 0 320px" }}>
        <DashboardSideBar addonStyles={null}>
          <h2 className="text-3xl text-dark-blue my-3">
            {Translator("Research")}
          </h2>
          <SearchBar
            performSearch={setSearchTerm}
            placeholderText={
              Translator("Search") + " " + Translator("Research")
            }
          />
          <div className="border-b border-gray-400 mt-5" />
          <div className="mt-2">
            <AddResearch />
          </div>
          <TagFilterList {...{ tagList, toggleTagSelect, selectedTagPKs }} />
        </DashboardSideBar>
      </div>
      <ResourceDisplay resources={resources as Resource[]} />
    </div>
  );
};

export default DashboardResearch;
