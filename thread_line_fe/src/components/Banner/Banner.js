import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Image from "../designLayouts/Image";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2"
      onClick={onClick}
    >
      <span className="text-xl">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span className="text-xl">
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "200px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full bg-white relative">
      <Slider {...settings}>
        <Link>
          <div className="w-full">
            <Image imgSrc="https://s3.cloudfly.vn/bucketfile/banner1.jpg" className="w-full h-auto object-cover" />
          </div>
        </Link>
        <Link>
          <div className="w-full">
            <Image imgSrc="https://s3.cloudfly.vn/bucketfile/banner2.jpg" className="w-full h-auto object-cover" />
          </div>
        </Link>
        <Link>
          <div className="w-full">
            <Image imgSrc="https://s3.cloudfly.vn/bucketfile/banner3.jpg" className="w-full h-auto object-cover" />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Banner;
