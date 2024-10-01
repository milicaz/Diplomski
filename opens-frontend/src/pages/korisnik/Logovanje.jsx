import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { opensBojaImage } from "../../assets";
import { AuthContext } from "../../contexts/AuthContext";

const Logovanje = () => {
  const { login } = useContext(AuthContext);

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  let navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    // Validate email
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      setEmailValid(false);
      valid = false;
    } else {
      setEmailValid(true);
    }

    // Validate password
    if (!password) {
      setPasswordValid(false);
      valid = false;
    } else {
      setPasswordValid(true);
    }

    return valid;
  };

  const handleLogin = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (validateForm()) {
      const loginData = { email, password };
      await login(loginData); // Ensure this function exists and handles login
      navigate("/");
    }

    setValidated(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-center logovanje">
      <Card>
        <Card.Header>
          <div style={{ marginTop: "100px" }}>
            <img src={opensBojaImage} alt="OPENS" />
          </div>
        </Card.Header>
        <Card.Body>
          <div style={{ marginTop: "100px" }}>
            <Form noValidate validated={validated} onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite Vaš email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={validated && !emailValid}
                />
                <Form.Control.Feedback type="invalid">
                  Unesite ispravnu email adresu.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label>Lozinka: </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Unesite Vašu lozinku"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  isInvalid={validated && !passwordValid}
                />
                <Form.Control.Feedback type="invalid">
                  Lozinka je obavezna.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid gap-2 my-4">
                <Button variant="success" type="submit" size="lg">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Logovanje;
