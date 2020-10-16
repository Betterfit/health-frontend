import React , {useState} from 'react';
import Button from "Components/Content/Button";

const Modal = ({cancelCallBack,confirmCallBack}) => {
    return( 
        <div className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center" style={{backgroundColor:'rgba(0,0,0,0.6)'}}>
            <div className="w-3/4 md:w-1/2 lg:w-3/5 bg-white rounded shadow px-6 py-6">
                <div className="flex w-full justify-between pt-4 border-t border-gray-300 items-center">
                    <Button 
                        text={"Back"} 
                        color='white' 
                        extraClasses="border border-black text-black"
                        text_size="text-sm" 
                        solid={false}
                        onClick={cancelCallBack}
                    />
                    <Button 
                        text={"Mark as Shipped"} 
                        color='status-dark-green' 
                        text_size="text-sm" 
                        onClick={confirmCallBack}
                    />
                </div>

            </div>  
        </div>
    )
}

export default Modal