import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage"; // <--- NEW IMPORT
import Login from "./pages/Login";
import Chat from "./pages/Chat";

// Suraksha Chakra (Security Guard)
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Pehla Page: Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          
          {/* Chat Page (Protected) */}
          <Route 
            path="/chat" 
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;