import { ForumContext } from "../context/forum.context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Aside from "../components/Aside";
import Post from "../components/Post";
const ForumPage = () => {
  const { forums } = useContext(ForumContext);
  const { forumId } = useParams();

  const forum = forums.find((forum) => forum._id === forumId);
  // console.log("foro param desde forumPage", forum);

  const posts = forum?.posts;
  // console.log("posts desde forumPage", posts);
  

  return (
    <>
      <div className="flex">
        <aside className="min-h-screen w-64 bg-gray-800">
          <Aside />
        </aside>

        <main className="min-h-screen flex-1 text-white flex flex-col bg-gray-900 mt-10 justify items-center">
          {forum ? (
            <>
              <section className="py-8 antialiased bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                  <div className="w-full h-full">
                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl ">
                      <div className="flex flex-col md:flex-col md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://i.pinimg.com/736x/d3/5f/70/d35f709f7ecd27747a231b0da3d5c55f.jpg"
                            alt="User Avatar"
                          />
                          <p className="text-lg font-semibold text-white">
                            {forum.title} Forum
                          </p>
                        </div>
                        <div className="text-center md:text-end">
                          <h1 className="text-xl font-semibold text-white">
                            {/* {title} */}
                          </h1>
                          <p className="text-gray-400 mt-2">
                            {forum.description}
                          </p>
                        </div>
                        
                      </div>
                      <section className="p-4 space-y-4">
                          {forum && forum.posts.length > 0 ? (
                            posts.map((post) => (
                              <Post
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                forum={forum.title}
                                content={post.content}
                                postImage={post.image[0]} // Assuming the first image is displayed
                                likesCount={post.likes.length} // Pass the length of the likes array
                              />
                            ))
                          ) : (
                            <main className="flex justify-center items-center h-screen z-0">
                              <p>No posts available for this forum</p>
                            </main>
                          )}
                        </section>
                    </div>
                  </div>
                </div>
                {/* <ToastContainer /> */}
              </section>
            </>
          ) : (
            <h1>Foro no encontrado</h1>
          )}
        </main>
      </div>
    </>
  );
};

export default ForumPage;
