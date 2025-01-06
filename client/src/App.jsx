import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login'
import RootProvider from "./context"
import TeacherHome from "./pages/teacherhome.jsx/home"
import StudentHome from "./pages/studenthome.jsx/home"
import AdminHome from "./pages/adminhome.jsx/home"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/teacherhome",
    element: <TeacherHome/>
  },
  {
    path: "/studenthome",
    element: <StudentHome/>
  },
  {
    path: "/adminhome",
    element: <AdminHome/>
  },
  {
    path: "*",
    element: <h1>404 - Not Found</h1>
  },
])

export default function App() {
  return (
  (
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>
 )   
  )
}
