import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";


const NewArrivals = ({data}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  console.log(data.products);

  // Lấy 5 sản phẩm đầu tiên
  const firstFiveProducts = data.products.slice(0, 5);

  return (
    <div className="w-full pb-16">
      <Heading heading="Sản Phẩm Mới" />
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
};

export default NewArrivals;
