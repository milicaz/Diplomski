import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row
} from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { httpPublic } from "../../apis/http";
import { opensBojaImage } from "../../assets";
import useToast from "../../hooks/useToast";

const Registracija = () => {
  const { handleShowToast } = useToast();

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [rod, setRod] = useState("");
  const [godine, setGodine] = useState("");
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const rodMapping = {
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleRegistracija = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (
      form.checkValidity() === false ||
      !isValidEmail(email) ||
      !isValidPassword(password)
    ) {
      setValidated(true);
    } else {
      try {
        const posetilacDTO = {
          email,
          password,
          ime,
          prezime,
          rod,
          godine,
          mestoBoravista,
          brojTelefona,
        };
        await httpPublic.post("/signupPosetilac", posetilacDTO);
        handleShowToast(
          "Registracija uspešna",
          "Uspešno ste se registrovali posetioca",
          "success"
        );
        setValidated(false);
        setEmail("");
        setPassword("");
        setIme("");
        setPrezime("");
        setRod("");
        setGodine("");
        setMestoBoravista("");
        setBrojTelefona("");
      } catch (error) {
        if (!error.response) {
          handleShowToast(
            "Registracija neuspešna",
            "Greška u mreži. Zahtev nije mogao biti poslat zbog greške u mreži.",
            "danger"
          );
        } else if (error.response?.status === 409) {
          handleShowToast(
            "Registracija neuspešna",
            "Email je već u upotrebi. Molimo Vas da pokušate sa nekim drugim.",
            "danger"
          );
        } else if (error.response.status >= 500) {
          handleShowToast(
            "Registracija neuspešna",
            "Došlo je do problema sa serverom. Molimo Vas da pokušate ponovo kasnije.",
            "danger"
          );
        } else {
          handleShowToast(
            "Registracija neuspešna",
            "Došlo je do neočekivane greške tokom registracije.",
            "danger"
          );
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Card className="registracija-card">
          <Card.Header>
            <div style={{ marginTop: "100px" }}>
              <img src={opensBojaImage} alt="OPENS" />
            </div>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleRegistracija}
            >
              <Row className="mt-5 mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Email adresa:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Unesite e-mail adresu *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      isInvalid={
                        validated &&
                        (!isValidEmail(email) || email.length === 0)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Unesite ispravnu email adresu.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Lozinka:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Unesite lozinku *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        isInvalid={validated && password.length === 0}
                      />
                      <InputGroup.Text
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        Lozinka je obavezna.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Ime:</Form.Label>
                    <Form.Control
                      value={ime}
                      onChange={(e) => setIme(e.target.value)}
                      type="text"
                      placeholder="Unesite ime *"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ime je obavezno.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Prezime:</Form.Label>
                    <Form.Control
                      value={prezime}
                      onChange={(e) => setPrezime(e.target.value)}
                      type="text"
                      placeholder="Unesite prezime *"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Prezime je obavezno.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Rod:</Form.Label>
                    <Form.Control
                      as="select"
                      name="rod"
                      value={rod}
                      onChange={(e) => setRod(e.target.value)}
                      required
                    >
                      <option value="">Izaberite rod *</option>
                      {Object.entries(rodMapping).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Rod je obavezan.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Godina rođenja:</Form.Label>
                    <Form.Control
                      value={godine}
                      onChange={(e) => setGodine(e.target.value)}
                      type="text"
                      placeholder="Unesite godinu rođenja *"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Godinu rođenja je obavezna.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Mesto boravišta:</Form.Label>
                    <Form.Control
                      value={mestoBoravista}
                      onChange={(e) => setMestoBoravista(e.target.value)}
                      type="text"
                      placeholder="Unesite mesto boravišta *"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Mesto boravišta je obavezno.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Broj telefona:</Form.Label>
                    <Form.Control
                      value={brojTelefona}
                      onChange={(e) => setBrojTelefona(e.target.value)}
                      type="text"
                      placeholder="Unesite broj telefona *"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Broj telefona je obavezan.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-grid gap-2 my-4">
                <Button variant="success" type="submit" size="lg">
                  Registrujte posetioca
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Registracija;
