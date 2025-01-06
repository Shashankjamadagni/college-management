import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import RootProvider from "./context"
import TeacherHome from "./pages/teacherhome.jsx/home"
import StudentHome from "./pages/studenthome.jsx/home"
import AdminHome from "./pages/adminhome.jsx/home"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
  (
    <RootProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/teacherhome" element={<ProtectedRoute element={<TeacherHome />} />}/>
          <Route path="/studenthome" element={<ProtectedRoute element={<StudentHome />} />}/>
          <Route path="/adminhome" element={<ProtectedRoute element={<AdminHome />} />}/>
          <Route path="*" element={<h1>404 - Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </RootProvider>
 )   
  )
}
