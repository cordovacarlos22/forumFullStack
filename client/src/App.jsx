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