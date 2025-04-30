import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentImageIndex(next),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full mx-1 ${
          i === currentImageIndex ? 'bg-pink-500' : 'bg-gray-300'
        }`}
      />
    ),
    dotsClass: "slick-dots !bottom-4"
  };

  return (
    <div className="w-full mx-auto py-10 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Carousel Section */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Slider {...settings}>
                {productInfo.images?.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      className="w-full h-full object-cover"
                      src={image}
                      alt={`${productInfo.name} - Image ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Product Information Section */}
            <div className="flex flex-col justify-between">
              <ProductInfo productInfo={productInfo} />
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="border-t border-gray-200 p-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin chi tiết</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specifications */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h3>
                  <div className="space-y-4">
                    {/* Material */}
                    {productInfo.material && (
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700 block mb-1">Chất liệu</span>
                        <span className="text-gray-600">{productInfo.material}</span>
                      </div>
                    )}
                    
                    {/* Sizes */}
                    {productInfo.sizes && (
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700 block mb-2">Kích thước có sẵn</span>
                        <div className="flex flex-wrap gap-2">
                          {productInfo.sizes.map((size, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-medium"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dimensions */}
                    {productInfo.dimensions && (
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700 block mb-1">Chăm sóc</span>
                        <span className="text-gray-600">{productInfo.dimensions}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Care Instructions */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Hướng dẫn bảo quản quần áo</h3>
                  {productInfo.care_instructions && (
                    <ul className="space-y-4">
                      {productInfo.care_instructions.split('. ').map((instruction, index) => (
                        <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <span className="w-2 h-2 mt-2 rounded-full bg-pink-400 flex-shrink-0"></span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
