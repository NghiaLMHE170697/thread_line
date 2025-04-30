import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import data from "../../data/database.json";
const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Banner />
      <div className="max-w-container mx-auto px-4 mt-8">
        <NewArrivals data={data}/>
        <BestSellers data={data}/>
        <SpecialOffers data={data} /> 
        <BannerBottom />
      </div>
    </div>
  );
};

export default Home;
