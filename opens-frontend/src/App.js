import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Navigation } from "./pages/Navigation";
import Logovanje from "./pages/korisnik/Logovanje";
import { Route, Routes } from "react-router-dom/dist";
import { useEffect, useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn && loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      {!isLoggedIn ? (
        <Logovanje onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Navigation onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
