import React, { useContext } from 'react'
import Navbar from './Navbar'
import Items from './Items'
import MidImage from './MidImage'
import { Context } from '../..'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const { auth,vauth } = useContext(Context);
  if (!auth) {
    if (vauth) {
     return <Navigate to={'/vendorHome'}/>
    }
    return <Navigate to={'/'}/>
 }
  
  

  return (
    <div>
      <Navbar />
          <MidImage/>
          <Items/>
    </div>
  )
}

export default Home
