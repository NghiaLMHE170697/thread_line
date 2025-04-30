import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import data from "../../../../data/database.json";

const Category = ({ setSelectedCategory, selectedCategory }) => {
  const categories = [{ _id: null, name: "Toàn bộ sản phẩm"}, ...data.categories];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="w-full">
      <NavTitle title="Sắp xếp theo phân loại" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map(({ _id, name }) => (
            <li
              key={_id}
              onClick={() => handleCategoryClick(_id)}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer ${
                selectedCategory === _id ? "text-primeColor font-bold" : ""
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Category;
