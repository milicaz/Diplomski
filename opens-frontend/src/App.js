import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Navigation } from "./pages/Navigation";
import Logovanje from "./pages/korisnik/Logovanje";
import { Route, Routes } from "react-router-dom/dist";

function App() {
  return (
    <>
      {/* <Navigation /> */}
      {/* <Logovanje /> */}
      <Routes>
        <Route path="/home" element={<Navigation />} />
        <Route path="/" element={<Logovanje />} />
      </Routes>
    </>
  );
}

export default App;
