import React, { useContext, } from "react";
import Navbar from "./Navbar";
import { Context } from "../..";
const Track = () => {
  const { user,ulo } = useContext(Context);
  
  return (
    <>
      <Navbar />
      <div className="flex  justify-around flex-col text-black mx-10 px-5 py-5 my-20 ">
        { ulo
          ? (user.items.map((item, key) => (
              <div
                className="flex  justify-around items-center h-64 my-4 shadow"
                key={item.id}
              >
                <img className="h-36" src={item.image} alt="itemImage" />

                <div className=" flex w-72 flex-col text-center justify-center  ">
                  <p>{item.title}</p>
                  <div className="flex justify-around my-4 ">
                    <p>{item.rating.rate}&#11088;</p>
                    <p>{item.price}$</p>
                  </div>
                </div>

                <ul className="flex w-2/3  ">
                  <li className="text-green-800 font-bold ">
                    Purchased------------<p className="mx-5 "> &#9989;</p>
                  </li>
                  <li className="text-green-800 font-bold">
                    Waiting for vendor-----------
                    <p className="mx-10">&#x2753;</p>
                  </li>
                  <li className="text-green-800 font-bold">
                    Allow /not-----------
                    <p className="mx-5">&#x274C; &#9989;</p>
                  </li>
                  <li className="text-green-800 font-bold">
                    Out for delivery-----------<p className="mx-10">&#9989;</p>
                  </li>
                  <li className="text-green-800 font-bold">
                    Success<p className="mx-5">&#9989;</p>
                  </li>
                </ul>
              </div>
            ))
          ): <div>loading...</div>}
      </div>
    </>
  );
};

export default Track;
