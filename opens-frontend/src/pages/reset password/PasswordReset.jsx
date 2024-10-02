import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { opensBojaImage } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PasswordReset = () => {
  const query = useQuery();
  const token = query.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();


  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Lozinka mora imati najmanje 8 karaktera, jedno veliko slovo, jedan broj i jedan specijalni karakter."
      );
    } else {
      setPasswordError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toogleShowConfirm = () => {
    setShowConfirm(!showConfirm)
  }

  const handleReset = async () => {
    validatePassword(newPassword);
    if (newPassword !== confirmPassword) {
      alert("Obe unete lozinke moraju biti iste!");
      return;
    }

    if (passwordError) {
      return;
    }
    try {
      console.log("Token je: " + token);
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
      alert("Lozinka je uspesno promenjena");
      navigate("/logovanje");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Došlo je do greške prilikom promene lozinke");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center resetPassword">
      <Card>
        <Card.Header>
          <div style={{ marginTop: "100px" }}>
            <img src={opensBojaImage} alt="OPENS" />
          </div>
        </Card.Header>
        <Card.Body>
          <div style={{ marginTop: "100px" }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Lozinka:</Form.Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Unesite novu lozinku"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    isInvalid={!!passwordError}
                    style={{ marginRight: "10px" }} // Space between input and icon
                  />
                  <span
                    onClick={toggleShowPassword}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
                {passwordError && (
                  <div style={{ color: "red", marginTop: "5px", fontSize: 14}}>
                    {passwordError}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lozinka:</Form.Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Control
                  type={showConfirm ? "text" : "password"}
                  placeholder="Potvrdite lozinku"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <span
                    onClick={toogleShowConfirm}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>
              <div className="d-grid gap-2 my-4">
                <Button onClick={handleReset} variant="success" size="lg">
                  Promeni lozinku
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PasswordReset;
