import React, { useState, useEffect } from "react";
import Api from "Helpers/api";
import CategoryCard from "Components/Order/CategoryCard";
import image from "Images/example_product.png"; //remove this later
import TitleUnderLine from "Components/Content/TitleUnderLine";
const api = new Api();

const DashboardCategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategory] = useState({ hits: [] });
  const [isError, setIsError] = useState(false);

  const getData = async () =>
    await api
      .getCategories()
      .then((response) => {
        setCategory(response.data);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });

  // console.log(JSON.stringify(ProductData))
  useEffect(() => {
    //if(lastCategory !== CategoryId){
    console.log("getting data");
    //    setLastProduct(CategoryId);
    //    getData();
    // }
  });

  let CategoryData = {
    name: "IV Solutions",
    icon: {
      color: "#4D2CAE",
      "background-color": "#EDEBFC",
      svg: "",
    },
    products: [
      {
        name: "testproduct1",
        size: "5ml",
        image: { image },
        Description:
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
      {
        name: "testproduct2",
        size: "200ml",
        image: "",
        Description:
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
      {
        name: "testproduct3",
        size: "1L",
        image: "",
        Description:
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
      {
        name: "testproduct2",
        size: "200ml",
        image: "",
        Description:
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
      {
        name: "testproduct3",
        size: "1L",
        image: "",
        Description:
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      },
    ],
  };
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <TitleUnderLine title="Products" extraclasses=" hidden md:block" />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 mb-6 md:mb-10">
            {categories.map((p) => {
              return <CategoryCard key={`${p.name}`} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCategoryList;
