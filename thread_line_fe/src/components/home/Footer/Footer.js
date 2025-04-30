import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaTiktok, FaMap } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div style={{ backgroundColor: "#302f2f" }} className="w-full py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-2 gap-10">
        <div className="col-span-2">
          <FooterListTitle title=" Thông tin về THREADLINE" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%] text-white">
              Chúng tôi đặt chữ tín lên hàng đầu, khách vừa lòng mới làm, khách không vừa ý không buông
            </p>
            <ul className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61576067720545"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://maps.app.goo.gl/ABLVJL1AQKwm2akW9"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaMap />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <FooterListTitle title="Hướng dẫn và thông tin" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Quy trình đặt hàng và sản xuất
            </li>
            <li className="font-titleFont text-base text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Giao hàng và vận chuyển
            </li>
            <li className="font-titleFont text-base  text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Hình thức thanh toán
            </li>
            <li className="font-titleFont text-base  text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Hình ảnh sản xuất
            </li>

          </ul>
        </div>
        <div className="col-span-2">
          <FooterListTitle title="Tư vấn đặt hàng " />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base  text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Điện thoại: 0242071387
            </li>
            <li className="font-titleFont text-base  text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Zalo: 0242071387
            </li>
            <li className="font-titleFont text-base  text-white hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Địa chỉ: 107A Đ. Nguyễn Phong Sắc, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
            </li>

          </ul>
        </div>
        {/* <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Hãy phản hồi cho chúng tôi! Nếu bạn cần" />
          <div className="w-full">
            <p className="text-center mb-4  text-white">
              Mỗi trải nghiệm của quý khách hàng là niềm vinh dự của shop in ấn chúng tôi.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully !
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Nhập Email ở đây*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white  text-white w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${subscription ? "mt-2" : "mt-6"
                }`}
              imgSrc={paymentCard}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
