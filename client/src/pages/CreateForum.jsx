
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createForum } from "../services/forums.service";




// Validation Schema
const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("description is required"),
  category: yup.string().required("Please select a category"),
}).required();


const CreateForum = () => {

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

      await createForum(data, token);

      toast.success("Forum created successfully!", {
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
        <h1 className="text-2xl font-bold mb-4 p-4 text-white ">Create a New Forum</h1>
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

          {/* description Field */}
          <div>
            <label className="block text-sm font-medium text-white">Description</label>
            <textarea
              {...register("description")}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
  )
}

export default CreateForum