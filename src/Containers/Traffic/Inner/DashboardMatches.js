import React , {useState,useEffect} from 'react'
import { ReactSVG } from 'react-svg';
import Table from 'Components/Table/MatchSort/Table';
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import BackNavigation from 'Components/Helpers/BackNavigation'
import Reload from 'Images/Icons/reload.svg';
import Countdown from 'react-countdown';
import Api from "Helpers/api";
import dayjs from 'dayjs';
import Spinner from "Images/spinner.gif";
import {useMatchStore} from "Context/matchContext";

const api = new Api();
const DashboardMatches = () => {
    const matchStore = useMatchStore();
    const [matchesData , setMatchesData] = useState(null);
    const [matchHeaderData , setMatchHeaderData] = useState({
        order_date:"",
        matches:"",
        time_till_processed: "" 
    });
    const [isLoading, setIsLoading] = useState(true);
    const [refresh , setRefresh] = useState(false);

    const getData = async () => await api.getMatches()
    .then((response) => {
        setMatchHeaderData({
            order_date:dayjs().format('MMM D , YYYY'),
            matches:`${response.data.total_matches}/${response.data.total_orders}`,
            time_till_processed:response.data.cutoff_time_2
        })
        let arr = response.data;
        // console.log(arr);
        arr = arr.matches.map(item => {
            let obj = {
                order_no: item.order_no,
                province: item.province,
                facility: item.facility,
                supplier: item.supplier !== "No match" ? item.supplier : null ,
                order_date: item.order_date,
                rank:item.rank,
                pk:item.pk
            }
            return(obj);
        }); 
        setMatchesData(arr)
        setIsLoading(false);
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getData();
    },[]); 

    const sortFunction = () => {
        if(matchStore.matches){
            matchStore.submitting = true;
            clearTimeout();
            setRefresh(true);
            setTimeout(()=>{
                setRefresh(false); 
                setIsLoading(true);
            },2500);
            let arr = JSON.parse(matchStore.matches);
            arr = arr.map((item,index) => {
                let obj = {
                    pk:item.id,
                    order:index,
                }
                return obj;
            });
            api.postSortedMatches(arr)
            .then((response) => {
                let arr = response.data;
                arr = arr.matches.map(item => {
                    let obj = {
                        order_no: item.order_no,
                        province: item.province,
                        facility: item.facility,
                        supplier: item.supplier !== "No match" ? item.supplier : null ,
                        order_date: item.order_date,
                        rank:item.rank,
                        pk:item.pk
                    }
                    return(obj);
                }); 
                setIsLoading(false);
                matchStore.submitting = false;
                setMatchesData(arr);

            })
        }
    } 

    

    const HeadingComponent = ({ title, value, classes, time }) => {
        if(time){
            // console.log(value);
            return (
                <div
                  className={
                    "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 items-end" +
                    (classes ? classes : "")
                  }
                >
                    <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">{title}</span>
                    <span className="text-betterfit-graphite text-base word break-words text-2xl">
                        <Countdown date={Date.parse(value)}></Countdown>
                    </span>
                </div>
            );
        }else{
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
        }
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
            order_date: "Oct 27, 2020",
            rank:99,
            pk:1
        },
    ]

    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            {/* heading */}
            {isLoading ? (
                <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
                <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
                </div>
            ) : ( 
            <>
                <div className="flex justify-between items-end">
                    <div>
                        <BackNavigation link={"Back to matches"} />
                        <HeadingComponentTitle  
                            value={`${matchHeaderData.order_date}`}
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end ">
                        <div className="flex flex-row mt-4 items-center">
                            <HeadingComponent
                                title="Matches"
                                value={matchHeaderData.matches}
                            />
                            <HeadingComponent
                                title="Time Till Processed"
                                value={matchHeaderData.time_till_processed}
                                time={true}
                            />
                            <button

                                type="submit"
                                className={`flex-0 rounded-md flex items-center no-wrap justify-center py-3 border border-transparent px-4
                                transition duration-150 ease-in-out capitalize uppercase text-lg text-bettfit-navy hover:opacity-75  focus:outline-none  bg-betterfit-pale-blue px-4 outline-none `
                                }
                                style={{minWidth:100, whiteSpace: 'nowrap'}}
                                onClick = {() => sortFunction()}
                            >   
                            {refresh ?(
                               <ReactSVG src={Reload} className={`flex items-center mr-3 rotate-me`}  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />

                            ) :(
                                <ReactSVG src={Reload} className={`flex items-center mr-3`}  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />

                            )}
                                Update Suppliers
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {matchesData && (
                        <Table 
                            TableData={matchesData} 
                            link={`/dashboard/matches/`} 
                        />
                    )}
                </div>
            </>
            )}      
        </div>
    )
}
export default DashboardMatches