
const Register = () => {
  return (
      <>
        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0 mt-4">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form >
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your first name
                    </label>
                    <input
                      id="first_name"
                      type="first_name"
                      name="first_name"
                      placeholder="enter your first name"
                      //{...register('first_name', { required: true })}
                      autoComplete='first_name'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* {
                      errors.first_name &&
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.first_name.message}</p>
                      </div>
                    } */}
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your last name
                    </label>
                    <input
                      id="last_name"
                      type="last_name"
                      name="last_name"
                      placeholder="enter your last name"
                      //{...register('last_name', { required: true })}
                      autoComplete='last_name'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* {
                      errors.last_name &&
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.last_name.message}</p>
                      </div>
                    } */}
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your gender
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      //{...register("gender", { required: true })}
                      defaultValue=""

                    >
                      <option disabled value=''>Select gender</option>
                      <option value="M">male</option>
                      <option value="F">female</option>
                    </select>
                    {/* {
                      errors.gender &&
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.gender.message}</p>
                      </div>
                    } */}
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
                   //   {...register('email', { required: true })}
                      autoComplete='email'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* {
                      errors.email &&
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.email.message}</p>
                      </div>
                    } */}
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
                    //  {...register('password', { required: true })}
                      autoComplete='password'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                   {/*  {
                      errors.password &&
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.password.message}</p>
                      </div>
                    } */}
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your role
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     // {...register("role", { required: true })}
                      defaultValue=""
                    >
                      <option disabled value=''>Select role</option>
                      <option value="COSTUMER">costumer</option>
                      <option value="ADMIN">admin</option>
                    </select>
                    {/* {
                      errors.role &&
                      <div className="border border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                        <p>{errors.role.message}</p>
                      </div>
                    } */}
                  </div>
                  <div className="flex items-start  py-2">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        //{...register("terms", { required: true })}

                      />

                    </div>
                    {/* <div className="ml-3 text-sm  ">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <Link
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          to="#"
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div> */}

                  </div>
                  {/* {
                    errors.terms &&
                    <div className="border  border-red-400 rounded bg-red-100 px-4 py-2 mt-2 text-red-700">
                      <p>{errors.terms.message}</p>
                    </div>
                  } */}
                  <button

                    className="w-full text-white bg-blue-600 my-2 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    {/* <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link> */}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
    
      </>
    )
  }

export default Register
