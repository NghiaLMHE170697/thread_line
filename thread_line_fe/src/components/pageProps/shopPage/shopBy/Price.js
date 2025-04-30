import React from "react";
import NavTitle from "./NavTitle";

const Price = () => {
  const priceList = [
    {
      _id: 950,
      priceOne: 1000,
      priceTwo: 10000,
    },
    {
      _id: 951,
      priceOne: 10000,
      priceTwo: 50000,
    },
    {
      _id: 952,
      priceOne: 50000,
      priceTwo: 100000,
    },
    {
      _id: 953,
      priceOne: 100000,
      priceTwo: 500000,
    },
    {
      _id: 954,
      priceOne: 500000,
      priceTwo: 1000000,
    },
    {
      _id: 955,
      priceOne: 1000000,
      priceTwo: 1500000,
    },
  ];
  return (
    <div className="cursor-pointer">
      <NavTitle title="Sắp xếp theo giá" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {item.priceOne.toFixed(1)} - {item.priceTwo.toFixed(1)} VND
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
