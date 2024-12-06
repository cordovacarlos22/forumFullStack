import { useAuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Aside from "../components/Aside";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext(); // token viene del contexto
  const { forums } = useContext(ForumContext);

  return (
    <div className="md:flex w-screen min-h-screen bg-gray-900">
      {/* Aside Section */}
      <aside className="min-h-screen w-64 bg-gray-800">
        <Aside />
      </aside>

      {/* Main Content */}
      <main className="flex-1 text-white flex flex-col bg-gray-900">
        {/* Header */}
        <header className="p-4">
          <h1 className="text-2xl font-bold">Home</h1>
        </header>

        {/* User Info */}
        <section className="p-4">
          {autenticated ? (
            <div>
              <p>Name: {userPayload.firstName}</p>
              <p>Email: {userPayload.email}</p>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}
        </section>

        {/* Forum Posts */}
        <section className="p-4 space-y-4">
          {forums && forums.length > 0 ? (
            forums.map((forum) =>
              forum.posts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  forum={forum.title} // Verify if this should be "title"
                  content={post.content}
                  postImage={post.image[0]}
                />
              ))
            )
          ) : (
            <p>No forums or posts available</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;