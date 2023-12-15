import React, { useContext, useEffect, useState } from 'react'
import Login from './Login'
import { Context } from '..';
import Register from './Register';
import VLogin from './vendor/VLogin';
import VRegister from './vendor/VRegister';
const Header = () => {
  const [vendor, setVendor] = useState(false);
  const [ login, setLogin ] = useState(true);
  return (
    <div>
      <div className="h-10 items-center flex justify-around   ">
        <h1 className="text-6xl">D</h1>
        <h1 className=" text-6l">Dutos</h1>
      </div>
      <div className="flex justify-center mt-20">
        <div className="flex flex-col w-1/5 h-96 justify-around items-center bg-slate-200 drop-shadow-md ">
          <div className=" flex justify-between bg-slate-50 w-3/4 text-xl h-10 mt-10 ">
            <button
              onClick={() => setLogin(!login)}
              className={`w-1/2 text-center ${login ? "bg-blue-400 text-white" : ""} `}
            >
              Login
            </button>
            <button
              onClick={() => setLogin(!login)}
              className={`w-1/2 text-center ${login ? "" : "bg-blue-400 text-white"} `}
            >
              Register
            </button>
          </div>
          {vendor ? (
            login ? (
              <VLogin className="" />
            ) : (
              <VRegister />
            )
          ) : login ? (
            <Login className="" />
          ) : (
            <Register />
          )}
        
          <button className='text-white p-1 rounded-md hover:bg-blue-700 bg-blue-500' onClick={()=>setVendor(!vendor)}>{vendor ? "User" : "Vendor"}</button>
        </div>
      </div>
    </div>
  );
}

export default Header
