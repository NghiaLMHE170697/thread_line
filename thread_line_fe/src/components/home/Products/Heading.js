import React from "react";

const Heading = ({ heading }) => {
  return (
    <h2 style={{ fontFamily: "Arial, sans-serif" }} className="text-2xl font-bold">
      {heading}
    </h2>
  );
};

export default Heading;
