import React, { useContext, useEffect,  } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/user/Home'
import VHome from './components/vendor/VHome'
import Track from './components/user/Track'
import Header from './components/Header'
import { Context } from '.'
import { Toaster } from "react-hot-toast";
const App = () => {
  const {  setAuth,setVauth,auth,vauth, setUser,setUlo } = useContext(Context);

  const fetchData = async () => {
    try {
      const data = await fetch("http://localhost:5000/item/get", {
        method: "GET",
        credentials:'include'
      });
      const json = await data.json();
      console.log(json.items);
      if (json.success) {
        setUlo(true);
        setUser(json);
        setAuth(true);
        setVauth(false);
      } else {
        setUlo(false);
      }
    }
    catch (error) {
      console.log(error);
      setUlo(false)
      setAuth(false);
      setVauth(false);
    }
  }
  
   const fetchData2 = async () => {
    try {
       const data = await fetch("http://localhost:5000/item/getAll", {
         method: "GET",
         credentials: "include",
         headers: {
           "Content-Type": "application/json",
         },
       });
       const res = await data.json();
       if (res.success) {
         setVauth(true);
         setAuth(false);
        }
      } catch (error) {
        
        setVauth(false);
        setAuth(false);
    }
   };
  
  
  useEffect(() => {
    fetchData();
    fetchData2();
   },[auth,vauth])
  return (
    <div>
      <BrowserRouter>
     
        
        <Routes>
          <Route path='/' element={<Header/>} />
          <Route path='/userHome' element={<Home />} />
          <Route path='/userTrack' element={<Track />} />
          <Route path='/vendorHome' element={<VHome />} />
          
         
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </div>
  )
}

export default App
