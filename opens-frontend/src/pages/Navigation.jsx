import React from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { Route, Routes, useLocation } from "react-router-dom";
import { opensBojaImage } from "../assets";
import { Home } from "./Home";
import DogadjajHome from "./aktivnosti/DogadjajHome";
import Logovanje from "./korisnik/Logovanje";
import MainCheckIn from "./korisnik/MainCheckIn";
import { Profile } from "./korisnik/Profile";
import Registracija from "./korisnik/Registracija";
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
import ZaposleniHome from "./zaposleni/ZaposleniHome";

export const Navigation = () => {
  const aktivnostiPaths = ["/dogadjaj"];
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

  return (
    <>
      <Navbar bg="light">
        <Container>
          <NavbarBrand href="/">
            <img src={opensBojaImage} alt="OPENS" width="150" />
          </NavbarBrand>
          <Nav className="me-auto">
            <Nav.Link
              href="/omladinski"
              className={`coworking-dropdown-item ${
                isActive("/omladinski") ? "active" : ""
              }`}
            >
              Omladinski centar OPENS
            </Nav.Link>
            <NavDropdown
              title="Aktivnosti"
              className={
                isActiveDropdown(aktivnostiPaths) ? "aktivnosti-dropdown" : ""
              }
            >
              <NavDropdown.Item>Trenutno</NavDropdown.Item>
              <NavDropdown.Item
                href="/dogadjaj"
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
                href="/obavestenja"
                className={`sifarnik-dropdown-item ${
                  isActive("/obavestenja") ? "active" : ""
                }`}
              >
                Obaveštenja
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/tipOpreme"
                className={`sifarnik-dropdown-item ${
                  isActive("/tipOpreme") ? "active" : ""
                }`}
              >
                Tip opreme
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/oprema"
                className={`sifarnik-dropdown-item ${
                  isActive("/oprema") ? "active" : ""
                }`}
              >
                Oprema
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/mestoPosete"
                className={`sifarnik-dropdown-item ${
                  isActive("/mestoPosete") ? "active" : ""
                }`}
              >
                Mesto posete
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/mestoDogadjaja"
                className={`sifarnik-dropdown-item ${
                  isActive("/mestoDogadjaja") ? "active" : ""
                }`}
              >
                Mesto događaja
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/tipDogadjaja"
                className={`sifarnik-dropdown-item ${
                  isActive("/tipDogadjaja") ? "active" : ""
                }`}
              >
                Tip događaja
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/prigradskaNaselja"
                className={`sifarnik-dropdown-item ${
                  isActive("/prigradskaNaselja") ? "active" : ""
                }`}
              >
                Prigradska naselja
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/logo"
                className={`sifarnik-dropdown-item ${
                  isActive("/logo") ? "active" : ""
                }`}
              >
                Logoi
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/zaposleni"
              className={`zaposleni-dropdown-item ${
                isActive("/zaposleni") ? "active" : ""
              }`}
            >
              Zaposleni
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link
              href="/check-in"
              className={`registracija-dropdown-item ${
                isActive("/check-in") ? "active" : ""
              }`}
            >
              Check-in
            </Nav.Link>
            <Nav.Link
              href="/registracija"
              className={`registracija-dropdown-item ${
                isActive("/registracija") ? "active" : ""
              }`}
            >
              Registracija
            </Nav.Link>
            {/*<Nav.Link>Logout</Nav.Link>
            <Nav.Link href="/profile">Profil</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/check-in" element={<MainCheckIn />} />
          <Route path="/tipOpreme" element={<TipOprHome />} />
          <Route path="/oprema" element={<OpremaHome />} />
          <Route path="/mestoPosete" element={<MestoPoseteHome />} />
          <Route path="/mestoDogadjaja" element={<MestoDogadjajaHome />} />
          <Route path="/tipDogadjaja" element={<TipDogadjajaHome />} />
          <Route
            path="/prigradskaNaselja"
            element={<PrigradskaNaseljaHome />}
          />
          <Route path="/dogadjaj" element={<DogadjajHome />} />
          <Route path="/logo" element={<LogoHome />} />
          <Route path="/obavestenja" element={<ObavestenjaHome />} />
          <Route path="/logovanje" element={<Logovanje />} />
          <Route path="/zaposleni" element={<ZaposleniHome />} />
          <Route path="/omladinski" element={<OmladinskiCentar />} />
        </Routes>
      </div>
    </>
  );
};
