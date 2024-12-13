import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Coment from "../components/Coment";
import Aside from "../components/Aside";
import CreateComent from "../components/CreateComent";

const PostDetail = () => {
  const { id } = useParams();
  const { filteredForums, loading } = useContext(ForumContext);
  const [comentText, setComentText] = useState(false);

  const handleInputFocus = () => {
    setComentText(true);
  };

  const handleInputBlur = () => {
    setComentText(false);
  };

  const post = filteredForums.flatMap((forum) =>
    forum.posts.filter((post) => post._id === id)
  );

  const forumPost = post[0];
  const postComents = forumPost?.comments;
  console.log("post coments ", postComents);

  return (
    <div className="md:flex w-screen min-h-screen bg-gray-900">
      <aside className="absolute min-h-screen w-64 bg-gray-800">
        <Aside />
      </aside>

      <div className="flex flex-col items-center justify-center w-screen mt-6">
        {/* Contenedor del post */}
        <div className="mb-4 w-full max-w-2xl">
          {post && post.length > 0 ? (
            <Post
              key={forumPost._id}
              id={forumPost._id}
              title={forumPost.title}
              forum={
                filteredForums.find((forum) => forum.posts.includes(post))
                  ?.title
              }
              content={forumPost.content}
              postImage={
                forumPost.image && forumPost.image.length > 0
                  ? forumPost.image[0]
                  : undefined
              }
            />
          ) : (
            <p className="text-gray-400 flex justify-center mt-8">
              Post not found.
            </p>
          )}
        </div>

        {/* Contenedor del input o formulario de comentario */}
        <div className="mb-4 w-full max-w-2xl">
          {comentText ? (
            <CreateComent onClick={handleInputBlur} />
          ) : (
            <input
              type="text"
              className="w-full border-2 bg-gray-800 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
              placeholder="Write a coment"
              onFocus={handleInputFocus}
            />
          )}
        </div>

        {/* Contenedor de los comentarios */}
        <div className="w-full max-w-2xl">
          {postComents && postComents.length > 0 ? (
            postComents.map((comment) =>
              comment.content.map((eachContent, index) => (
                <Coment
                  key={`${comment._id} ${index}`}
                  comentId={comment.userId._id}
                  content={eachContent}
                  firstName={comment.userId.firstName}
                  lastName={comment.userId.lastName}
                  avatar={comment.userId.avatar}
                />
              ))
            )
          ) : (
            <p className="text-gray-400 flex justify-center mt-8">
              No comments.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
