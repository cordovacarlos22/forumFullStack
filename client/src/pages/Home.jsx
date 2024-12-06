import { useAuthContext } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { getPostsService } from "../services/post.service";
import Post from "../components/Post";
import Aside from "../components/Aside";


const Home = () => {
  const { userPayload, autenticated } = useAuthContext(); // token viene del contexto
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsService();
        // console.log("response server", response.data);

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // toast error  pending 
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
      className=" md:flex w-screen "
    >

      <div
        className="min-h-screen relative border-red-400 border-2"
      >
        <Aside />
      </div>
      <div
        className="w-1/2 "
      >
        <h1>Home</h1>
        {autenticated ? (
          <div>
            <p>Name: {userPayload.firstName}</p>
            <p>Email: {userPayload.email}</p>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
        {posts.map((post) => {
          return (



            <div key={post._id}>
              <Post
                id={post._id}
                title={post.title}
                // forum={forum.tile}
                content={post.content}
                postImage={post.image[0]}
              />
            </div>
          );
        })}
        {/* {

          loading ? (
            <>
              {autenticated ? (
                <div>
                  <p>Name: {userPayload.firstName}</p>
                  <p>Email: {userPayload.email}</p>
                </div>
              ) : (
                null
              )}
            </>
          ): (
            <p>Loading posts...</p>
          )
        } */}

        {/* {
          
          forums.map((forum) => {
            forum.post.map((post) => {
              return (
                <div key={post._id}>
                  <Post
                    id={post._id}
                    title={post.title}
                    forum={forum.tile}
                    content={post.content}
                    postImage={post.image[0]}
                  />
                </div>
              );
            })
           })
       } */}

        {posts.map((post) => {
          return (



            <div key={post._id}>
              <Post
                id={post._id}
                title={post.title}
                // forum={forum.tile}
                content={post.content}
                postImage={post.image[0]}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Home;
