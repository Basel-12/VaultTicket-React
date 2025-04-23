import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Events from "./pages/Events";
import EventsAdmin  from './pages/admin/Events'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><EventsAdmin /></ProtectedRoute>}/>
          <Route path="*" element={<h1>NotFound</h1>} />
        </Routes>
        <ToastContainer theme="dark" />
      </AuthProvider>
    </Router>
  );
}

export default App;
