import { useState } from "react";
import { useQuery } from "react-query";
import { Resource, Tag } from "Types";
import Api from "./api";

type ResourceFilter = (resource: Resource) => boolean;

/**
 * This hook simplifies the fetching, searching and filtering of resources.
 * @param customFilters A list of filters to apply in addition to search and tag matching
 */
export const useResources = (customFilters: ResourceFilter[] = []) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    // stores tag pks (primary key) rather than whole tag
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const api = new Api();
    const { data, isLoading: resourcesLoading } = useQuery<Resource[]>(
        // the key is the combination of 'resources' and the search term, used for caching
        ["resources", searchTerm],
        async () =>
            await api.getResources(searchTerm).then((resp: any) => resp.data),
        { placeholderData: [], keepPreviousData: true }
    );
    const resources = data as Resource[];
    // For each resource, check that it passes every custom filter specified.
    const filteredResources: Resource[] = resources.filter((resource) =>
        customFilters.every((filter) => filter(resource))
    );
    // filters out resources that don't match every selected tag
    const tagMatchingResources = findResourcesMatchingTagPKList(
        filteredResources,
        selectedTags
    );

    const toggleTagSelect = (tag: Tag) => {
        if (selectedTags.includes(tag.pk))
            setSelectedTags(selectedTags.filter((tagPK) => tagPK === tag.pk));
        else setSelectedTags([...selectedTags, tag.pk]);
    };

    return {
        resources: tagMatchingResources,
        resourcesLoading,
        setSearchTerm,
        searchTerm,
        toggleTagSelect,
        selectedTags,
    };
};

const findResourcesMatchingTagPKList = (
    resources: Resource[],
    tagPKs: number[]
): Resource[] => {
    if (tagPKs.length === 0) return resources;
    const matchingResources = [];
    // not the nicest time complexity but tagPKs will normally be quite small
    for (const resource of resources) {
        for (const tag of resource.tags) {
            if (tagPKs.includes(tag.pk)) matchingResources.push(resource);
        }
    }
    return matchingResources;
};

/**
 * Returns a list (without duplicates) of all tags found in a list of resources
 */
export const findAllUniqueTags = (resources: Resource[]): Tag[] => {
    const uniqueTags = [];
    const tagPKs = new Set();
    for (const resource of resources) {
        for (const tag of resource.tags) {
            if (!tagPKs.has(tag.pk)) {
                tagPKs.add(tag.pk);
                uniqueTags.push(tag);
            }
        }
    }
    return uniqueTags;
};
