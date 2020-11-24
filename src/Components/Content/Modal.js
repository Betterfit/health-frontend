import React , {useState} from 'react';
import Button from "Components/Content/Button";

const Modal = ({cancelCallBack,confirmCallBack,children , buttonText}) => {
    return( 
        <div className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center z-30" style={{backgroundColor:'rgba(0,0,0,0.6)'}}>
            <div className="w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-white rounded shadow">
                <div>
                    {children}
                </div>
                <div className="flex w-full justify-between pt-4 border-t border-gray-300 items-center px-4 py-4">
                    <Button 
                        text={"Back"} 
                        color='white' 
                        extraClasses="border border-black text-betterfit-navy"
                        text_size="text-sm" 
                        solid={false}
                        onClick={cancelCallBack}
                    />
                    <Button 
                        text={buttonText} 
                        color='status-dark-green' 
                        extraClasses="px-10"
                        text_size="text-sm" 
                        onClick={confirmCallBack}
                    />
                </div>

            </div>  
        </div>
    )
}

export default Modal