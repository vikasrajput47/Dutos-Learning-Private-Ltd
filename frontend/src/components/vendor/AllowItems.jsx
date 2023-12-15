import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const AllowItems = () => {
  const [items, setItems] = useState();

  const fetchData = async () => {
    const data = await fetch("http://localhost:5000/item/getAll", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (res.success) {
      setItems(res.items);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  
  const accept = async (id) => {
  try {
     const allow = await fetch(`http://localhost:5000/item/allow/${id}`, {
       method: "PUT",
       credentials: "include",
       headers: {
         "Content-Type": "application-json",
       },
     });
     const res = await allow.json();
     if (res.success) {
       toast.success(res.message);
     } else {
       toast.error("Error Allowing");
     }
  } catch (error) {
    toast.error('Some Error occured');
  }
  }
  
  const reject = async (id) => {
    try {
      const allow = await fetch(`http://localhost:5000/item/reject/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const res = await allow.json();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error("Error Allowing");
      }
    } catch (error) {
      toast.error("Some Error occured");
    }
  }
  


  return (
    <div className="flex flex-wrap justify-around flex-row text-black mx-10 px-5 py-5 my-20 ">
      {items
        ? items.map((item, key) => (
            <div
              className="flex flex-col justify-around items-center w-80 h-96 my-4 shadow"
              key={item.id}
            >
              <p className="font-bold">ID: {item.user}</p>
              <img className="h-36" src={item.image} alt="itemImage" />

              <div className=" flex w-72 flex-col text-center justify-center  ">
                <p>{item.title}</p>
                <div className="flex justify-around my-4 ">
                  <p>{item.rating.rate}&#11088;</p>
                  <p>{item.price}$</p>
                </div>
              </div>
              {item.permission.allow ? (
                <div className="flex flex-col">
                  <div className="bg-blue-500  text-white w-72 text-center h-8 text-xl ">
                    Allowed
                  </div>
                  <div className="bg-blue-500 text-white  w-72 text-center h-8 text-xl ">
                    Allowed By: {item.permission.vendorName}
                  </div>
                </div>
              ) : item.permission.vendorName !== "na" ? (
                <div className="flex flex-col">
                  <div className="bg-red-500  text-white w-72 text-center h-8 text-xl ">
                    Rejected
                  </div>
                  <div className="bg-red-500 text-white  w-72 text-center h-8 text-xl ">
                    Rejected By: {item.permission.vendorName}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div
                    onClick={() => reject(item._id)}
                    className="bg-red-500 hover:bg-yellow-600 text-white w-72 text-center h-8 text-xl "
                  >
                    Reject
                  </div>
                  <div
                    onClick={() => accept(item._id)}
                    className="bg-green-500 text-white mt-1 w-72 text-center h-8 text-xl hover:bg-red-700"
                  >
                    Allow
                  </div>
                </div>
              )}
            </div>
          ))
        : ""}
    </div>
  );
};

export default AllowItems;
