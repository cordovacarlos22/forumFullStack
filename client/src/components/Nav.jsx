import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";
import { useEffect, useState, useContext } from "react";
import { getMyUserService } from "../services/user.service";
import { ForumContext } from "../context/forum.context";

const Nav = () => {
  const { autenticated, logout, userPayload } = useAuthContext();
  const [user, setUser] = useState(null);
  const { setSearchTerm } = useContext(ForumContext);
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

  const handleSearch = (e) => {
    setSearchInput(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim().toLowerCase());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
      <nav className="relative bg-gray-900 z-50">
        <div className="fixed  flex-wrap top-0 flex flex-1 justify-between gap-2 items-center p-4 w-full bg-gray-900 border-b border-gray-800">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <svg
              className="w-[48px] h-[48px]  text-white"
              xmlns="http://www.w3.org/2000/svg"
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
            <span className="text-2xl font-semibold  text-white">
              MushRoom-Forum
            </span>
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="block sm:hidden text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Search Bar */}
          <div
            className={`${menuOpen ? "block" : "hidden"
              } sm:flex items-center mx-3 w-auto sm:w-1/2`}
          >
            <form
              onSubmit={handleSubmit}
              className="w-full relative flex items-center"
            >
              <input
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearch}
                className="block w-full p-4 pl-10 text-sm  border  rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600  placeholder-gray-400 text-white"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-10 text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 absolute right-2"
              >
                Search
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div
            className={`${menuOpen ? "block" : "hidden"
              } sm:flex items-center space-x-6`}
          >
            {autenticated ? (
              <>
                <NavLink to="/" onClick={logout}>
                  <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 font-medium rounded-lg text-sm px-5 py-2.5">
                    Logout
                  </button>
                </NavLink>
                {user && (
                  <NavLink to={`/profile/${user.user._id}`}>
                    <img
                      src={user.user.avatar}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </NavLink>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 font-medium rounded-lg text-sm px-5 py-2.5">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;