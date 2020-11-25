import React , {useState,useEffect} from 'react'
import Api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import MatchOrderDetailHeader from 'Components/Order/MatchOrderDetailHeader'
import StatusButton from "Components/Content/StatusButton";
import Table from "Components/Table/Detail/Table";
import Spinner from "Images/spinner.gif";
import dayjs from 'dayjs';
const api = new Api();
const DashboardMatchesOrderDetail = (props) => {
    const { match } = props;
    const orderId = parseInt(match.params.id);
    const [orderData , setOrderData] = useState(null);
    const [orderHeader , setOrderHeader] = useState({
        order_creation_date: "",
        order_number:"",
        match_date: "",
        ordered_by: "",
        supplier: "",
        shipping_address: "",
        facility: "",
        unit: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const getData = async () => await api.getOrder(orderId)
    .then((response) => {
        const data = response.data;
        console.log(data);
        let arr = response.data.order_products;
        arr = arr.map(item => {
            let option = item.product_option.option_label;
            let obj = {
                product_image: item.product_option.product_image,
                item: item.product_option.product +' - '+ item.product_option.product_variation,  
                [option]:item.product_option.name ,
                quantity: item.quantity,
                supplier_availability: item.product_option.quantity,
                priority: item.priority,
            };
            return obj;
        });
        setIsLoading(false);
        setOrderData(arr)
        setOrderHeader({
            order_creation_date: dayjs(data.order_date).format('MMM d, YYYY'),
            order_number:data.order_no,
            match_date: data.match_date !== "No match date" ? dayjs(data.order_date).format('MMM d, YYYY') : "No match date",
            ordered_by: data.facility.name,
            facility: data.facility.name,
            address: data.facility.street ? `${data.facility.street}, ${data.facility.city}, ${data.facility.postal_code}` : null,
            shipping_address: data.facility.shipping_street ? `${data.facility.shipping_street}, ${data.facility.shipping_city}, ${data.facility.shipping_postal_code}` : null
        })
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getData();
    }, []);

    const actionComponent = <StatusButton status={`${orderHeader.match_date !== "No match date" ? "matched" : "no-match"}`} /> ;
    const excludeKeys = ["pk","product_image"];
    const excludeValues = ["pk"];
    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            {isLoading ? (
                <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
                    <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
                </div>
            ) : ( 
                <>
                    {orderData && (
                        <>
                            <MatchOrderDetailHeader order={orderHeader} actionComponent={actionComponent} />
                            <Table TableData={orderData} excludeKeys={excludeKeys} excludeValues={excludeValues} />
                        </>
                    )}
                </>
            )}
        </div>
    )
}
export default DashboardMatchesOrderDetail