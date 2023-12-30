import { Button, Card, Form } from "react-bootstrap";

const Login = () => {
  return (
    <Card>
      <Card.Header>Login</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email adresa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite vašu e-mail adresu"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="password" placeholder="Unesite vašu lozinku" />
          </Form.Group>
          <Form.Group className="btn-reg">
            <a href="">Zaboravili ste vašu lozinku</a>&nbsp;&nbsp;
            <Button variant="success">Login</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
