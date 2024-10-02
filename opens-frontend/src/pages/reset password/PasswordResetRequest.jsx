import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { opensBojaImage } from "../../assets";
import { useNavigate } from "react-router-dom";
import httpCommon from "../../http-common";

const PasswordResetRequest = () => {

    
    const [email, setEmail] = useState('');
    const [zaposleni, setZaposleni] = useState([]);

    let navigate = useNavigate();

    // useEffect(() => {
    //   const fetchZaposleni = async () => {
    //     try {
    //       const { data } = await axios.get('http://localhost:8080/api/zaposleni');
    //       setZaposleni(data);
    //     } catch (error) {
    //       console.error("Error fetching zaposleni:", error);
    //       alert("Došlo je do greške prilikom učitavanja zaposlenih.");
    //     }
    //   };
  
    //   fetchZaposleni();
    // }, []);

    const handleRequest = async () => {
    //   for(let z in zaposleni) {
    //   if(z.email !== email) {
    //     alert("Uneli ste ne postojeću e-mail adresu.")
    //     return;
    //   }
    // }
      try {
        const {data} = await axios.post('http://localhost:8080/api/auth/password-reset/request' , null, {
          params: {
            email: email,
          }
        })
    
        console.log("Odgovor request je: " + data);
        alert('Email za resetovanje lozinke je poslat');
        navigate("/TextPage")
      } catch (error) {
        console.error('Error requesting password reset:', error);
        alert('Došlo je do greške prilikom slanja emaila');
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
    );
  };

  export default PasswordResetRequest;