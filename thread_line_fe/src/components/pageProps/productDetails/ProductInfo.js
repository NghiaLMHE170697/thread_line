import React, { useState } from "react";
import messengerIcon from "../../../assets/images/messenger.png";

const ProductInfo = ({ productInfo = {} }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxDescriptionLength = 100;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {productInfo?.name || "Không có tên"}
        </h1>

        {/* Price */}
        <div className="mb-6">
          <p className="text-2xl font-bold text-pink-600">
            {productInfo?.price || "Giá không có sẵn"}
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-pink-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Tóm tắt sản phẩm</h3>
          <div className="space-y-4">
            {/* Material */}
            {productInfo?.material && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-gray-700 block mb-1">Chất liệu</span>
                <span className="text-gray-600">
                  {productInfo.material}
                </span>
              </div>
            )}

            {/* Sizes with Preview */}
            {productInfo?.sizes && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <span className="font-medium text-gray-700 block mb-2">Kích thước</span>
                <div className="flex flex-wrap gap-2">
                  {productInfo.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Short Description */}
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">
            {productInfo?.description
              ? showFullDescription
                ? productInfo.description
                : `${productInfo.description.slice(0, maxDescriptionLength)}...`
              : "Không có mô tả"}
          </p>
          {productInfo?.description?.length > maxDescriptionLength && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-pink-500 hover:text-pink-600 font-medium mt-2 transition-colors"
            >
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>

      {/* Contact Button */}
      <div className="mt-auto">
        <a
          href="http://m.me/61565637313680"
          className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200"
        >
          <img src={messengerIcon} alt="Messenger" className="w-6 h-6" />
          <span>Liên hệ ngay để được tư vấn</span>
        </a>
      </div>
    </div>
  );
};

export default ProductInfo;
