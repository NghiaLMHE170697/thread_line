import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = ({data}) => {
  const firstFiveProducts = data.products.slice(6, 10);
  return (
    <div className="w-full pb-20">
      <Heading heading="Mặt Hàng Bán Chạy" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {firstFiveProducts.map((product) => (
          <div className="px-2" key={product._id}>
            <Product
              _id={product._id}
              images={product.images}
              name={product.name}
              price={product.price}
              description={product.description}
              material={product.material}
              care_instructions={product.care_instructions}
              sizes={product.sizes}
              dimensions={product.dimensions}
              badge={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
