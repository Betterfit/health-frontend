import React, {useState, useEffect} from 'react';
import ListLink from 'Components/Content/ListLink';
import TagLink from 'Components/Content/TagLink';
import ResourceLink from 'Components/Content/ResourceLink';
import Search from 'Components/Search/Search';
import Api from "Helpers/api";
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';

const DashboardResources = () => {
    const api = new Api();
    const [title , setTitle] = useState('Resources');
    const [searchActive , setSearchActive] = useState(false);
    const [tagList, setTaglist] = useState([]);
    const [resourceList, setResourceList] = useState([]);
    const resourceTypes = {
        '1': ['#56BAC8', 'Health Care Provider'],
        '2': ['#61C091', 'Lab'],
        '3': ['#A799F3', 'Researcher'],
        '4': ['#EA8683', 'Supplier'],
        '5': ['#7FAAF4', 'Regulation'],
    }
    const [something, setSomething] = useState({});
    const getResourceList = async () =>
        await api
            .getResources()
            .then((response) => {
                const resourceListData = Object.entries(response.data);
                const resourceList = [];
                for (let i=0; i<resourceListData.length; i++) {
                    resourceList.push(resourceListData[i][1]);
                    console.log(resourceListData[i][1]);
                }
                setResourceList(resourceList);
            })
            .catch((err) => console.log(err));
    const getTagList = async () =>
        await api
            .getTags()
            .then((response) => {
                const tagListData = Object.entries(response.data);
                const tagList = [];
                for (let i=0; i<tagListData.length; i++) {
                    tagList.push(tagListData[i]['1'].pk);
                }
                setTaglist(tagList);
            })
            .catch((err) => console.log(err));
    useEffect(() => {
        getResourceList();
        getTagList();
      }, []);    
    const matchResourceColor = (type) => {
        return resourceTypes[type][0];
    };
    const matchResourceName = (type) => {
        return resourceTypes[type][1];
    };
    return (
        <div className="resource-dashboard">
            <DashboardSideBar>
                <h2 className="text-3xl text-dark-blue my-3">{title}</h2>
                <Search type="bar" />
                <div className="border-b border-gray-400 mt-5" />
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">Resource Type</h3>
                    {Object.entries(resourceTypes).map(([key, value]) => {
                        return(
                            <ListLink bulletColor={value[0]} text={value[1]} />
                        )
                    })}
                </div>
                <div>
                    <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body m-2 pt-8 uppercase font-bold tracking-widest">Tags</h3>
                    {tagList.map(p =>{
                        return(
                            <TagLink tagType={p} />
                        )
                    })}
                </div>
            </DashboardSideBar>
            <div className="flex-grow wrap max-h-screen p-4 h-full rounded-lg overflow-scroll">
                <div className="py-8">
                    {resourceList.map(resource =>{
                        return(
                            <div className="resource-container m-2 rounded-md cursor-pointer">
                                <ResourceLink resourceColor={matchResourceColor(resource.pk)} resourceType={matchResourceName(resource.pk)} resourceName={resource.title} tagList={resource.tags} resourceDetails={resource.details} resourceCode={resource.pk} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default DashboardResources