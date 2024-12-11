import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import {
  deleteUserByPassword,
  updateUserPassword,
} from "../services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    password: yup.string().min(1).required(),
    newPassword: yup.string().min(3),
  })
  .required();

const Modal = ({ setModalOpen, selectedButton, setSelectedButton, user }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  console.log(errors);

  const handleDeleteAccount = async (data) => {
    try {
      const response = await deleteUserByPassword(
        data.password,
        user._id,
        token
      );

      if (response.status === 204) {
        toast.success("Account deleted successfully");
        setModalOpen(false);
        setSelectedButton("overview");
        logout();
        navigate("/");
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      toast.error("Error ocurred while deleting account");
    }
  };

  const handleUpdatePassword = async (data) => {
    try {
      const response = await updateUserPassword(data, user._id, token);

      if (response.status === 200) {
        toast.success("Password changed successfully, please log in again.");
        setModalOpen(false);
        setSelectedButton("overview");
        logout();
        navigate("/login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Error occurred while changing password";
      toast.error(message);
    }
  };

  return (
    <>
      {selectedButton === "edit" && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-center">Edit Profile</h2>
            <form>
              <label className="block mb-2 text-m font-medium text-white pt-3">
                First Name
              </label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
              <label className="block mb-2 text-m font-medium text-white pt-3">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("lasttName")}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
              <label className="block mb-2 text-m font-medium text-white pt-3">
                Email
              </label>
              <input
                type="email"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
              <label className="block mb-2 text-m font-medium text-white pt-3">
                Bio
              </label>
              <textarea
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("bio")}
              />
              {errors.bio && (
                <span className="text-red-500 text-sm">
                  {errors.bio.message}
                </span>
              )}
              <label className="block mb-2 text-m font-medium text-white pt-3">
                Avatar URL
              </label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("avatarUrl")}
              />
              {errors.avatarUrl && (
                <span className="text-red-500 text-sm">
                  {errors.avatarUrl.message}
                </span>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedButton("overview");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedButton === "password" && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-center">
              Change Password
            </h2>
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
              <label className="block mb-2 text-m font-medium text-white pt-3">
                Current Password
              </label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("password", {
                  required: "Current password is required",
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}

              <label className="block mb-2 text-m font-medium text-white pt-3">
                New Password
              </label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                autoComplete="off"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 1,
                    message: "Password is required",
                  },
                })}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </span>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedButton("overview");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedButton === "delete" && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 flex justify-center">
              Are you sure?
            </h2>
            <p>Your account will be permanently deleted.</p>
            <p>Please enter your password to confirm.</p>

            {/* Formulario */}
            <form onSubmit={handleSubmit(handleDeleteAccount)}>
              <label className="block mb-2 text-m font-medium text-white pt-3">
                Password
              </label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}

              {/* Botones */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedButton("overview");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
