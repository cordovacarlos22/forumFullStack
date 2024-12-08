import { useContext, useState } from "react";
import { ForumContext } from "../context/forum.context";
import { navLinksAside } from "../utils/navLinks";

const Aside = () => {
  const { setSelectedCategory, selectedCategory } = useContext(ForumContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category in context
    setIsSidebarOpen(false); // Close sidebar after selection
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-28 left-4 z-50 p-3 bg-gray-800 text-white rounded focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <aside
          id="default-sidebar"
          className="fixed top-28  left-0 z-40 w-full h-full bg-gray-800 transform transition-transform"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium text-white mt-4">
              <li>
                <button
                  onClick={() => handleCategoryClick("")}
                  className={`w-full p-2 text-left rounded ${
                    selectedCategory === ""
                      ? "bg-gray-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {navLinksAside.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleCategoryClick(link.value)}
                    className={`w-full p-2 text-left rounded ${
                      selectedCategory === link.name
                        ? "bg-gray-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      {/* Overlay */}
      {/* {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )} */}
    </div>
  );
};

export default Aside;