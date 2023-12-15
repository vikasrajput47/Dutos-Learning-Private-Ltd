import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import toast from "react-hot-toast";
import { Context } from "../..";

const VLogin = () => {
  const { vauth, setVauth,auth,setAuth } = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitHandle = (e) => {
    e.preventDefault();
  };

  const loginHandle = async () => {
    console.log("hi ");

    try {
      const response = await fetch("http://localhost:5000/vendor/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, pass: password }),
        credentials: "include",
      });

      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.success) {
        setVauth(true);
        setAuth(false);
        toast.success(jsonData.message);
      } else {
        setVauth(false);
        setAuth(false);
        toast.error(jsonData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  if (vauth && !auth) return <Navigate to={"/vendorHome"} />;

  console.log(email);
  return (
    <>
      <div className=" text-3xl">Welcome Vendor!</div>
      <div className="h-40 w-3/4 text-xl">
        <form
          onSubmit={submitHandle}
          className="flex flex-col h-40 justify-around"
          action=""
        >
          <input
            className=" pl-2 drop-shadow bg-slate-50 border-2 border-white rounded h-10 "
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pl-2 drop-shadow bg-slate-50 border-2 border-white rounded h-10 "
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={loginHandle}
            className="bg-blue-500 hover:bg-blue-700 text-white drop-shadow h-10"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default VLogin;
