import { Link } from "react-router-dom";
import { toggleLike } from "../services/like.service";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket"; // Import socket instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post({ id, title, content, postImage, likesCount }) {
    const [like, setLike] = useState(likesCount); // Local state for likes
    const [isLiking, setIsLiking] = useState(false); // For button feedback


    useEffect(() => {

        if (!socket.connected) {
            socket.connect(); // Explicitly connect if not already connected
        }

        setLike(likesCount); // Sync initial likesCount from props
    }, [likesCount]);

    useEffect(() => {
        // Listen for real-time like updates for this specific post
        socket.on("likeUpdated", ({ postId, newLikesCount }) => {
            if (postId === id) {
                setLike(newLikesCount); // Update the like count if it's for this post
            }
        });

        // Cleanup the event listener on unmount
        return () => {
            socket.off("likeUpdated");
        };
    }, [id]);

    const handleLike = async () => {
        const token = localStorage.getItem("token");
        if (isLiking) return; // Prevent double-clicks
        setIsLiking(true); // Show loading state
        if (!token) {
            toast.error("You need to be logged in to like a post", {
                position: "bottom-right",
                autoClose: 5000,
            });
            setIsLiking(false); // Reset button state
            return;
        }

        try {
            const data = { postId: id };
            const response = await toggleLike(data, token);

            if (response.status === 201) {
                const updatedLikes = like + 1;
                setLike(updatedLikes); // Increment likes locally
                socket.emit("like-toggled", { postId: id, newLikesCount: updatedLikes }); // Notify the server
                toast.success(" you have liked the post !", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (response.status === 200) {
                const updatedLikes = like - 1;
                setLike(updatedLikes); // Decrement likes locally
                socket.emit("like-toggled", { postId: id, newLikesCount: updatedLikes }); // Notify the server
                toast.info(" you have disliked the post !", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setIsLiking(false); // Reset button state
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
                                <img
                                    className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md"
                                    src={postImage}
                                    alt={title}
                                />
                            </div>
                        </Link>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleLike}
                                    disabled={isLiking}
                                    className={`w-8 h-8 text-white ${isLiking ? "opacity-50 cursor-not-allowed" : "hover:text-orange-600"}`}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Post;