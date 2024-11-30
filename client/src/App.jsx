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
  )
}

export default App