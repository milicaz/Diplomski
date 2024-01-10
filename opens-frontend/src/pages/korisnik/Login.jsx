import { Button, Card, Form } from "react-bootstrap";

const Login = () => {
  return (
    <div class="d-flex justify-content-center">
      <Card style={{ width: "40%", height: "40%" }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                style={{ width: "60%", maxWidth: "70%" }}
                type="text"
                placeholder="Unesite vašu e-mail adresu"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                style={{ width: "60%", maxWidth: "70%" }}
                type="password"
                placeholder="Unesite vašu lozinku"
              />
            </Form.Group>
            <Form.Group className="btn-reg">
              <a href="">Zaboravili ste vašu lozinku</a>&nbsp;&nbsp;
              <Button variant="success">Login</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
