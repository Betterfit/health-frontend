import React from 'react';
import { Link } from 'react-router-dom';
import LowerBackgroundBlob from "Images/Login/login_lower_right.svg";
import UpperBackgroundBlob from "Images/Login/login_upper_left.svg";

const NotFound = () => {
    return(
        <div className="min-h-screen bg-betterfit-basic-blue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <img
        src={UpperBackgroundBlob}
        role="presentation"
        className="absolute left-0 top-0 z-0"
        ></img>
        <img
        src={LowerBackgroundBlob}
        role="presentation"
        className="absolute right-0 bottom-0 z-0"
        ></img>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-50">
            <div className="bg-white px-12 m-2 sm:m-auto sm:w-5/6 shadow rounded-lg">
                <div className="sm:mx-auto sm:w-full sm:max-w-md pt-12 pb-10">
                <h2 className={`text-dark-blue text-3xl py-4 pb-6 mb-6`}>404 - Not Found!</h2>
                <Link className="text-betterfit-basic-blue uppercase text-xs" to="/">
                    Get Back On Track
                </Link>
            </div>
        </div>
    </div>
  </div>    
    )
};

export default NotFound;