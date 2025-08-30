import React, { useState } from 'react'
import './navbar2.css'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';

const Navbar2 = () => {

  const [dropdown, setDropDown] = useState(false);
  const location = useLocation();
  console.log(location);

  return (
    <div className="bg-white h-13 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-[100%] z-1000">
        <div className="flex gap-2 items-center">
            <div>
                <img className="w-8 h-8" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"}/>
            </div>
            <div className="relative">
                <input className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4" placeholder="Search" />

                {
                    dropdown && <div className='absolute w-88 left-0 bg-gray-200'>
                    <div className='flex gap-2 mb-1 items-center'>
                        <div><img className='w-10 h-10 border-gray-200 rounded-full' src='https://static.vecteezy.com/system/resources/previews/027/896/292/non_2x/realistic-vector-a-young-girl-with-pet-cats-by-ai-generated-photo.jpg'></img></div>
                        <div>Ankita</div>
                    </div>
                    </div>
                } 

                

            </div>
        </div>

        <div className="hidden gap-10 md:flex">
            <div className="flex flex-col items-center cursor-pointer">
                <HomeIcon sx={{color:location.pathname==='/feeds'?"black":"gray"}} />
                <div className={`text-sm text-gray-500 ${location.pathname==='/feeds'?"border-b-3":"gray"}`}>Home</div>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
                <PeopleIcon sx={{color:location.pathname==='/mynetwork'?"black":"gray"}}/>
                <div className={`text-sm text-gray-500 ${location.pathname==='/mynetwork'?"border-b-3":"gray"}`}>MY network</div>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
                <HomeRepairServiceIcon sx={{color:location.pathname==='/resume'?"black":"gray"}}/>
                <div className={`text-sm text-gray-500 ${location.pathname==='/resume'?"border-b-3":"gray"}`}>Resume</div>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
                <ChatIcon sx={{color:location.pathname==='/messages'?"black":"gray"}}/>
                <div className={`text-sm text-gray-500 ${location.pathname==='/messages'?"border-b-3":"gray"}`}>Message</div>
            </div>
            <div className="flex flex-col items-center cursor-pointer">
                <div><NotificationsIcon sx={{color:location.pathname==='/notifications'?"black":"gray"}}/> <span className="p-1 rounded-full text-sm bg-red-700 text-white">1</span> </div>
                <div className={`text-sm text-gray-500 ${location.pathname==='/notifications'?"border-b-3":"gray"}`}>Notification</div>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
                <img className="w-8 h-8 rounded-full" src="https://static.vecteezy.com/system/resources/previews/027/896/292/non_2x/realistic-vector-a-young-girl-with-pet-cats-by-ai-generated-photo.jpg" />
                <div className="text-sm text-gray-500">Me</div>
            </div>
        </div> 
        
      Navbar2
    </div>
  )
}

export default Navbar2
