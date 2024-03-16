import { startTransition } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactGridLayout from "react-grid-layout";

const Registracija = () => {
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "40%", height: "40%" }}>
        <Card.Header>Registracija</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Ime i prezime</Form.Label>
              <Form.Control style={{ width: "60%", maxWidth: "70%" }}
                type="text"
                placeholder="Unesite vaše ime i prezime"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email adresa</Form.Label>
              <Form.Control style={{ width: "60%", maxWidth: "70%" }} type="email" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lozinka</Form.Label>
              <Form.Control style={{ width: "60%", maxWidth: "70%" }}
                type="password"
                aria-describedby="passwordHelpBlock"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Godine</Form.Label>
              <Form.Control style={{ width: "60%", maxWidth: "70%" }} type="text" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control style={{ width: "60%", maxWidth: "70%" }} type="text" />
            </Form.Group>
            <Form.Group className="checkbox-reg">
              {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check // prettier-ignore
                    type={type}
                    id={`default-${type}`}
                    // label={`default ${type}`}
                    label={"Potvrda podataka"}
                  />
                </div>
              ))}
            </Form.Group>
            <Form.Group>
              <Button className="btn-reg" variant="success">
                Registruj se
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Registracija;
