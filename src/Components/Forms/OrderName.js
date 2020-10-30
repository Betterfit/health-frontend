import React,{useState} from 'react';
import CheckboxConfirm from 'Components/Forms/CheckboxConfirm';


const OrderName = () => {
    const [inputValue, setInputValue] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    <div>
        <div className="flex justify-between">
            <span className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 ">Purchase Order</span>
            <span className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 divide-opacity-75 ">Optional</span>
        </div>
        <input
          id={id_tag}
          type="number"
          class= {"py-2 pl-2 pr-2 form-input w-full text-base border-gray-400 border rounded shadow-inner focus:outline-none " + (readOnly ? readOnlyStyle : "" ) }
          value={value}
          placeholder="eg:#123456-AG"
          onChange={(e) => {

          }}
        />
        <Checkbox name="Agree To Terms" value={agreeTerms} setValue = {(val) => setPriority(val)}/>
    </div>
}
export default OrderName;
