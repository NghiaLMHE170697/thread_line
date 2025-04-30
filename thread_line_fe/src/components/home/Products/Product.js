import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = props.name;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: {
          _id: props._id,
          name: props.name,
          price: props.price,
          images: props.images,
          description: props.description,
          material: props.material,
          care_instructions: props.care_instructions,
          sizes: props.sizes,
          dimensions: props.dimensions
        },
      },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: props._id,
        name: props.name,
        quantity: 1,
        image: props.images[0],
        price: props.price,
      })
    );
  };

  return (
    <div className="w-full h-[450px] group relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300">
      <div className="relative h-[280px] overflow-hidden">
        <img 
          src={props.images[0]} 
          alt={props.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
           
            <button 
              onClick={handleProductDetails}
              className="bg-white p-3 rounded-full text-black hover:bg-gray-100 transition-colors"
              title="Xem chi tiết"
            >
              <FaEye className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 h-[170px] flex flex-col">
        <div className="flex-grow min-h-[3rem] mb-2">
          <h3 className="text-lg font-bold text-gray-800 text-center line-clamp-2 hover:line-clamp-none">
            {props.name}
          </h3>
        </div>
        <p className="text-pink-600 font-semibold text-base text-center mb-3">
          {props.price}
        </p>
        {props.sizes && (
          <div className="flex flex-wrap justify-center gap-1 h-[28px] overflow-hidden">
            {props.sizes.slice(0, 4).map((size, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded-full"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;