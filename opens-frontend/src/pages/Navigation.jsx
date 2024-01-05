import React from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { opensImage } from "../assets";
import { Home } from "./Home";
import { CoworkingListHome, CoworkingTabelaHome } from "./co-working";
import { Profile } from "./korisnik/Profile";
import {
  OmladinskiKlubListHome,
  OmladinskiKlubTabelaHome,
} from "./omladinski klub";
import Registracija from "./korisnik/Registracija";
import Login from "./korisnik/Login";
import TipOprHome from "./pomocne tabele/TipOprHome";
import MestoPoseteHome from "./pomocne tabele/MestoPoseteHome";
import MestoDogadjajaHome from "./pomocne tabele/MestoDogadjajaHome";
import TipDogadjajaHome from "./pomocne tabele/TipDogadjajaHome";
import PrigradskaNaseljaHome from "./pomocne tabele/PrigradskaNaseljaHome";

export const Navigation = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <NavbarBrand href="/">
            <img src={opensImage} alt="OPENS" width="150" />
          </NavbarBrand>
          <Nav className="me-auto">
            <NavDropdown title="Co-working">
              <NavDropdown.Item href="/coworking-trenutno">
                Trenutno
              </NavDropdown.Item>
              <NavDropdown.Item href="/coworking-tabela">
                Tabela poseta
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Omladinski klub">
              <NavDropdown.Item href="/omladinski-trenutno">
                Trenutno
              </NavDropdown.Item>
              <NavDropdown.Item href="/omladinski-tabela">
                Tabela poseta
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Aktivnosti">
              <NavDropdown.Item>
                Tabela događaja
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pomoćne tabele">
              <NavDropdown.Item href="/tipOpreme">
                Tip opreme
              </NavDropdown.Item>
              <NavDropdown.Item href="/mestoPosete">
                Mesto posete
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/mestoDogadjaja">
                Mesto događaja
              </NavDropdown.Item>
              <NavDropdown.Item href="/tipDogadjaja">
                Tip događaja
              </NavDropdown.Item>
              <NavDropdown.Item href="/prigradskaNaselja">
                Prigradska naselja
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/registracija">Registracija</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link>Logout</Nav.Link>
            <Nav.Link href="/profile">Profil</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coworking-trenutno" element={<CoworkingListHome />} />
          <Route path="/coworking-tabela" element={<CoworkingTabelaHome />} />
          <Route
            path="/omladinski-trenutno"
            element={<OmladinskiKlubListHome />}
          />
          <Route
            path="/omladinski-tabela"
            element={<OmladinskiKlubTabelaHome />}
          />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tipOpreme" element={<TipOprHome />} />
          <Route path="/mestoPosete" element={<MestoPoseteHome />} />
          <Route path="/mestoDogadjaja" element={<MestoDogadjajaHome />} />
          <Route path="/tipDogadjaja" element={<TipDogadjajaHome />} />
          <Route path="/prigradskaNaselja" element={<PrigradskaNaseljaHome />} />
        </Routes>
      </div>
    </>
  );
};
