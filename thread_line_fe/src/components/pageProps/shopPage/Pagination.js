import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
// import { paginationItems } from "../../../constants";
import data from "../../../data/database.json"
const items = data.products;

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              description={item.description}
              material={item.material}
              care_instructions={item.care_instructions}
              sizes={item.sizes}
              dimensions={item.dimensions}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, selectedCategory}) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Lọc sản phẩm theo category đã chọn
  const filteredItems = selectedCategory
    ? items.filter((product) => product.cid === selectedCategory)
    : items;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
      </div>
    </div>
  );
};

export default Pagination;
