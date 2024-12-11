import { useAuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Aside from "../components/Aside";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext();
  const { filteredForums, loading } = useContext(ForumContext);

  return (
    loading ? (
      <article className="relative w-screen">
        <LoadingSpinner />
      </article>
    ) : (
      <div
        className="flex"
      >
        {/* Aside Section */}

        <Aside />

        {/* Main Content */}
        <main className=" min-h-screen flex-1 text-white flex flex-col bg-gray-900 mt-8 justify-center items-center">
          {/* Header */}

          {/* User Info */}
          <section className="p-4">
            {autenticated && (
              <div className="flex justify-center items-center pt-6">
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
                forum.posts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    forum={forum.title}
                    content={post.content}
                    postImage={post.image[0]}
                  />
                ))
              )
            ) : (
              <main className=" flex justify-center items-center h-screen">
                <p>No forums or posts available for this category</p>
                <Aside />
              </main>
            )}
          </section>
        </main>
      </div>
    )
  );
};

export default Home;