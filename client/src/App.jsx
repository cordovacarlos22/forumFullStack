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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav></Nav>,

      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/chat", element: <Chat /> },
        { path: "/profile/:userId", element: <Profile /> },
        { path: '/createpost', element: <CreatePosts /> },
        { path: '/post/:id', element: <PostDetail /> },
        /*  ,
        { path: '/PostsProfile', element: <PostsProfile /> },
    /*  { path: '/CreatePosts', element: <CreatePosts /> },
        { path: '/PostsProfile', element: <PostsProfile /> },
        { path: '/Profile', element: <Profile /> }, */
        { path: "/PostsComments", element: <PostsComents /> },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <UsersProvider>
          <ComentProvider>
            <PostProvider>
              <ForumProvider>
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
