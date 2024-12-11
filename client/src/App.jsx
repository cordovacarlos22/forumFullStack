import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/Errorpage";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/authContext";
import { UsersProvider } from "./context/users.context";
import { PostProvider } from "./context/postContext";
import { ForumProvider } from "./context/forum.context";
import { ComentProvider } from "./context/comments.context";
import PostsComents from "./components/PostsComents";
import CreatePosts from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import CreateForum from "./pages/CreateForum";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login", element:
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
        },
        {
          path: "/register", element:
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
        },
        { path: "/chat", element: <Chat /> },
        { path: "/profile/:userId", element: <Profile /> },
        { path: "/createpost", element: <CreatePosts /> },
        { path: "/createforum", element: <CreateForum /> },
        { path: "/post/:id", element: <PostDetail /> },
        { path: "/PostsComments", element: <PostsComents /> },
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