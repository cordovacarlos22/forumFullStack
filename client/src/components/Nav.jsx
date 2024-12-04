import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getMyUserService } from "../services/user.service";

const Nav = () => {
  const { autenticated, logout, userPayload } = useAuthContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = userPayload?._id;
        if (token && userId) {
          const response = await getMyUserService(token, userId);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (autenticated && userPayload?._id) {
      fetchUserData();
    }
  }, [autenticated, userPayload]);

  return (
    <>
      <nav className="max-w-screen bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex justify-between p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="w-[48px] h-[48px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MushRoom-Forum
            </span>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {autenticated ? (
              <>
                <NavLink to="/" onClick={logout}>
                  <button
                    type="button"
                    className=" text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2"
                  >
                    Cerrar Sesión
                  </button>
                </NavLink>
                {user && (
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <img
                      src={user.user.avatar}
                      alt="User Avatar"
                      className="w-[41px] h-[41px] rounded-full object-cover"
                    />
                  </button>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <button
                  type="button"
                  className=" text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2"
                >
                  Iniciar Sesión
                </button>
              </NavLink>
            )}
          </div>
        </div>
        <Outlet />
      </nav>
    </>
  );
};

export default Nav;
