import React from 'react'
import Button from '../Button'
import image from '../../Images/example_product.png'
import Inventory_Description from '../Inventory/Inventory_Description'
const Inventory = ({product}) => 
    <div className="flex mb-4 bg-gray-100">
        {product}
        <div className="w-7/12 mx-2">
            <h1 className="text-gray-700 text-xl font-semibold">NaCl 0.9% Minibag pk/4</h1>
            <Inventory_Description title="Size" description="Example size" class_addons="pb-2"></Inventory_Description>
            <Inventory_Description title="Description" class_addons="pb-2 pt-4" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae."></Inventory_Description>
            <div className ="w-1/2 grid grid-cols-2 py-8">
                <h2 className ="text-gray-700 text-2-5xl font-semibold col-span-2"> Quantity</h2>
                    <div className="col-span-1">                    
                    <Inventory_Description title="Allotted" description="244" class_addons="pb-3"></Inventory_Description>
                    </div>
                    <div className="col-span-1">
                    <Inventory_Description title="Available" description="244" edit={true}></Inventory_Description>
                    </div>
                {/*<Inventory_Description title="Allotted" description="244" clas></Inventory_Description>
                {<Inventory_Description title="Available" description="244"></Inventory_Description>*/}
            <div className="col-span-2 py-8">
                <Button text="Save Changes" ></Button>
        </div>
            </div>

        </div>
        <div className="w-5/12 m-auto mx-2">
            <img className = "border border-gray-400" src={image} alt="Betterfit Logo"></img>
        </div>
    </div>

export default Inventory 