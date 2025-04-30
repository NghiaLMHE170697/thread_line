import React from "react";
const FooterListTitle = ({ title }) => {
  return (
    <h3
      style={{ fontFamily: "Inter, sans-serif" }}
      className="text-xl font-bold mb-6 text-white"
    >
      {title}
    </h3>
  );
};
export default FooterListTitle;
