import { useAuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Aside from "../components/Aside";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext();
  const { filteredForums, loading } = useContext(ForumContext);

  return loading ? (
    <article className="relative w-screen">
      <LoadingSpinner />
    </article>
  ) : (
    <>
      {/* Main Content */}
      <main className="flex-1 text-white flex flex-col bg-gray-900 mt-8 justify-center items-center">
        {/* Header */}
        <header className="p-4">
          <h1 className="text-2xl font-bold">Home</h1>
        </header>

        {/* User Info */}
        <section className="p-4">
          {autenticated && (
            <div>
              <h2>
                Welcome, {userPayload.firstName} {userPayload.lastName}
              </h2>
            </div>
          )}
        </section>

        {/* Forum Posts */}
        <section className="p-4 space-y-4">
          {filteredForums.length > 0 ? (
            filteredForums.map((forum) =>
              forum.posts?.length > 0 ? (
                forum.posts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    forum={forum.title}
                    content={post.content}
                    postImage={post.image?.[0]} // Handle missing images gracefully
                  />
                ))
              ) : (
                <div key={forum._id} className="text-center h-screen flex justify-center items-center">
                  <p className="text-gray-500">
                    No posts available in the forum: <strong>{forum.title}</strong>
                  </p>
                </div>
              )
            )
          ) : (
            <main className="flex flex-col justify-center items-center h-screen">
              <p className="text-gray-500">No forums or posts match your search.</p>
              <Aside />
            </main>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;