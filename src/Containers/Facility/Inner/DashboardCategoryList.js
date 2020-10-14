import React, {useState,useEffect} from 'react'
import BackNavigation from 'Components/Helpers/BackNavigation'
import CategoryTitle from 'Components/Content/CategoryTitle'
import Api from "Helpers/api";
import CategoryCard from "Components/Order/CategoryCard"
import image from "Images/example_product.png"; //remove this later
const api = new Api();

const DashboardCategoryList = () => {
    //const { match } = props
    //const CategoryId = parseInt(match.params.id);
    const CategoryId = 234;
    const [lastCategory , setLastCategory] = useState(CategoryId);
    // TODO : restructure data when we have an api
    let [CategoryData , setCategoryData] = useState(null);
    const getData = async () => await api.getCategory(CategoryId)
    .then((response) => {
        setCategoryData(response.data)
    })
    .catch((err) => console.log(err));
    if(!CategoryId){
        getData();
    }

    // console.log(JSON.stringify(ProductData))
    useEffect(() => {
        //if(lastCategory !== CategoryId){
            console.log('getting data');
        //    setLastProduct(CategoryId);
        //    getData();
       // }
    }); 

    CategoryData = {
        "name": "IV Solutions",
        "icon": {
            "color": "#4D2CAE",
            "background-color": "#EDEBFC",
            "svg": "",
        },
        "products": [ 
            {
            "name": "testproduct1",
            "size": "5ml",
            "image": {image},
            "Description": "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
            },
            {
            "name": "testproduct2",
            "size": "200ml",
            "image": "",
            "Description": "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
            },
            {
            "name": "testproduct3",
            "size": "1L",
            "image": "",
            "Description": "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
            },
        ]

    }
    console.log(CategoryData.products)
    console.log(Image)
    return(
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">

            {/* product title */}
            {CategoryData && (
                <>
                <BackNavigation link={`Back to Product Categories`} />
                <CategoryTitle title={`${CategoryData.name}`} icon={CategoryData.icon} />
                    <div className="grid md:grid-cols-4 gap-2 mb-6 md:mb-10">
                    {CategoryData.products.map(p =>{
                                    return(
                                    <CategoryCard key={`${p.name}`}/>
                                    )
                                })}
                    </div>

               </>
            )}
        </div>
    )
}

export default DashboardCategoryList