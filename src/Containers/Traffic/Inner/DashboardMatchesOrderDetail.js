import React , {useState,useEffect} from 'react'
import api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'


const DashboardMatchesOrderDetail = () => {

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

    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            <TitleUnderLine title="Matches"/>
        </div>
    )
}
export default DashboardMatchesOrderDetail