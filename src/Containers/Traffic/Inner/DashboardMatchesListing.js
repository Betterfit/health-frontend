import React , {useState,useEffect} from 'react'
import Api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Table from 'Components/Table/MatchListing/Table';
const api = new Api();
const DashboardMatchesListing = () => {

    const [matchesData , setMatchesData] = useState(null);
    const getData = async () => await api.getMatchHistory()
    .then((response) => {
        console.log(response.data)
        setMatchesData(response.data)
    })
    .catch((err) => console.log(err));

    // console.log(JSON.stringify(ProductData))
    // uncomment when api is set up
    useEffect(() => {
        if(!matchesData){
            getData();
        }
    });
    

    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            <TitleUnderLine title="Matches"/>
            {matchesData && (
                <Table 
                    TableData={matchesData} 
                    link={"validate"} 
                    extraClasses={'shortColumn'} 
                    buttonType="statusbutton" 
                />
            )}
        </div>
    )    
}
export default DashboardMatchesListing