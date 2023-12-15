import React from "react";
import bgImage from "../img/bgImage.jpg";

const MidImage = () => {
  return (
    <div className="relative mt-10 mx-10">
      <img className="w-full" src={bgImage} alt="" />
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl w-2/3 font-black text-white">
        Don't Miss Out! Sale of the Season is Here
      </h1>
    </div>
  );
};

export default MidImage;
