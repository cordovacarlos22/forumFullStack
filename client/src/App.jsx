
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import ErrorPage from './pages/Errorpage'

 function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav></Nav>,

      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
  /*    { path: '/', element: <Login /> },
        { path: '/', element: <Register /> },
        { path: '/CreatePosts', element: <CreatePosts /> },
        { path: '/PostsProfile', element: <PostsProfile /> },
        { path: '/Profile', element: <Profile /> }, 
        { path: '/PostsComments', element: <PostsComments /> }, */
      ],
    }
  ])



  return (
    <>
    <RouterProvider router={router}/>
    </>

import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from './pages/Register'
import { AuthProvider } from "./context/authContext"

export default function App() {
  return (
   <>
   <AuthProvider>
   <Login/>

   </AuthProvider>

   </>

  )
}

export default App