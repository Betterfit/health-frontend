import React , {useState} from 'react'

// compontent example! feel free to delete if not needed

const InputButton = ({backgroundColor}) => {
    const bgc = backgroundColor ? backgroundColor : 'blue';
    const error = "error!";
    return(
        <>
        {error &&
            <div> {error} </div>
        }
        <input class={bgc} type="submit" value="Submit" />
        </>
    )
}