import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Forums from "./pages/Forums";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ErrorPage from "./pages/Errorpage";
import PostDetail from "./pages/PostDetail";
import CreatePosts from "./pages/CreatePost";
import CreateForum from "./pages/CreateForum";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PostProvider } from "./context/postContext";
import { AuthProvider } from "./context/authContext";
import PostsComents from "./components/PostsComents";
import { UsersProvider } from "./context/users.context";
import { ForumProvider } from "./context/forum.context";
import ProtectedRoute from "./components/ProtectedRoute";
import { ComentProvider } from "./context/comments.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        { path: "/forum/", element: <Forums /> },
        /* { path: "/forum/:id", element: <ForumPage /> } */
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