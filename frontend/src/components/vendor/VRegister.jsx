import React, { useContext, useState } from "react";

import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "../..";

const VRegister = () => {
  const { vauth, setVauth ,auth,setAuth} = useContext(Context);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitHandle = (e) => {
    e.preventDefault();
  };
  const handleClick = async () => {
    try {
      const data = await fetch("http://localhost:5000/vendor/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, pass: password }),
      });
      const res = await data.json();
      console.log(res);
      if (res.success) {
        setVauth(true);
        setAuth(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      setVauth(false);
      setAuth(false);
      toast.error(error);
      console.log(error);
    }
  };
  if (vauth && !auth)  {
    return <Navigate to={"/vendorHome"} />;
  }
  return (
    <>
      <div className=" text-3xl">New Vendor!</div>
      <div className=" w-3/4 text-xl">
        <form
          onSubmit={submitHandle}
          className="flex flex-col h-56 justify-around"
          action=""
        >
          <input
            className=" pl-2 drop-shadow bg-slate-50 border-2 border-white rounded h-10 "
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className=" pl-2 drop-shadow bg-slate-50 border-2 border-white rounded h-10 "
            type="text"
            placeholder="E-mail "
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pl-2 drop-shadow bg-slate-50 border-2 border-white rounded h-10 "
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white drop-shadow h-10"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default VRegister;
