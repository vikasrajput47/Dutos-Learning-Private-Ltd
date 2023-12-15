import React, { useContext } from "react";
import logout from "../img/logout.png";
import order from "../img/order.png";
import toast from "react-hot-toast";
import { Context } from "../..";
const Navbar = () => {
  const { setVauth } = useContext(Context);
  const exit = async () => {
    const ex = await fetch("http://localhost:5000/vendor/logout", {
      method: 'GET',
      credentials: 'include',
    });
    const res = await ex.json();
    if (res) {
      setVauth(false);
      toast.success('Logout');
    } else {
      toast.error('some error');
    }
  }
  return (
    <div className="text-xl  shadow-md h-16 items-center flex justify-between ">
      <div className="mx-10 text-3xl font-bold">User!</div>
     
       
        <button onClick={exit}>
          <img className="h-12" src={logout} alt="" />
        </button>
     
    </div>
  );
};

export default Navbar;
