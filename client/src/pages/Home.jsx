import { useAuthContext } from "../hooks/useAuth";
import { useContext, useState } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Aside from "../components/Aside";
import LoadingSpinner from "../components/LoadingSpinner";
import ChatBubble from "../components/chatBubble";
import Chat from "../components/Chat";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext();
  const { filteredForums, loading } = useContext(ForumContext);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatButton = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return loading ? (
    <article className="relative w-screen">
      <LoadingSpinner />
    </article>
  ) : (
    <div className="flex">
      {/* Aside Section */}
      <aside className="min-h-screen w-64 bg-gray-800">
        <Aside />
      </aside>

      {/* Main Content */}
      <main className="min-h-screen flex-1 text-white flex flex-col bg-gray-900 mt-8 justify-center items-center">
        {/* Header */}

        {/* User Info */}
        <section className="p-4">
          {autenticated && (
            <div className="flex justify-center items-center pt-10">
              <h2>
                Welcome, {userPayload.firstName} {userPayload.lastName}
              </h2>
              <ChatBubble onclick={handleChatButton} />
              <Chat isOpen={isChatOpen} onClose={handleChatClose} />
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
                  postImage={post.image[0]} // Assuming the first image is displayed
                  likesCount={post.likes.length}
                  comentsCount={post.comments.length} // Pass the length of the likes array
                />
              ))
            )
          ) : (
            <main className="flex justify-center items-center h-screen z-0">
              <p>No forums or posts available for this category</p>
              <Aside />
            </main>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
