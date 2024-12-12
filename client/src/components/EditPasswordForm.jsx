const EditPasswordForm = ({ onSubmit, register, errors, onClick }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-center">
              Change Password
            </h2>
            <form onSubmit={onSubmit}>
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
                  onClick={onClick}
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
  )
}

export default EditPasswordForm
