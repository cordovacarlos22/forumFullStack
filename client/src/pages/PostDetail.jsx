import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { ForumContext } from "../context/forum.context";

const PostDetail = () => {
  const { id } = useParams();

  
  
  const { filteredForums, loading } = useContext(ForumContext);
  
  

  const post = filteredForums.flatMap((forum) =>
    forum.posts.filter((post) => post._id === id)
  );
  console.log("post id ", post);


  return (
    <div
      className='bg-gray-900 flex flex-col items-center justify-center h-screen w-screen'
    >

      <h1 className=' text-white '>
        Post {id}
      </h1>
    </div>
  )
}

export default PostDetail;


