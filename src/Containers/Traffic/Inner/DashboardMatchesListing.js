import React , {useState,useEffect} from 'react'
import Api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import Table from 'Components/Table/MatchListing/Table';
import Spinner from "Images/spinner.gif";
import dayjs from 'dayjs';
const api = new Api();
const DashboardMatchesListing = () => {

    const [matchesData , setMatchesData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const getData = async () => await api.getMatchHistory()
    .then((response) => {
        setIsLoading(false);
        let arr = response.data;
        arr = arr.map(item => {
            return{
                match_date : dayjs(item.match_date).format('MMMM D , YYYY'),
                number_of_orders: item.orders,
                status: item.status,
                item_url: item.url === "/matches/" ?  "/dashboard" + item.url + "current/" : "/dashboard" + item.url
            }
        })
        console.log(arr);
        setMatchesData(arr)
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
            {isLoading ? (
                <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
                    <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
                </div>
            ) : ( 
                <>
                    {matchesData && (
                        <Table 
                            TableData={matchesData} 
                            link={"validate"} 
                            extraClasses={'shortColumn'} 
                            buttonType="statusbutton" 
                        />
                    )}
                </>
            )}
        </div>
    )    
}
export default DashboardMatchesListing