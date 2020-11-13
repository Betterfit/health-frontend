import React, { useContext } from "react";
import dayjs from 'dayjs';
import BackNavigation from 'Components/Helpers/BackNavigation'
import Translator from "Helpers/Translator";

const MatchHeaderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">{Translator(title)}</span>
      <span className="text-betterfit-graphite text-base word break-words">{value}</span>
    </div>
  );
};

const MatchHeaderComponentTitle = ({ value, classes }) => {
    return (
      <div
        className={
          "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " +
          (classes ? classes : "")
        }
      >
        <span className="text-betterfit-graphite text-3xl">{Translator(value)}</span>
      </div>
    );
  };


const MatchOrderDetailHeader = ({ order , actionComponent }) => {
  
  let orderDate = dayjs(order.order_date).format('MMM DD, YYYY');
  return (
    <div className="flex flex-col border-b pb-4 border-gray-400 relative">
        <BackNavigation link={"Back to Match"} />
        <MatchHeaderComponentTitle
        value={`#${order.order_number}`}
        />
        <div className="flex-col flex-row mt-4 md:w-3/4">
          <div className="flex-row flex mb-12 justify-between">
            <MatchHeaderComponent
                title="Order Creation Data"
                value={order.order_creation_date  }
            />
              {order.match_date && (
                <MatchHeaderComponent
                  title="Match Date"
                  value={order.match_date}
                />
              )}
              <MatchHeaderComponent
                  title="Unit"
                  value={order.unit}
              />
          </div>
          <div className="flex-row flex justify-between">
            <MatchHeaderComponent
                title="Address"
                value={order.shipping_address}
            />
            <MatchHeaderComponent
                title="Shipping Address"
                value={order.shipping_address}
            />
          </div>  
        </div>
        <div className="absolute top-0 right-0">
            {actionComponent}
        </div>
    </div>
  );
};
export default MatchOrderDetailHeader;
