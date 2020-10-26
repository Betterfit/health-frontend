import React , {useState,useEffect} from 'react'
import api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import MatchOrderDetailHeader from 'Components/Order/MatchOrderDetailHeader'
import StatusButton from "Components/Content/StatusButton";
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

    const order = {
        order_creation_date: "Oct 14, 2020",
        order_number:"1001-2020-001237",
        match_date: "Oct 15, 2020",
        ordered_by: "Adrian Gyuricska",
        supplier: "Lift Medical",
        shipping_address: "10240 Kingsway NW, Edmonton, AB T5H 3V9",
        facility: "Royal Alexandra",
        unit: "Emergency",

    }

    const actionComponent = <StatusButton status="matched" /> ;
    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            <MatchOrderDetailHeader order={order} actionComponent={actionComponent} />
        </div>
    )
}
export default DashboardMatchesOrderDetail