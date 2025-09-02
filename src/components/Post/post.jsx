import React from "react";
import Card from "../Card/card";
import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Post = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [comment,setComment]=useState(false)
  const handleSendComment = (e) => {
    e;
  };

  const desc = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et iure facilis dicta alias perspiciatis, laborum accusamus eveniet, maxime quas fugiat dolor? Eligendi ea culpa, fugit quia ex cupiditate saepe repudiandae!`;
  return (
    <Card padding={0}>
      <div className="flex gap-3 p-4">
        <div className="w-12 h-12 rounded-full">
          <img
            className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer"
            src="https://static.vecteezy.com/system/resources/previews/027/896/292/non_2x/realistic-vector-a-young-girl-with-pet-cats-by-ai-generated-photo.jpg"
          />
        </div>
        <div>
          <div className="text-lg font-semibold text-red-800 bg-color-red">Dummy User</div>
          <div className="text-xs text-gray-500">SDE-I Eng. @Microsoft</div>
        </div>
      </div>

      <div className="text-md p-6 my-3 whiteSpace-pre-line flex-grow">
        {seeMore ? desc : `${desc.slice(0, 50)}...`}
        <span
          onClick={() => setSeeMore((prev) => !prev)}
          className="cursor-pointer text-gray-500"
        >
          {seeMore ? "see Less" : "see More"}
        </span>
      </div>

      <div className="w-[100%] h-[300px]">
        <img
          className="w-full h-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2hZeTWQA-V7Nzi3CH2V6HKNTWFbXpDPitkA&s"
        />
      </div>
      <div className="my-2 p-4 flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <ThumbUpIcon sx={{ color: "blue", fontSize: 12 }} />
          <div className="text-sm text-gray-600">1 Likes</div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="text-sm text-gray-600">2 Comments</div>
        </div>
      </div>

      <div className="flex p-1">
        <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100"><ThumbUpIcon sx={{ fontsize: 22, color: "blue" }} /> <span>Like</span></div>
        <div onClick={() => setComment(true)} className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100"><CommentIcon sx={{ fontsize: 22 }} /><span>Comment</span></div>
        <div className="w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-100 p-2 cursor-pointer hover:bg-gray-100"><ShareOutlinedIcon sx={{ fontsize: 22 }} /><span>Share</span></div>
      </div>

      {/* Comment Section */}
      {comment && 
        <div className="p-4 w-full">
          <div className="flex gap-2 items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/027/896/292/non_2x/realistic-vector-a-young-girl-with-pet-cats-by-ai-generated-photo.jpg"
              className="w-12 h-12 rounded-full"
            />

            <form className="w-full flex gap-2" onSubmit={handleSendComment}>
              <input
                placeholder="Add a comment..."
                className="w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100"
              />
              <button
                type="submit"
                className="cursor-pointetr bg-blue-800 text-white rounded-3xl py-1 px-3"
              >
                Send
              </button>
            </form>
          </div>

          {/* other's Comment section */}
          <div className="w-full p-4">
            <div className="my-4">
              <div className="flex gap-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/027/896/292/non_2x/realistic-vector-a-young-girl-with-pet-cats-by-ai-generated-photo.jpg"
                  className="w-10 h-10 rounded-full"
                />
                <div className="cursor-pointer">
                  <div className="text-md">Dummy User</div>
                  <div className="text-sm text-gray-500">@Microsoft SDE-I</div>
                </div>
              </div>

              <div className="px-11 my-2">Hi this is beautiful</div>
            </div>
          </div>
        </div>
      }
    </Card>
  );
};

export default Post;
