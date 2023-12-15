import React, { useContext } from 'react'
import Navbar from './Navbar'
import AllowItems from './AllowItems'
import { Context } from '../..'
import { Navigate } from 'react-router-dom'

const VHome = () => {
  const { vauth,auth } = useContext(Context);
  if (!vauth) {
    if (auth) {
     return <Navigate to={'/userHome'}/>
    }
    return <Navigate to={'/'}/>
 }
  return (
    <div>
      <Navbar />
      <AllowItems/>
    </div>
  )
}

export default VHome