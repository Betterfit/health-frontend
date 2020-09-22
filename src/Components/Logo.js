import React from 'react'
import logo from '../Images/logo.png'

const Logo = ({size}) => 
 //Eventually we can have pre determined sizes of logos 
 <div class="sm:mx-auto sm:w-full sm:max-w-md pt-20 pb-10">
    <img class="mx-auto h-20 w-auto" src={logo} alt="Betterfit Logo"/> 
</div>

export default Logo