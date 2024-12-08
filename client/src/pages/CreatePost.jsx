import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ForumContext } from "../context/forum.context";
import { createPost } from "../services/post.service";
import { useAuthContext } from "../hooks/useAuth";

// Validation Schema
const schema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  forumId: yup.string().required("Please select a forum"),
  file: yup
    .mixed()
    .notRequired()
    .test("fileType", "Only image files are allowed", (value) => {
      // Skip validation if no file is provided
      if (!value || value.length === 0) return true;

      // Validate file type if provided
      return (
        value[0] &&
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(value[0]?.type)
      );
    }),
  category: yup.string().required("Please select a category"),
}).required();

const CreatePost = () => {
  const { forums } = useContext(ForumContext); // Access forums from context
  const { userPayload } = useAuthContext(); // Get user details
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("You need to be logged in to create a post", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("forumId", data.forumId);
      formData.append("category", data.category);
      formData.append("file", data.file[0]); // Add the single file

      await createPost(formData, token);

      toast.success("Post created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(`Failed to create post: ${error.response?.data?.message || error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <section
      className="bg-gray-900 min-h-screen flex justify-center items-center pt-24 ">
      <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 ">
        <h1 className="text-2xl font-bold mb-4 p-4 text-white ">Create a New Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 ">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-white ">Title</label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 p-2  block w-full  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-white">Content</label>
            <textarea
              {...register("content")}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          {/* Forum Dropdown */}
          <div>
            <label className="block text-sm font-medium text-white">Forum</label>
            <select
              {...register("forumId")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a forum</option>
              {forums.map((forum) => (
                <option key={forum._id} value={forum._id}>
                  {forum.title}
                </option>
              ))}
            </select>
            {errors.forumId && <p className="text-red-500 text-sm">{errors.forumId.message}</p>}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-white">Category</label>
            <select
              {...register("category")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {["Tech", "Games", "Lifestyle", "Memes"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-white">Image</label>
            <input
              type="file"
              {...register("file")}
              accept="image/*"
              className="mt-1 block w-full text-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <ToastContainer />
      </div>
    </section>
  );
};

export default CreatePost;