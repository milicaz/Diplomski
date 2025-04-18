import axios from "axios";
import { useState } from "react";
import { Button, Card, Form, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { opensBojaImage } from "../../assets";
import useToast from "../../hooks/useToast";
import { httpPublic } from "../../apis/http";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");

  let navigate = useNavigate();
  const { handleShowToast } = useToast();

  const handleRequest = async () => {
    try {
      await httpPublic.post(
        "/password-reset/requestZaposleni",
        null,
        {
          params: {
            email: email,
          },
        }
      );
      handleShowToast("","Email za resetovanje lozinke je poslat", "success");
      setTimeout(() => {
        navigate("/text-page");
      }, 4000);
    } catch (error) {
      if (!error?.response) {
        handleShowToast("Greška", "Nema odgovora sa servera", "danger");
      } else if (error.response?.status === 404) {
        console.error("Error requesting password reset:", error);
        handleShowToast("Greška", "Došlo je do greške prilikom slanja emaila", "error");
      } else if (error.response) {
        console.error("Error requesting password reset:", error);
        handleShowToast("Greška", "Došlo je do greške prilikom slanja emaila", "error");
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
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Unesite Vaš email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-2 my-4">
                  <Button onClick={handleRequest} variant="success" size="lg">
                    Zahtev za promenu lozinke
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default PasswordResetRequest;
