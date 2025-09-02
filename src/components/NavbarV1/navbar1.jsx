import React from 'react'
import { Link } from 'react-router-dom'
const Navbar1 = () => {
  return (
  <nav className="bg-gray-100 w-[100%] md:px-[100px] px-[20px] flex justify-between py-4 box-border">
    <Link to="/"className="flex justify-between"> 
      <div className="flex gap-1 items-center cursor-pointer">
        <h3 className="text-red-600 font-bold text-3xl">Linked</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="LinkedInLogo" className="w-7 h-7" />
      </div> 
            
    </Link>
 
    <div className="flex box-border md:gap-4 gap-2 justify-center items-center">  
    <Link to={"/signUp"} className="md:px-4 md:py-2 box-border text-black rounded-3xl hover:bg-gray-200 cursor-pointer">Join now</Link> 
      <Link to={"/login"} className="px-4 py-2 box-border border text-blue-800 border-blue-800 rounded-3xl text-xl hover:bg-blue-50 cursor-pointer">Sign in</Link>
    </div>
     
  </nav>
  )
}

export default Navbar1
