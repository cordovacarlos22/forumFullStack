import { useForm } from "react-hook-form";
import { userRegister } from "../services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(1).required(),
}).required();
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); // parametros de react hook form a utilizar

  const onSubmit = async (data) => {
    //realiza una peticion con la DATA a la API para que esa info se registre como usuario
    console.log(data);

    try {
      toast.info(' waiting for server !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

      const response = await userRegister(data); // se le manda la data a la peticion

      if (response.status === 201) {
        toast.success(' you have registed !', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        // Navigate to login page
        setTimeout(() => {
          setTimeout(() => {
            navigate('/login')

          }, 3000)
          toast.info(' navigating to login !', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        }, 2000)
      }
    } catch (error) {
      //todo :   toastify error message 
      toast.error(`error  has happened:${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };
  return (
    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0 ">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your first name
                  </label>
                  <input
                    id="firstName"
                    type="firstName"
                    name="firstName"
                    placeholder="enter your first name"
                    {...register("firstName", { required: true })}
                    autoComplete="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.first_name && (
                    <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                      <p>{errors.first_name.message}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your last name
                  </label>
                  <input
                    id="lastName"
                    type="lastName"
                    name="lastName"
                    placeholder="enter your last name"
                    {...register("lastName", { required: true })}
                    autoComplete="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.last_name && (
                    <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                      <p>{errors.last_name.message}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.email && (
                    <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                      <p>{errors.email.message}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    {...register("password", { required: true })}
                    autoComplete="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && (
                    <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                      <p>{errors.password.message}</p>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 my-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="mt-10 text-center text-sm text-gray-500 pb-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold leading-6 text-blue-500 hover:text-blue-800"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
