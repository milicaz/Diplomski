import { Button, Form } from "react-bootstrap";

const Registracija = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Ime i prezime</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email adresa</Form.Label>
        <Form.Control type="email" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Lozinka</Form.Label>
        <Form.Control
          type="password"
          aria-describedby="passwordHelpBlock"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Godine</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Broj telefona</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="checkbox">
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
      <Form.Group className="btnReg">
        <Button variant="success">Registruj se</Button>
      </Form.Group>
    </Form>
  );
};

export default Registracija;
