import { useAuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Aside from "../components/Aside";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext(); // token viene del contexto
  const { forums } = useContext(ForumContext);
  console.log('forums desde home',forums);
  


  return (

    <div
      className=" md:flex w-screen min-h-screen  bg-bg-gray-900 "
    >

      <div
        className="min-h-screen  border-red-400 border-2 bg-bg-gray-900"
      >
        <div
          className=" relative  h-full "
        >
          <Aside />
        </div>
      </div>
      <div
        className="  text-white flex flex-col justify-center items-center  bg-gray-900  w-full"
      >
        <h1
          className="text-white"
        >Home</h1>
    <div className=" md:flex w-screen ">
      <div className="min-h-screen relative border-red-400 border-2">
        <Aside />
      </div>
      <div className="w-1/2 ">
        <h1>Home</h1>
        {autenticated ? (
          <div>
            <p>Name: {userPayload.firstName}</p>
            <p>Email: {userPayload.email}</p>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
        {
          
          forums.map((forum) => 
            forum.posts.map((post) => (
              <div key={post._id}>
                <Post
                  id={post._id}
                  title={post.title}
                  forum={forum.title} 
                  content={post.content}
                  postImage={post.image[0]}
                />
              </div>
            ))
          )
       }
      </div>
    </div>
  );
};

export default Home;
