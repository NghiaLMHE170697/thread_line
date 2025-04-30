import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({ itemsPerPageFromBanner, setSortOrder }) => {
  //   const [selected, setSelected] = useState("");
  const [girdViewActive, setGridViewActive] = useState(true);
  useEffect(() => {
    const gridView = document.querySelector(".gridView");

    gridView.addEventListener("click", () => {
      setGridViewActive(true);
    });
  }, [girdViewActive]);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* =========================================================
                            Left Part Start here
        ======================================================== */}

      <div className="flex items-center gap-4">
        <span
          className={`${girdViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
            } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </span>
      </div>
      {/* =========================================================
                            Left Part End here
        ======================================================== */}
      {/* =========================================================
                            Right Part STart here
        ======================================================== */}
      {/* =========================================================
                            Right Part End here
        ======================================================== */}
    </div>
  );
};

export default ProductBanner;
