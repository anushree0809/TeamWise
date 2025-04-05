import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check localStorage for stored user data on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("userData");
      }
    }
    setLoading(false);
  }, []);

  // 🔹 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <div style={{ display: "flex" }}>
                {/* <Sidebar userData={userData} /> */}
                <MainPage userData={userData} onLogout={handleLogout} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
      </Routes>
    </Router>
  );
};

export default App;
