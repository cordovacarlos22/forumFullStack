import Home from "./pages/Home";
import { useState } from "react";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Forums from "./pages/Forums";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ErrorPage from "./pages/Errorpage";
import ForumPage from "./pages/ForumPage";
import PostDetail from "./pages/PostDetail";
import CreatePosts from "./pages/CreatePost";
import CreateForum from "./pages/CreateForum";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ChatBubble from "./components/ChatBubble";
import { PostProvider } from "./context/postContext";
import { AuthProvider, AuthContext } from "./context/authContext";
import PostsComents from "./components/PostsComents";
import { UsersProvider } from "./context/users.context";
import { ForumProvider } from "./context/forum.context";
import ProtectedRoute from "./components/ProtectedRoute";
import { ComentProvider } from "./context/comments.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";

// Componente para manejar Chat y ChatBubble
function ChatComponents() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { autenticated } = useContext(AuthContext);

  const handleChatButton = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  if (!autenticated) return null;

  return (
    <>
      <ChatBubble onClick={handleChatButton} />
      <Chat isOpen={isChatOpen} onClose={handleChatClose} />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <ChatComponents />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: (
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          ),
        },
        { path: "/profile/:userId", element: <Profile /> },
        { path: "/createpost", element: <CreatePosts /> },
        { path: "/createforum", element: <CreateForum /> },
        { path: "/post/:id", element: <PostDetail /> },
        { path: "/PostsComments", element: <PostsComents /> },
        { path: "/forums/", element: <Forums /> },
        { path: "/forum/:forumId", element: <ForumPage /> },
      ],
    },
  ]);

  return (
    <>
      {/* Global ToastContainer */}
      <ToastContainer />

      {/* Context Providers */}
      <AuthProvider>
        <UsersProvider>
          <ComentProvider>
            <PostProvider>
              <ForumProvider>
                {/* Router */}
                <RouterProvider router={router} />
              </ForumProvider>
            </PostProvider>
          </ComentProvider>
        </UsersProvider>
      </AuthProvider>
    </>
  );
}

export default App;
