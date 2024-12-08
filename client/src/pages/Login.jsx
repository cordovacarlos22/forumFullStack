import { useForm } from "react-hook-form";
import { userLogin } from "../services/auth.service";
import { useAuthContext } from "../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(1).required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (loginData) => {
    try {
      toast.info(" waiting for server !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const response = await userLogin(loginData);
      if (response.status === 200) {
        login(response.data.token);

        toast.success(" login succesfull !", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(`please verify credentials `, {
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
  };

  return (
    <>
      <div className="flex w-full bg-gray-900  min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <>
          <section className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 p-2">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm  p-4 rounded-md ">
              <h1 className="mt-10 text-center text-white font-extrabold  text-2xl  leading-9 tracking-tight ">
                Sign in to your account
              </h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address:
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="email@example.com"
                      autoComplete="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.email && (
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.email?.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password:
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      {...register("password", { required: true })}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.password && (
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.password?.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 my-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500 pb-2">
                Do not have an Account?{" "}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-blue-500 hover:text-blue-800"
                >
                  Sign Up
                </Link>
              </p>
            </div>
        </section>
        </>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
