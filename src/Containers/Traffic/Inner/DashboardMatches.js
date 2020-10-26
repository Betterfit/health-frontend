import React , {useState,useEffect} from 'react'
import Api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Table from 'Components/Table/List/Table';
const api = new Api();
const DashboardMatches = () => {

    const [matchesData , setMatchesData] = useState(null);
    const getData = async () => await api.getMatches()
    .then((response) => {
        setMatchesData(response.data)
    })
    .catch((err) => console.log(err));

    // console.log(JSON.stringify(ProductData))
    // uncomment when api is set up
    // useEffect(() => {
    //     if(!matchesData){
    //         getData();
    //     }
    // });
    
    const matchData = [
        {
            match_dates: "October 18th 2020",
            number_of_orders: 135,
            status:"collecting",
            pk:1
        },
        {
            match_dates: "October 17th 2020",
            number_of_orders: 405,
            status:"closed",
            pk:1
        },
    ]

    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            <TitleUnderLine title="Matches"/>
            <Table 
                TableData={matchData} 
                link={'/dashboard/matches/'} 
                extraClasses={'shortColumn'} 
                buttonType="statusbutton" 
            />
        </div>
    )    
}
export default DashboardMatches