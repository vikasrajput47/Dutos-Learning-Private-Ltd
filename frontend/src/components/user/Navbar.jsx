import React, { useContext, useEffect, useState } from 'react'
import logout from '../img/logout.png'
import order from '../img/order.png'
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../..';
import toast from 'react-hot-toast';
const Navbar = () => {
  const [name, setName] = useState();
  const { auth, setAuth } = useContext(Context);
  const exit = async () => {
    const result=await fetch("http://localhost:5000/user/logout", {
      method: 'GET',
      credentials:'include'
    });
    const log =await result.json();
    if (log.success) {
      setAuth(false);
      toast.success('logout')
    } else {
      toast.error("error")
    }
  }

  const userName = async () => {
    const data = await fetch("http://localhost:5000/user/getProfile", {
      method: "GET",
      credentials:'include'
    });
    const res = await data.json();
    console.log(res.user);
    setName(res.user.name)
}

  useEffect(() => {
    userName();
  },[])
  if (!auth) {
    return <Navigate to={'/'}/>
  }
  return (
    <div className="text-xl  shadow-md h-16 items-center flex justify-between ">
      <div className="mx-10 text-3xl font-bold">{name}</div>
      <ul className="flex justify-between items-center mx-8 w-64 ">
        <li>
          <Link to={"/userHome"}>
            <p className="h-12 mt-3 font-bold">Home</p>
          </Link>
        </li>
        <li>
          
          <Link to={"/userTrack"}>
            <img className="h-12" src={order} alt="" />
          </Link>
        </li>
        <li>
          <button  onClick={exit}>
          
            <img className="h-12" src={logout} alt="" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar