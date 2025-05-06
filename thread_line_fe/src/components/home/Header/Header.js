import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import logo1 from "../../../assets/images/logo.jpg"
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();
  const reduxUserInfo = useSelector((state) => state.orebiReducer.userInfo);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(reduxUserInfo && reduxUserInfo.email ? reduxUserInfo : null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    // On mount, check localStorage for user info
    const localUser = localStorage.getItem("threadline_user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUserInfo(parsedUser);
      // Sync to redux if not already
      if (!reduxUserInfo || !reduxUserInfo.email) {
        dispatch({ type: "orebi/addUserInfo", payload: parsedUser });
      }
    } else {
      setUserInfo(null);
    }
  }, [reduxUserInfo, dispatch]);

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("threadline_user");
    dispatch({ type: "orebi/addUserInfo", payload: {} });
    setUserInfo(null);
    setShowUserDropdown(false);
  };

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className="w-20 object-cover" imgSrc="img/logo.jpg" />
            </div>
          </Link>
          <div className="flex-1 flex justify-center">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                <>
                  {navBarList.map(({ _id, title, link }) => (
                    <NavLink
                      key={_id}
                      className="flex font-normal hover:font-bold w-40 h-6 justify-center items-center px-25 text-base text-[#767676] hover:underline underline-offset-[10px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0 "
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li>{title}</li>
                    </NavLink>
                  ))}
                </>
              </motion.ul>
            )}
          </div>
          <div className="hidden md:flex items-center gap-4 relative">
            {userInfo && userInfo.email ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                  onClick={() => setShowUserDropdown((prev) => !prev)}
                >
                  <span className="font-bold">{userInfo.username || userInfo.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">Sign In</button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Sign Up</button>
                </Link>
              </>
            )}
          </div>
          <HiMenuAlt2
            onClick={() => setSidenav(!sidenav)}
            className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
          />
          {/* {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full relative"
              >
                <div className="w-full h-full bg-primeColor p-6">
                  <img
                    className="w-28 mb-6"
                    src={logoLight}
                    alt="logoLight"
                  />
                  <ul className="text-gray-200 flex flex-col gap-9">
                    {navBarList.map((item) => (
                      <li
                        className="font-normal hover:font-bold items-center text-mg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                        key={item._id}
                      >
                        <NavLink
                          to={item.link}
                          state={{ data: location.pathname.split("/")[1] }}
                          onClick={() => setSidenav(false)}
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <h1
                      onClick={() => setCategory(!category)}
                      className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                    >
                      Danh mục{" "}
                      <span className="text-lg">{category ? "-" : "+"}</span>
                    </h1>
                    {category && (
                      <motion.ul
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm flex flex-col gap-1"
                      >
                        <li className="headerSedenavLi">In ấn quảng cáo</li>
                        <li className="headerSedenavLi">In nhanh</li>
                        <li className="headerSedenavLi">In tem nhãn Decal</li>
                        <li className="headerSedenavLi">Chân standee</li>
                        <li className="headerSedenavLi">Quạt quảng cáo</li>
                      </motion.ul>
                    )}
                  </div>
                  <div className="mt-4">
                    <h1
                      onClick={() => setBrand(!brand)}
                      className="flex justify-between text-base cursor-pointer items-center font-titleFont mb-2"
                    >
                      Mua theo loại
                      <span className="text-lg">{brand ? "-" : "+"}</span>
                    </h1>
                    {brand && (
                      <motion.ul
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm flex flex-col gap-1"
                      >
                        <li className="headerSedenavLi">New Arrivals</li>
                        <li className="headerSedenavLi">Gudgets</li>
                        <li className="headerSedenavLi">Accessories</li>
                        <li className="headerSedenavLi">Electronics</li>
                        <li className="headerSedenavLi">Others</li>
                      </motion.ul>
                    )}
                  </div>
                </div>
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                >
                  <MdClose />
                </span>
              </motion.div>
            </div>
          )} */}
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
