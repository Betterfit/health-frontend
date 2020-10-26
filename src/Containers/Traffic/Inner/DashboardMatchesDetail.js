import React , {useState,useEffect} from 'react'
import { ReactSVG } from 'react-svg';
import Table from 'Components/Table/List-sort/Table';
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import BackNavigation from 'Components/Helpers/BackNavigation'
import Reload from 'Images/Icons/reload.svg';
import Api from "Helpers/api";

const api = new Api();
const DashboardMatchesDetail = (props) => {
    const { match } = props;
    const matchId = parseInt(match.params.id);
    const [matchesData , setMatchesData] = useState({
        order_date:"October 18, 2020",
        matches:"11/12",
        time_till_processed: "2:32:04"
    });
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

    

    const HeadingComponent = ({ title, value, classes }) => {
        return (
          <div
            className={
              "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 items-end" +
              (classes ? classes : "")
            }
          >
            <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">{title}</span>
            <span className="text-betterfit-graphite text-base word break-words text-2xl">{value}</span>
          </div>
        );
    };

    const HeadingComponentTitle = ({ value, classes }) => {
        return (
          <div
            className={
              "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " +
              (classes ? classes : "")
            }
          >
            <span className="text-betterfit-graphite text-3xl">{value}</span>
          </div>
        );
    };

    const matchData = [
        {
            match_number: "1001-2020-001242",
            province: "AB",
            facility:"Royal Alexandra Ho...",
            supplier: "Air Liquide",
            order_date: "Oct 15, 2020",
            rank:99,
            pk:1
        },
        {
            match_number: "1001-2020-021246",
            province: "AB",
            facility:"Grey Nuns Hospital",
            supplier: "Lift Medical",
            order_date: "Oct 15, 2020",
            rank:99,
            pk:2
        },
        {
            match_number: "2001-2020-221249",
            province: "AB",
            facility:"Grey Nuns Hospital",
            supplier: "Lift Medical",
            order_date: "Oct 15, 2020",
            rank:53,
            pk:3
        },
        {
            match_number: "4201-2020-25340",
            province: "AB",
            facility:"Grey Nuns Hospital",
            supplier: "Lift Medical",
            order_date: "Oct 15, 2020",
            rank:103,
            pk:4
        },
    ]

    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            {/* heading */}
            <div className="flex justify-between items-end">
                <div>
                    <BackNavigation link={"Back to matches"} />
                    <HeadingComponentTitle  
                        value={`${matchesData.order_date}`}
                    />
                </div>
                <div class="w-full md:w-1/2 flex justify-end ">
                    <div className="flex flex-row mt-4 items-center">
                        <HeadingComponent
                            title="Matches"
                            value={matchesData.matches}
                        />
                        <HeadingComponent
                            title="Time Till Processed"
                            value={matchesData.time_till_processed }
                        />
                        <button
                            // onClick={ onClick }
                            type="submit"
                            className={`flex-0 rounded-md flex items-center no-wrap justify-center py-3 border border-transparent px-4
                            transition duration-150 ease-in-out capitalize uppercase text-lg text-bettfit-navy bg-betterfit-pale-blue px-4`
                            }
                            style={{minWidth:100}}
                        >
                            <ReactSVG src={Reload} className="flex items-center mr-3"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                            Update Suppliers
                        </button>
                    </div>
                </div>
            </div>
            {/* end heading */}
            <div>
                <Table 
                    TableData={matchData} 
                    link={`/dashboard/matches/${matchId}/`} 
                />
            </div>

        </div>
    )
}
export default DashboardMatchesDetail