import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, InputGroup, Toast } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { opensBojaImage } from "../../assets";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PasswordReset = () => {
  const query = useQuery();
  const token = query.get("token");

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleReset = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (
      form.checkValidity() === false ||
      !isValidPassword(newPassword) ||
      !isValidPassword(confirmPassword)
    ) {
      setValidated(true);
    } else if (newPassword !== confirmPassword) {
      handleShowToast("Lozinke se ne podudaraju!", "error");
      return;
    } else {
      try {
        await axios.put(
          "http://localhost:8080/api/auth/password-reset/reset",
          null,
          {
            params: {
              token: token,
              newPassword: newPassword,
            },
          }
        );
        handleShowToast("Lozinka je uspesno promenjena", "success");
        setTimeout(() => {
          navigate("/logovanje");
        }, 4000);
      } catch (error) {
        if (!error.response) {
          handleShowToast("Nema odgovora sa servera", "danger");
        } else if (error.response?.status === 401) {
          handleShowToast("Nevažeći ili istekao token.", "danger");
        } else {
          handleShowToast(
            "Došlo je do greške prilikom promene lozinke.",
            "danger"
          );
        }
      }
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center resetPassword">
        <Card>
          <Card.Header>
            <div style={{ marginTop: "100px" }}>
              <img src={opensBojaImage} alt="OPENS" />
            </div>
          </Card.Header>
          <Card.Body>
            <div style={{ marginTop: "100px" }}>
              <Form noValidate validated={validated} onSubmit={handleReset}>
                <Form.Group className="mb-3">
                  <Form.Label>Lozinka:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Unesite novu lozinku *"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      isInvalid={validated && newPassword.length === 0}
                    />
                    <InputGroup.Text
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      Lozinka mora imati najmanje 8 karaktera, jedno veliko
                      slovo, jedan broj i jedan specijalni karakter!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Lozinka:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirm ? "text" : "password"}
                      placeholder="Ponovite lozinku *"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      isInvalid={validated && confirmPassword.length === 0}
                    />
                    <InputGroup.Text
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      Lozinka mora imati najmanje 8 karaktera, jedno veliko
                      slovo, jedan broj i jedan specijalni karakter!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <div className="d-grid gap-2 my-4">
                  <Button variant="success" size="lg" type="submit">
                    Promeni lozinku
                  </Button>
                </div>
              </Form>
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

export default PasswordReset;
