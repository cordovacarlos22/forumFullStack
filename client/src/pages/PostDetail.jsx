import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ForumContext } from "../context/forum.context";
import Post from "../components/Post";
import Coment from "../components/Coment";

const PostDetail = () => {
  const { id } = useParams();
  const { filteredForums, loading } = useContext(ForumContext);

  const post = filteredForums.flatMap((forum) =>
    forum.posts.filter((post) => post._id === id)
  );
  console.log("post desde PostDetail ", post);
  
  const forumPost = post[0]
  const postComents = forumPost?.comments
  console.log('post coments ', postComents);
  
  

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-full w-full mt-4">
      <h1 className=" text-white ">
        Post {id}
        
      </h1>
        {post && post.length > 0 ? (
        <Post
          key={forumPost._id}
          id={forumPost._id}
          title={forumPost.title}
          forum={
            filteredForums.find((forum) => forum.posts.includes(post))
            ?.title
          }
          content={post.content}
          postImage={post.image && post.image.length > 0 ? post.image[0] : undefined}
        />
        ): (
          <p className="text-gray-400 flex justify-center mt-8">
            Post not found.
          </p>
        )}
        
        <div className=""> 
          {postComents && postComents.length > 0 ? 
          ( postComents.map((comment) => 
            comment.content.map((eachContent, index) => 
              ( <Coment key={`${comment._id} ${index}`} 
                comentId={comment.userId._id} content={eachContent}
                firstName={comment.userId.firstName} 
                lastName={comment.userId.lastName} 
                avatar={comment.userId.avatar} /> 
              )
            ) 
          ) 
        ) :
         ( <p className="h-screen text-gray-400 flex justify-center mt-8">No comments.</p> )
         }
         </div> 
       </div>
         
  );
};

export default PostDetail;
