import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import {
  deleteUserByPassword,
  updateUserPassword,
  updateUserInfo,
} from "../services/auth.service";
import EditProfileForm from "./EditProfileForm";
import EditPasswordForm from "./EditPasswordForm";
import DeleteProfileForm from "./DeleteProfileForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    password: yup.string().min(1).required(),
    newPassword: yup.string().min(3),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(),
    bio: yup.string(),
    avatarUrl: yup.string().url(),
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

  const handleUpdateProfile = async (data) => {
    try {
      const response = await updateUserInfo(data, user._id, token);

      if (response.status === 200) {
        toast.success("Profile updated successfully, please log in again.", {
          position: "bottom-right",
          autoclose: 3000,
        });
        setTimeout(() => {
          setModalOpen(false);
          setSelectedButton("overview");
          logout();
          navigate("/login");
        }, 3000);
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Error occurred while updating profile: wrong password";
      toast.error(message, {
        position: "bottom-right",
        autoclose: 4000,
      });
    }
  };

  const handleUpdatePassword = async (data) => {
    try {
      const response = await updateUserPassword(data, user._id, token);

      if (response.status === 200) {
        toast.success("Password changed successfully, please log in again.", {
          position: "bottom-right",
          autoclose: 3000,
        });
        setTimeout(() => {
          setModalOpen(false);
          setSelectedButton("overview");
          logout();
          navigate("/login");
        }, 3000);
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      toast.error(
        "Error occurred while changing password: wrong current password",
        {
          position: "bottom-right",
          autoclose: 3000,
        }
      );
    }
  };

  const handleDeleteAccount = async (data) => {
    try {
      const response = await deleteUserByPassword(
        data.password,
        user._id,
        token
      );

      if (response.status === 204) {
        toast.success("Account deleted successfully", {
          position: "bottom-right",
          autoclose: 3000,
        });
        setTimeout(() => {
          setModalOpen(false);
          setSelectedButton("overview");
          logout();
          navigate("/");
        }, 3000);
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      toast.error("Error ocurred while deleting account: wrong password", {
        position: "bottom-right",
        autoclose: 3000,
      });
    }
  };

  return (
    <>
      {selectedButton === "edit" && (
        <EditProfileForm
          user={user}
          onSubmit={handleSubmit(handleUpdateProfile)}
          register={register}
          errors={errors}
          onClick={() => {
            setSelectedButton("overview");
            setModalOpen(false);
          }}
        />
      )}

      {selectedButton === "password" && (
        <EditPasswordForm
          onSubmit={handleSubmit(handleUpdatePassword)}
          register={register}
          errors={errors}
          onClick={() => {
            setSelectedButton("overview");
            setModalOpen(false);
          }}
        />
      )}

      {selectedButton === "delete" && (
        <DeleteProfileForm
          onSubmit={handleSubmit(handleDeleteAccount)}
          register={register}
          errors={errors}
          onClick={() => {
            setSelectedButton("overview");
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Modal;
