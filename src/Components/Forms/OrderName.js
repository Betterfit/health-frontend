import React,{useState} from 'react';
import Translator from "Helpers/Translator";

const OrderName = ({name,callBack}) => {
    const [inputValue, setInputValue] = useState(name);
    return(
        <div className="px-6 mb-4">
            <div className="flex justify-between mb-1">
                <span className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 ">{Translator("Purchase Order")}</span>
                <span className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 divide-opacity-50 ">{Translator("Optional")}</span>
            </div>
            <label aria-label="order number" htmlFor="order-number"></label>
            <input
            id="order-number"
            type="text"
            className= {"py-2 pl-2 pr-2 form-input w-full text-base border-gray-400 border rounded shadow-inner focus:outline-none " }
            value={inputValue}
            placeholder="eg:#123456-AG"
            onChange={(e) => {
                setInputValue(e.target.value)
                callBack(e.target.value);
            }}
            />
        </div>
    )
}
export default OrderName;
