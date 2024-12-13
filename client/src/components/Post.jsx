import { Link, useNavigate } from "react-router-dom";
import { toggleLike } from "../services/like.service";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket"; // Import socket instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import shareIcon from '../assets/shareIcon.svg'

function Post({ id, title, content, postImage, likesCount, comentsCount }) {
  const [like, setLike] = useState(likesCount); // Local state for likes
  const [isLiking, setIsLiking] = useState(false); // For button feedback
  const [share, setShare] = useState(false)
  const navigate = useNavigate();

  function copy() {
    const postUrl = `${window.location.origin}/post/${id}`; // URL específica del post
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        toast.success("Post URL copied to clipboard!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch(err => {
        toast.error("Failed to copy URL. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
  }

  useEffect(() => {
    if (share === true) {
      setTimeout(() => {
        setShare(false);
      }, 3000);
    }
  }, [share]);

  // WebSocket setup to listen for real-time updates
  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); // Explicitly connect if not already connected
    }

    const handleLikeUpdated = ({ postId, newLikesCount }) => {
      if (postId === id) {
        setLike(newLikesCount); // Update like count for this post
      }
    };

    socket.on("likeUpdated", handleLikeUpdated);

    return () => {
      socket.off("likeUpdated", handleLikeUpdated); // Cleanup listener on unmount
    };
  }, [id]);

  // Handle the like button click
  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (isLiking) return; // Prevent double-clicks
    setIsLiking(true);

    if (!token) {
      toast.error("You need to be logged in to like a post", {
        position: "bottom-right",
        autoClose: 5000,
      });
      setIsLiking(false);
      return;
    }

    const updatedLikes = like + (like === likesCount ? 1 : -1); // Optimistically update like count
    setLike(updatedLikes);

    try {
      const data = {
        postId: id,
        content:""
       };
      const response = await toggleLike(data, token);

      if (response.status === 201 || response.status === 200) {
        socket.emit("like-toggled", {
          postId: id,
          newLikesCount: updatedLikes,
        }); // Notify server
        toast.success(
          response.status === 201
            ? "You have liked the post!"
            : "You have disliked the post!",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        setLike(like); // Rollback like count on failure
        throw new Error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setLike(like); // Rollback like count on error
      toast.error(
        "An error occurred while toggling the like. Please try again.",
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <section key={id} className="py-8 antialiased bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full">
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl border border-stone-200">
            <Link to={`/post/${id}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pinimg.com/736x/d3/5f/70/d35f709f7ecd27747a231b0da3d5c55f.jpg"
                    alt="User Avatar"
                  />
                  <p className="text-lg font-semibold text-white">tech</p>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-xl font-semibold text-white">{title}</h1>
                  <p className="text-gray-400 mt-2">{content}</p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                {postImage ? (
                  <>
                    <img
                      className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md"
                      src={postImage}
                      alt={title}
                    />
                  </>
                ) : null}
              </div>
            </Link>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`w-8 h-8 text-white ${
                    isLiking
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-orange-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                    />
                  </svg>
                </button>
                <span className="text-white">{like}</span>
                <button type="button"
                onClick={()=> navigate(`/post/${id}`)}>
                  <svg
                    className="w-6 h-6 text-white hover:text-orange-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
                    />
                  </svg>
                </button>
                {comentsCount > 0 ? (
                    <h1 className="text-white">{comentsCount}</h1>
                ): (
                    <h1 className="text-white">0</h1>
                )}
              <button
               type="button"
               className="flex items-center space-x-2 text-white hover:text-orange-600"
               onClick={() => { copy() } }>
                  <img
                    
                    src={shareIcon} alt="Share" className="w-6 h-6 bg-gray-300 rounded-md   " />
                <p>Share</p>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </section>
  );
}

export default Post;
