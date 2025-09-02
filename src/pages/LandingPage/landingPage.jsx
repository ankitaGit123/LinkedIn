import React from 'react'
import { Link } from 'react-router-dom'
import GoogleLoginComponent from '../../components/GoogleLogin/googleLoginComponent'

const LandingPage = () => {
  return (
    <div className="my-4 py-[50px] md:pl-[120px] px-5 md:flex justify-between">
        <div className="md:w-[40%]">
            <div className="text-4xl mx-auto text-gray-500"> Welcom To Your Professional Community

            <div className="my-3 flex mx-auto mt-[20px] bg-white gap-2 rounded-3xl w-[70%] text-black cursor-pointer">
                <GoogleLoginComponent />
            </div>
            <Link to={'/login'} className="flex mx-auto mt-[20px] py-2 px-2 bg-white gap-2 rounded-3xl items-center w-[70%] justify-center text-black hover:bg-gray-100 border-2 cursor-pointer">Sign in with email</Link>
            <div className="mx-auto mb-4 text-sm w[70%] mt-6">By clicking Continue to join or sign in, you agree to <span className="text-blue-800 cursor-pointer hover:underline">LinkedIn's UserAgreement</span>, <span className="text-blue-800 cursor-pointer hover:underline">Privacy Policy</span>, and <spave className="text-blue-800 cursor-pointer hover:underkine">Cookie Policy</spave>.</div>
            <Link to={'/signUp'} className="mx-aut0 text-center mb-4 text-lg w-[70%] mt-4">New to Linkedin? <span className="text-blue-800 cursor-pointer hover:underline">Join now</span></Link>
 
            </div>
  
        </div>
        <div className="md:w-[50%] h-120">
            <img alt="image" className="w-full h-full" src={"https://images.ctfassets.net/pdf29us7flmy/4OVj7HuuJkTyG5rHwLbXo5/022dc36619d3e86d20acae9c7b787020/resized.png?w=1440&q=100&fm=avif"} />
        </div>
      
    </div>
  )
}

export default LandingPage
