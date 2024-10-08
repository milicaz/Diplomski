import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Registracija = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [rod, setRod] = useState("");
  const [godine, setGodine] = useState("");
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true); // State variable to track email validity
  const [passwordValid, setPasswordValid] = useState(true);

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Validate email format using regex
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    setPasswordValid(isValid);
  }



  const handleRegistracija = async (e) => {
    e.preventDefault();

    if (!emailValid) {
      // Display error message or handle invalid email format
      return;
    }

    if(!passwordValid) {
      return;
    }


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

    try {
      const response = await httpCommon.post(
        "/auth/signupPosetilac",
        posetilacDTO
      );
      // const response = await axios.post(
      //   "http://localhost:8080/api/auth/signupPosetilac",
      //   posetilacDTO
      // );
      // console.log(response.data); // Log success message or handle accordingly
      // Optionally, redirect to another page or show success message
      setEmail("");
      setPassword("");
      setIme("");
      setPrezime("");
      setRod("");
      setGodine("");
      setMestoBoravista("");
      setBrojTelefona("");
      // setUloge("")
    } catch (error) {
      // Handle errors
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom registracije posetioca:", error);
        // Handle error, show error message, etc.
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Col md={6} className="px-3">
            <Form.Group className="mb-3">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleEmailChange}
                style={{ width: "90%" }}
                type="email"
                placeholder="Unesite e-mail adresu"
                required
                isInvalid={!emailValid}
              />
              {!emailValid && (
                <Form.Control.Feedback type="invalid">
                  Morate uneti ispravnu e-mail adresu!
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lozinka</Form.Label>
              <InputGroup style={{ width: "90%" }}>
              <Form.Control
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handlePasswordChange}
                style={{ width: "90%" }}
                type={showPassword ? "text" : "password"} // Toggle password visibility
                aria-describedby="passwordHelpBlock"
                required
                placeholder="Unesite lozinku"
                isInvalid={!passwordValid}
              />
              <InputGroup.Text
            onClick={handleTogglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </InputGroup.Text>
          {!passwordValid && (
          <Form.Control.Feedback type="invalid">
            Lozinka mora imati najmanje 8 karaktera, jedno veliko slovo, jedan broj i jedan specijalni karakter!
          </Form.Control.Feedback>
        )}
              </InputGroup>
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
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Godina rođenja</Form.Label>
              <Form.Control
                value={godine}
                onChange={(e) => setGodine(e.target.value)}
                style={{ width: "90%" }}
                type="text"
                placeholder="Unesite godinu rođenja"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="px-3">
            <Form.Group className="mb-3">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                style={{ width: "90%" }}
                type="text"
                placeholder="Unesite ime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                style={{ width: "90%" }}
                type="text"
                placeholder="Unesite prezime"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mesto boravišta</Form.Label>
              <Form.Control
                value={mestoBoravista}
                onChange={(e) => setMestoBoravista(e.target.value)}
                style={{ width: "90%" }}
                type="text"
                placeholder="Unesite mesto boravišta"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control
                value={brojTelefona}
                onChange={(e) => setBrojTelefona(e.target.value)}
                style={{ width: "90%" }}
                type="text"
                placeholder="Unesite broj telefona"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Form.Group>
              <Button
                className="btn-reg"
                variant="success"
                onClick={handleRegistracija}
              >
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
