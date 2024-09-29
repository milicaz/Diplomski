import axios from "axios";
import { startTransition, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ReactGridLayout from "react-grid-layout";

const Registracija = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [rod, setRod] = useState("");
  const [godine, setGodine] = useState("");
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  // const [uloge, setUloge] = useState(""); // Assuming this is managed as a Set

  const r = [
    { id: 1, naziv: "ZENSKO" },
    { id: 2, naziv: "MUSKO" },
    { id: 3, naziv: "DRUGO" },
  ];

  const rodMapping = {
    ZENSKO: "žensko",
    MUSKO: "muško",
    DRUGO: "drugo",
  };

  const handleRegistracija = async (e) => {
    e.preventDefault();

    const posetilacDTO = {
      email,
      password,
      ime,
      prezime,
      rod,
      godine,
      mestoBoravista,
      brojTelefona,
      // uloge: Array.from(uloge), // Convert Set to Array assuming DTO structure
    };

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signupPosetilac", posetilacDTO);
      console.log(response.data); // Log success message or handle accordingly
      // Optionally, redirect to another page or show success message
      setEmail("")
      setPassword("")
      setIme("")
      setPrezime("")
      setRod("")
      setGodine("")
      setMestoBoravista("")
      setBrojTelefona("")
      // setUloge("")
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
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "90%" }} type="email" placeholder="Unesite e-mail adresu" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "90%" }}
                type="password"
                aria-describedby="passwordHelpBlock"
                required
                placeholder="Unesite lozinku"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rod</Form.Label>
                        <Form.Control
                            style={{ width: "90%" }}
                            as="select"
                            name="rod"
                            value={rod}
                            onChange={(e) => setRod(e.target.value)}
                            required
                        >
                            <option value="">Izaberite rod</option>
                            {Object.entries(rodMapping).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </Form.Control>
                    </Form.Group><br />
                    <Form.Group className="mb-3">
              <Form.Label>Godina rođenja</Form.Label>
              <Form.Control value={godine} onChange={(e) => setGodine(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Unesite godinu rođenja" required />
            </Form.Group>
            </Col>
            <Col md={6} className="px-3">
            <Form.Group className="mb-3">
              <Form.Label>Ime</Form.Label>
              <Form.Control value={ime} onChange={(e) => setIme(e.target.value)} style={{ width: "90%" }}
                type="text"
                placeholder="Unesite ime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezime</Form.Label>
              <Form.Control value={prezime} onChange={(e) => setPrezime(e.target.value)} style={{ width: "90%" }}
                type="text"
                placeholder="Unesite prezime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mesto boravišta</Form.Label>
              <Form.Control value={mestoBoravista} onChange={(e) => setMestoBoravista(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Unesite mesto boravišta" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control value={brojTelefona} onChange={(e) => setBrojTelefona(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Unesite broj telefona" />
            </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
            <Form.Group>
              <Button className="btn-reg" variant="success" onClick={handleRegistracija}>
                Registracija
              </Button>
            </Form.Group>
            </Col>
            </Row>
          </Form>
    </div>
  );
};

export default Registracija;
