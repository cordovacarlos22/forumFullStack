import { useAuthContext } from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { ForumContext } from "../context/forum.context";
import { UsersContext } from "../context/users.context";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Aside from "../components/Aside";

// import { useParams } from "react-router-dom";
const Profile = () => {
  const { userId } = useParams(); // Obtener el id del usuario
  const { users } = useContext(UsersContext); // Obtener todos los usuarios
  const { userPayload, autenticated } = useAuthContext(); // token viene del contexto
  const { forums } = useContext(ForumContext);
  const [myProfile, setMyProfile] = useState()

  const user = users.find(user => user._id === userId)

  useEffect(() => {
    if (user && user._id === userPayload?._id) {
      setMyProfile(true);
      
    } else {
      setMyProfile(false);
    }
  }, [user, userPayload]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>User not found</h1>
      </div>
    )
  }

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
          

            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-full w-16 h-16"
              />
              <p>{user.firstName}</p>
              <p>{user.email}</p>
            </div>
          
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
}

export default Profile
