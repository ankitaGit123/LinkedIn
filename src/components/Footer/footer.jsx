import React from 'react'

const Footer = () => {
  return (
    <div className="w-[100%] bg-red-200 flex justify-center ">
        <div className="md:p-3 w-[100%] flex flex-col items-center py-4">
            <div className="flex gap-1 items-center cursor-pointer">
                <h3 className="text-blue-800 font-bold text-xl">Linked</h3>
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s "}className="w-2 h-2"/>
            </div>
            <div className="text-sm">@Copyright 2025</div>
        </div>
      
    </div>
  )
}

export default Footer
