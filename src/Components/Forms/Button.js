import React from 'react'

const Button = ({text}) => 
    <span class="block w-full shadow-sm">
        <button type="submit" class="w-full flex justify-center py-4 border border-transparent text-lg font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase">
            {text}
        </button>
    </span>

export default Button