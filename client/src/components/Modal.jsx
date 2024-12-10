import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import { deleteUserByPassword } from "../services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    password: yup.string().min(1).required(),
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

  const handleDeleteAccount = async (data) => {
    try {
      const response = await deleteUserByPassword(data.password, user._id, token)

      if (response.status === 204) {
        toast.success("Account deleted successfully");
        setModalOpen(false)
        setSelectedButton("overview");
        logout();
        navigate("/");
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      toast.error('Error ocurred while deleting account');
    }
  }

  return (
    <>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
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

      {selectedButton === "edit" && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-center">Edit Profile</h2>
            <p className="mb-2 text-center">
              Functionality under construction.
            </p>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setModalOpen(false);
                setSelectedButton("overview");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
