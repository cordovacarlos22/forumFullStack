import { useAuthContext } from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { ForumContext } from "../context/forum.context";
import { UsersContext } from "../context/users.context";
import { CommentContext } from "../context/comments.context";
import { useParams } from "react-router-dom";
import Coment from "../components/Coment";
import Post from "../components/Post";
import Aside from "../components/Aside";

// import { useParams } from "react-router-dom";
const Profile = () => {
  const { userId } = useParams(); // Obtener el id del usuario
  const { users } = useContext(UsersContext); // Obtener todos los usuarios
  const { userPayload } = useAuthContext(); // token viene del contexto
  const { forums } = useContext(ForumContext);
  const { comments } = useContext(CommentContext);
  const [myProfile, setMyProfile] = useState();
  const [selectedButton, setSelectedButton] = useState("");

  const user = users.find((user) => user._id === userId);

  useEffect(() => {
    if (user && user._id === userPayload?._id) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }
    setSelectedButton("overview");
  }, [user, userPayload]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>User not found</h1>
      </div>
    );
  }

  const userPosts = forums.flatMap((forum) =>
    forum.posts.filter((post) => post.author._id === userId)
  );

  const userComments = comments.filter(
    (comment) => comment.userId._id === userId
  );

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

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
            <p className="font-bold">{user.firstName}</p>
            <p className="font-bold">{user.email}</p>
          </div>
        </section>

        <section>
          <div className="w-full h-px bg-gray-700 m-4 ">
            <div>
              <button
                className={`hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-4 ${
                  selectedButton === "overview" ? "bg-gray-700" : ""
                }`}
                onClick={() => handleButtonClick("overview")}
              >
                Overview
              </button>
              <button
                className={`hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-4 ${
                  selectedButton === "posts" ? "bg-gray-700" : ""
                }`}
                onClick={() => handleButtonClick("posts")}
              >
                Posts
              </button>
              <button
                className={`hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-4 ${
                  selectedButton === "comments" ? "bg-gray-700" : ""
                }`}
                onClick={() => handleButtonClick("comments")}
              >
                Comments
              </button>
              {myProfile && (
                <>
                  <button className=" hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ml-4">
                    Edit Profile
                  </button>
                  <button className=" hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4">
                    Delete Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* User Forum Posts */}
        <section className="p-4 mt-8 space-y-4">
          {selectedButton === "overview" && (
            <div>
              {myProfile || (userPosts && userPosts.length > 0) ? (
                userPosts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    forum={
                      forums.find((forum) => forum.posts.includes(post))?.title
                    } // Título del foro
                    content={post.content}
                    postImage={post.image[0]}
                    //boton para borrar el post desde el perfil
                  />
                ))
              ) : (
                <p className="text-gray-400 flex justify-center mt-8">
                  {user.firstName} has not posted yet.
                </p>
              )}
            </div>
          )}

          {selectedButton === "posts" && (
            <div>
              {myProfile || (userPosts && userPosts.length > 0) ? (
                userPosts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    forum={
                      forums.find((forum) => forum.posts.includes(post))?.title
                    } // Título del foro
                    content={post.content}
                    postImage={post.image[0]}
                    //boton para borrar el post desde el perfil
                  />
                ))
              ) : (
                <p className="text-gray-400 flex justify-center mt-8">
                  {user.firstName} has not posted yet.
                </p>
              )}
            </div>
          )}

          {selectedButton === "comments" && (
            <div>
              {myProfile || (userComments && userComments.length > 0) ? (
                userComments.map((comment) => (
                  <Coment
                    key={comment._id}
                    id={comment._id}
                    content={comment.content}
                    //boton para borrar el post desde el perfil
                  />
                ))
              ) : (
                <p className="text-gray-400 flex justify-center mt-8">
                  {user.firstName} has not commented yet.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
