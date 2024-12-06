
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/Errorpage'
import Chat from './components/Chat'
//import Profile from './pages/Profile'
import { AuthProvider } from "./context/authContext"
import { UsersProvider } from './context/users.context'
import { PostProvider } from './context/postContext'
import { ForumProvider } from './context/forum.context'

 function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav></Nav>,

      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/chat', element: <Chat /> },
        /*  { path: '/CreatePosts', element: <CreatePosts /> },
        { path: '/Profile', element: <Profile /> }, 
        { path: '/PostsProfile', element: <PostsProfile /> },
        { path: '/PostsComments', element: <PostsComments /> }, */
      ],
    }
  ])



  return (
    <>
    <AuthProvider>
    <UsersProvider>
    <ForumProvider>
    <PostProvider>
    <RouterProvider router={router}/>
    </PostProvider>
    </ForumProvider>
    </UsersProvider>
    </AuthProvider>
    </>

  )
}
export default App

