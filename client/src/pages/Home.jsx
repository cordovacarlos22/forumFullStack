import { useAuthContext } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { getPostsService } from "../services/post.service";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext(); // token viene del contexto
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsService();
        console.log(response.data);

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
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
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} />}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
