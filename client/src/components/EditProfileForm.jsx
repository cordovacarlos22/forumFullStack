
const EditProfileForm = ({ user, onSubmit, register, errors, onClick }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4 text-center">Edit Profile</h2>
        <p>Please change the fields you want to update</p>
        <form onSubmit={onSubmit}>
          <label className="block mb-2 text-m font-medium text-white pt-3">
            First Name
          </label>
          <input
            type="text"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
            defaultValue={user.firstName}
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
            defaultValue={user.lastName}
            {...register("lastName")}
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
            defaultValue={user.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <label className="block mb-2 text-m font-medium text-white pt-3">
            Bio
          </label>
          <textarea
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
            defaultValue={user.bio}
            {...register("bio")}
          />
          {errors.bio && (
            <span className="text-red-500 text-sm">{errors.bio.message}</span>
          )}
          <label className="block mb-2 text-m font-medium text-white pt-3">
            Avatar URL
          </label>
          <input
            type="text"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4 text-black"
            defaultValue={user.avatar}
            {...register("avatarUrl")}
          />
          {errors.avatarUrl && (
            <span className="text-red-500 text-sm">
              {errors.avatarUrl.message}
            </span>
          )}

          <label className="block mb-2 text-m font-medium text-white pt-3">
            Use your password to confirm your changes
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
  );
};

export default EditProfileForm;
