import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { opensBojaImage } from "../assets";
import { AuthContext } from "../contexts/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import eventBus from "../utils/eventBus";
import DogadjajHome from "./aktivnosti/DogadjajHome";
import DogadjajiTrenutno from "./aktivnosti/DogadjajTrenutno";
import { Home } from "./Home";
import Logovanje from "./korisnik/Logovanje";
import MainCheckIn from "./korisnik/MainCheckIn";
import Registracija from "./korisnik/Registracija";
import NeodjavljenePoseteTabela from "./neodjavljene posete/NeodjavljenePoseteTabela";
import OmladinskiCentar from "./omladinski centar/OmladinskiCentar";
import {
  MestoDogadjajaHome,
  MestoPoseteHome,
  ObavestenjaHome,
  OpremaHome,
  PrigradskaNaseljaHome,
  TipDogadjajaHome,
  TipOprHome,
} from "./pomocne tabele";
import LogoHome from "./pomocne tabele/logo/LogoHome";
import Ucesnici from "./Ucesnici";
import ZaposleniHome from "./zaposleni/ZaposleniHome";
import PasswordResetRequest from "./reset password/PasswordResetRequest";
import PasswordReset from "./reset password/PasswordReset";
import TextPage from "./reset password/TextPage";

export const Navigation = () => {
  const aktivnostiPaths = ["/dogadjaj", "/dogadjajiTrenutno"];
  const sifarnikPaths = [
    "/obavestenja",
    "/tipOpreme",
    "/oprema",
    "/mestoPosete",
    "/mestoDogadjaja",
    "/tipDogadjaja",
    "/prigradskaNaselja",
    "/logo",
  ];

  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;
  const isActiveDropdown = (pathsArray) =>
    pathsArray.includes(location.pathname);

  const { currentUser, logout } = useContext(AuthContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showProtectedRoutes, setShowProtectedRoutes] = useState(false);

  useEffect(() => {
    setLoggedInUser(currentUser); // dobijam iz context
    console.log("User u useeffcetu: ", currentUser);
    if (loggedInUser) {
      setShowProtectedRoutes(true);
    } else {
      setShowProtectedRoutes(false);
    }

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, [currentUser]);

  const logOut = () => {
    logout();
    setShowProtectedRoutes(false);
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <NavbarBrand href="/">
            <img src={opensBojaImage} alt="OPENS" width="150" />
          </NavbarBrand>
          <>
            {loggedInUser && (
              <>
                <Nav className="me-auto">
                  <Nav.Link
                    as={Link}
                    to="/omladinski"
                    // href="/omladinski"
                    className={`coworking-dropdown-item ${
                      isActive("/omladinski") ? "active" : ""
                    }`}
                  >
                    Omladinski centar OPENS
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/posete"
                    // href="/posete"
                    className={`omladinski-dropdown-item ${
                      isActive("/posete") ? "active" : ""
                    }`}
                  >
                    Nevraćena oprema
                  </Nav.Link>
                  <NavDropdown
                    title="Aktivnosti"
                    className={
                      isActiveDropdown(aktivnostiPaths)
                        ? "aktivnosti-dropdown"
                        : ""
                    }
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/dogadjajiTrenutno"
                      // href="/dogadjajiTrenutno"
                      className={`aktivnosti-dropdown-item ${
                        isActive("/dogadjajiTrenutno") ? "active" : ""
                      }`}
                    >
                      Trenutno
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/dogadjaj"
                      // href="/dogadjaj"
                      className={`aktivnosti-dropdown-item ${
                        isActive("/dogadjaj") ? "active" : ""
                      }`}
                    >
                      Tabela događaja
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Šifarnik"
                    className={
                      isActiveDropdown(sifarnikPaths) ? "sifarnik-dropdown" : ""
                    }
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/obavestenja"
                      // href="/obavestenja"
                      className={`sifarnik-dropdown-item ${
                        isActive("/obavestenja") ? "active" : ""
                      }`}
                    >
                      Obaveštenja
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/tipOpreme"
                      // href="/tipOpreme"
                      className={`sifarnik-dropdown-item ${
                        isActive("/tipOpreme") ? "active" : ""
                      }`}
                    >
                      Tip opreme
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/oprema"
                      // href="/oprema"
                      className={`sifarnik-dropdown-item ${
                        isActive("/oprema") ? "active" : ""
                      }`}
                    >
                      Oprema
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/mestoPosete"
                      // href="/mestoPosete"
                      className={`sifarnik-dropdown-item ${
                        isActive("/mestoPosete") ? "active" : ""
                      }`}
                    >
                      Mesto posete
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/mestoDogadjaja"
                      // href="/mestoDogadjaja"
                      className={`sifarnik-dropdown-item ${
                        isActive("/mestoDogadjaja") ? "active" : ""
                      }`}
                    >
                      Mesto događaja
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/tipDogadjaja"
                      // href="/tipDogadjaja"
                      className={`sifarnik-dropdown-item ${
                        isActive("/tipDogadjaja") ? "active" : ""
                      }`}
                    >
                      Tip događaja
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/prigradskaNaselja"
                      // href="/prigradskaNaselja"
                      className={`sifarnik-dropdown-item ${
                        isActive("/prigradskaNaselja") ? "active" : ""
                      }`}
                    >
                      Prigradska naselja
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/logo"
                      // href="/logo"
                      className={`sifarnik-dropdown-item ${
                        isActive("/logo") ? "active" : ""
                      }`}
                    >
                      Logoi
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    as={Link}
                    to="/zaposleni"
                    // href="/zaposleni"
                    className={`zaposleni-dropdown-item ${
                      isActive("/zaposleni") ? "active" : ""
                    }`}
                  >
                    Zaposleni
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/ucesnici"
                    // href="/ucesnici"
                    className={`ucesnici-dropdown-item ${
                      isActive("/ucesnici") ? "active" : ""
                    }`}
                  >
                    Učesnici
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                  <Nav.Link
                    as={Link}
                    to="/check-in"
                    // href="/check-in"
                    className={`registracija-dropdown-item ${
                      isActive("/check-in") ? "active" : ""
                    }`}
                  >
                    Check-in
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/registracija"
                    // href="/registracija"
                    className={`registracija-dropdown-item ${
                      isActive("/registracija") ? "active" : ""
                    }`}
                  >
                    Registracija posetioca
                  </Nav.Link>
                </Nav>
              </>
            )}
            {loggedInUser ? (
              <Nav className="justify-content-end">
                {/* <Nav.Link> Dobrodošli, {loggedInUser.email}</Nav.Link> */}
                <NavDropdown
                  title={
                    <span>
                      <FaUser />
                    </span>
                  }
                  className={`${
                    isActiveDropdown(sifarnikPaths) ? "sifarnik-dropdown" : ""
                  } dropdown-custom`} // Add custom class here
                  drop="down" // Ensures it opens downwards
                >
                  <NavDropdown.Item disabled> 
                    Dobrodošli, {loggedInUser.email}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={logOut}
                    className={`registracija-dropdown-item`}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="justify-content-end">
                <Nav.Link as={Link} to="/logovanje">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <Routes>
          <Route
            path="/logovanje"
            element={<PublicRoute element={<Logovanje />} restricted={true} />}
          />
          <Route path="/forgot-password"
            element={<PublicRoute element={<PasswordResetRequest />} restricted={true} />}
          >
          </Route>
          <Route path="/ResetPassword"
            element={<PublicRoute element={<PasswordReset />} restricted={true} />}
          >
          </Route>
          <Route path="/TextPage"
            element={<PublicRoute element={<TextPage />} restricted={true} />}
          >
          </Route>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/omladinski"
            element={<ProtectedRoute element={<OmladinskiCentar />} />}
          />
          <Route
            path="/posete"
            element={<ProtectedRoute element={<NeodjavljenePoseteTabela />} />}
          />
          <Route
            path="/dogadjajiTrenutno"
            element={<ProtectedRoute element={<DogadjajiTrenutno />} />}
          />
          <Route
            path="/dogadjaj"
            element={<ProtectedRoute element={<DogadjajHome />} />}
          />
          <Route
            path="/obavestenja"
            element={<ProtectedRoute element={<ObavestenjaHome />} />}
          />
          <Route
            path="/tipOpreme"
            element={<ProtectedRoute element={<TipOprHome />} />}
          />
          <Route
            path="/oprema"
            element={<ProtectedRoute element={<OpremaHome />} />}
          />
          <Route
            path="/mestoPosete"
            element={<ProtectedRoute element={<MestoPoseteHome />} />}
          />
          <Route
            path="/mestoDogadjaja"
            element={<ProtectedRoute element={<MestoDogadjajaHome />} />}
          />
          <Route
            path="/tipDogadjaja"
            element={<ProtectedRoute element={<TipDogadjajaHome />} />}
          />
          <Route
            path="/prigradskaNaselja"
            element={<ProtectedRoute element={<PrigradskaNaseljaHome />} />}
          />
          <Route
            path="/logo"
            element={<ProtectedRoute element={<LogoHome />} />}
          />
          <Route
            path="/zaposleni"
            element={<ProtectedRoute element={<ZaposleniHome />} />}
          />
          <Route
            path="/ucesnici"
            element={<ProtectedRoute element={<Ucesnici />} />}
          />
          <Route
            path="/check-in"
            element={<ProtectedRoute element={<MainCheckIn />} />}
          />
          <Route
            path="/registracija"
            element={<ProtectedRoute element={<Registracija />} />}
          />
        </Routes>
      </div>
    </>
  );
};
