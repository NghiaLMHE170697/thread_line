
import React from "react";

const BannerBottom = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl md:text-5xl text-black font-bold mb-8">
          Đăng ký nhận ưu đãi
        </h2>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="w-full">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              />
            </div>
            <div className="w-full">
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="w-40 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 ease-in-out">
              GỬI THÔNG TIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;