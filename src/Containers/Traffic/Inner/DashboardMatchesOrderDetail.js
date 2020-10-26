import React , {useState,useEffect} from 'react'
import Api from "Helpers/api";
import TitleUnderLine from 'Components/Content/TitleUnderLine'
import MatchOrderDetailHeader from 'Components/Order/MatchOrderDetailHeader'
import StatusButton from "Components/Content/StatusButton";
import Table from "Components/Table/Detail/Table";

const api = new Api();
const DashboardMatchesOrderDetail = (props) => {
    const { match } = props;
    const MatchOrderId = parseInt(match.params.oid);
    const [orderData , setOrderData] = useState(null);
    const getData = async () => await api.getSupplierTicketOrder(1,1)
    .then((response) => {
        let arr = response.data.order.order_products;
        arr = arr.map(item => {
            let obj = {
                product_image: item.product_option.product_image,
                item: item.product_option.name,  
                ...item.product_option,
                priority: 1,
            };
            return obj;
        });
        setOrderData(arr)
    })
    .catch((err) => console.log(err));

    useEffect(() => {
        getData();
    }, []);

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
    const excludeKeys = ["pk","product_image","name","product_variation"];
    const excludeValues = ["pk","product_variation","name"];
    return(
        <div className="px-4 sm:px-6 md:px-8 pt-10">
            {orderData && (
                <>
                    <MatchOrderDetailHeader order={order} actionComponent={actionComponent} />
                    <Table TableData={orderData} excludeKeys={excludeKeys} excludeValues={excludeValues} />
                </>
            )}
        </div>
    )
}
export default DashboardMatchesOrderDetail