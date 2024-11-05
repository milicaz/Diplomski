import { useState } from "react";
import { Button, Card, Form, InputGroup, Toast } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { httpProtected } from "../../apis/http";
import { opensBojaImage } from "../../assets";
import useAuth from "../../hooks/useAuth";

const Logovanje = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || !isValidEmail(email)) {
      setValidated(true);
    } else {
      try {
        const loginData = { email, password };
        const { data } = await httpProtected.post("/auth/login", loginData);
        const accessToken = data?.accessToken;
        setAuth({ email, accessToken });
        handleShowToast("Uspešno ste se prijavili!", "success");
        // Reset the form
        setValidated(false);
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      } catch (error) {
        if (!error?.response) {
          handleShowToast("Nema odgovora sa servera", "danger");
        } else if (error.response?.status === 401) {
          handleShowToast("Prijava nije uspela!", "danger");
        }
      }
    }
  };

  return (
    <>
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
                    isInvalid={
                      validated && (!isValidEmail(email) || email.length === 0)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Unesite ispravnu email adresu.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label>Lozinka: </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Unesite Vašu lozinku"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      isInvalid={validated && password.length === 0}
                    />
                    <InputGroup.Text
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      Lozinka je obavezna.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 my-4">
                  <Button variant="success" type="submit" size="lg">
                    Login
                  </Button>
                </div>
              </Form>
              <div style={{ textAlign: "center" }}>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  Zaboravili ste lozinku?
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          minWidth: 300,
          backgroundColor: toastVariant === "success" ? "#a3c57b" : "#f56f66",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastVariant === "success" ? "" : "Greška"}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default Logovanje;
