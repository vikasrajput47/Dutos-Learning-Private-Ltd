import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Context } from '..';
import toast from 'react-hot-toast';

const Login = () => {
  const { auth, setVauth,vauth,setAuth ,setIsVendor} = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitHandle = (e) => {
    e.preventDefault();
  }

 
 const loginHandle = async () => {
   console.log("hi ");

   try {
     const response = await fetch("http://localhost:5000/user/login", {
       method: "POST",
       
       headers: {
         "Content-Type": "application/json",
  
         
       },
       body: JSON.stringify({ email: email, pass: password }),
       credentials:'include',
     });

     const jsonData = await response.json();
     console.log(jsonData);
     if (jsonData.success) {
       setAuth(true);
       setVauth(false);
       toast.success(jsonData.message);
     }
     else {
       toast.error(jsonData.message)
     }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  if(auth && !vauth)return <Navigate to={'/userHome'}/>

  console.log(email);
  return (
    <>
      <div className=" text-3xl">Welcome User!</div>
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
            className="bg-blue-500 text-white drop-shadow h-10 hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
