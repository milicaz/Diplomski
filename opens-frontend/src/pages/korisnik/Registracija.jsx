import axios from "axios";
import { startTransition, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ReactGridLayout from "react-grid-layout";

const Registracija = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [godine, setGodine] = useState("");
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefon, setBrojTelefon] = useState("");
  const [uloge, setUloge] = useState(""); // Assuming this is managed as a Set

  const handleRegistracija = async (e) => {
    e.preventDefault();

    const zaposleniDTO = {
      email,
      password,
      ime,
      prezime,
      godine,
      mestoBoravista,
      brojTelefon,
      uloge: Array.from(uloge), // Convert Set to Array assuming DTO structure
    };

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", zaposleniDTO);
      console.log(response.data); // Log success message or handle accordingly
      // Optionally, redirect to another page or show success message
      setEmail("")
      setPassword("")
      setIme("")
      setPrezime("")
      setGodine("")
      setMestoBoravista("")
      setBrojTelefon("")
      setUloge("")
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="d-flex justify-content-center">
          <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Col md={6} className="px-3">
          <Form.Group className="mb-3">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "90%" }} type="email" placeholder="Unesite vašu e-mail adresu" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "90%" }}
                type="password"
                aria-describedby="passwordHelpBlock"
                required
                placeholder="Unesite vašu lozinku"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Uloga</Form.Label>
              <Form.Control value={uloge} onChange={(e) => setUloge(e.target.value)} style={{ width: "90%" }}
                type="text"
                placeholder="Izaverite ulogu"
                required
              />
            </Form.Group>
            </Col>
            <Col md={6} className="px-3">
            <Form.Group className="mb-3">
              <Form.Label>Ime</Form.Label>
              <Form.Control value={ime} onChange={(e) => setIme(e.target.value)} style={{ width: "90%" }}
                type="text"
                placeholder="Unesite vaše ime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezime</Form.Label>
              <Form.Control value={prezime} onChange={(e) => setPrezime(e.target.value)} style={{ width: "90%" }}
                type="text"
                placeholder="Unesite vaše prezime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Godina rođenja</Form.Label>
              <Form.Control value={godine} onChange={(e) => setGodine(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Unesite vašu godinu rođenja" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control value={brojTelefon} onChange={(e) => setBrojTelefon(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Unesite vaš broj telefona" />
            </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
            <Form.Group>
              <Button className="btn-reg" variant="success" onClick={handleRegistracija}>
                Registruj se
              </Button>
            </Form.Group>
            </Col>
            </Row>
          </Form>
    </div>
  );
};

export default Registracija;
