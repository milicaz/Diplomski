import React from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { opensBojaImage } from "../assets";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import PersistLogin from "../routes/PersistLogin";
import ProtectedRoute from "../routes/ProtectedRoute";
import { DogadjajHome, DogadjajiTrenutno } from "./aktivnosti";
import { NotFound, Unauthorized } from "./errors";
import { Home } from "./Home";
import { Logovanje, MainCheckIn, Registracija } from "./korisnik";
import NeodjavljenePoseteTabela from "./neodjavljene posete/NeodjavljenePoseteTabela";
import OmladinskiCentar from "./omladinski centar/OmladinskiCentar";
import {
  LogoHome,
  MestoDogadjajaHome,
  MestoPoseteHome,
  ObavestenjaHome,
  OpremaHome,
  PrigradskaNaseljaHome,
  TipDogadjajaHome,
  TipOprHome,
} from "./pomocne tabele";
import {
  PasswordReset,
  PasswordResetRequest,
  TextPage,
} from "./reset password";
import Ucesnici from "./Ucesnici";
import ZaposleniHome from "./zaposleni/ZaposleniHome";

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

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/logovanje");
  };

  const { auth } = useAuth();

  const isLoggedIn = auth && auth?.accessToken;
  const user = auth?.email;
  const isAdmin = auth?.roles.includes("ROLE_ADMIN");
  const isSuperAdmin = auth?.roles.includes("ROLE_SUPER_ADMIN");
  const isAdminDogadjaj = auth?.roles.includes("ROLE_ADMIN_DOGADJAJ");

  return (
    <>
      <Navbar bg="light">
        <Container>
          <NavbarBrand as={Link} to="/">
            <img src={opensBojaImage} alt="OPENS" width="150" />
          </NavbarBrand>
          <>
            {isLoggedIn ? (
              <>
                <Nav className="me-auto">
                  {(isAdmin || isSuperAdmin) && (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/omladinski"
                        className={`coworking-dropdown-item ${
                          isActive("/omladinski") ? "active" : ""
                        }`}
                      >
                        Omladinski centar OPENS
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/posete"
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
                          className={`aktivnosti-dropdown-item ${
                            isActive("/dogadjajiTrenutno") ? "active" : ""
                          }`}
                        >
                          Trenutno
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/dogadjaj"
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
                          isActiveDropdown(sifarnikPaths)
                            ? "sifarnik-dropdown"
                            : ""
                        }
                      >
                        <NavDropdown.Item
                          as={Link}
                          to="/obavestenja"
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
                          className={`sifarnik-dropdown-item ${
                            isActive("/tipOpreme") ? "active" : ""
                          }`}
                        >
                          Tip opreme
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/oprema"
                          className={`sifarnik-dropdown-item ${
                            isActive("/oprema") ? "active" : ""
                          }`}
                        >
                          Oprema
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/mestoPosete"
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
                          className={`sifarnik-dropdown-item ${
                            isActive("/mestoDogadjaja") ? "active" : ""
                          }`}
                        >
                          Mesto događaja
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/tipDogadjaja"
                          className={`sifarnik-dropdown-item ${
                            isActive("/tipDogadjaja") ? "active" : ""
                          }`}
                        >
                          Tip događaja
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/prigradskaNaselja"
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
                          className={`sifarnik-dropdown-item ${
                            isActive("/logo") ? "active" : ""
                          }`}
                        >
                          Logoi
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                  {isSuperAdmin && (
                    <Nav.Link
                      as={Link}
                      to="/zaposleni"
                      className={`zaposleni-dropdown-item ${
                        isActive("/zaposleni") ? "active" : ""
                      }`}
                    >
                      Zaposleni
                    </Nav.Link>
                  )}
                  {isAdminDogadjaj && (
                    <Nav.Link
                      as={Link}
                      to="/ucesnici"
                      className={`ucesnici-dropdown-item ${
                        isActive("/ucesnici") ? "active" : ""
                      }`}
                    >
                      Učesnici
                    </Nav.Link>
                  )}
                </Nav>
                {(isAdmin || isSuperAdmin) && (
                  <Nav className="justify-content-end">
                    <Nav.Link
                      as={Link}
                      to="/check-in"
                      className={`registracija-dropdown-item ${
                        isActive("/check-in") ? "active" : ""
                      }`}
                    >
                      Check-in
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/registracija"
                      className={`registracija-dropdown-item ${
                        isActive("/registracija") ? "active" : ""
                      }`}
                    >
                      Registracija posetioca
                    </Nav.Link>
                  </Nav>
                )}
                <Nav className="justify-content-end">
                  <NavDropdown
                    title={
                      <span>
                        <FaUser />
                      </span>
                    }
                  >
                    <NavDropdown.Item disabled>
                      Dobrodošli, {user}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={signOut}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
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
          {/* public routes */}
          <Route path="/logovanje" element={<Logovanje />} />
          <Route path="/forgot-password" element={<PasswordResetRequest />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/text-page" element={<TextPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<Home />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/omladinski"
              element={
                <ProtectedRoute
                  element={<OmladinskiCentar />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/posete"
              element={
                <ProtectedRoute
                  element={<NeodjavljenePoseteTabela />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/dogadjajiTrenutno"
              element={
                <ProtectedRoute
                  element={<DogadjajiTrenutno />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/dogadjaj"
              element={
                <ProtectedRoute
                  element={<DogadjajHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/obavestenja"
              element={
                <ProtectedRoute
                  element={<ObavestenjaHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/tipOpreme"
              element={
                <ProtectedRoute
                  element={<TipOprHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/oprema"
              element={
                <ProtectedRoute
                  element={<OpremaHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/mestoPosete"
              element={
                <ProtectedRoute
                  element={<MestoPoseteHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/mestoDogadjaja"
              element={
                <ProtectedRoute
                  element={<MestoDogadjajaHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/tipDogadjaja"
              element={
                <ProtectedRoute
                  element={<TipDogadjajaHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/prigradskaNaselja"
              element={
                <ProtectedRoute
                  element={<PrigradskaNaseljaHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/logo"
              element={
                <ProtectedRoute
                  element={<LogoHome />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/zaposleni"
              element={
                <ProtectedRoute
                  element={<ZaposleniHome />}
                  allowedRoles={["ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/ucesnici"
              element={
                <ProtectedRoute
                  element={<Ucesnici />}
                  allowedRoles={["ROLE_ADMIN_DOGADJAJ"]}
                />
              }
            />
            <Route
              path="/check-in"
              element={
                <ProtectedRoute
                  element={<MainCheckIn />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
            <Route
              path="/registracija"
              element={
                <ProtectedRoute
                  element={<Registracija />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                />
              }
            />
          </Route>

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
