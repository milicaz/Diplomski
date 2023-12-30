import { Button, Form } from "react-bootstrap";

const Login = () => {

    return (
        <Form>
            <Form.Group>
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="text" placeholder="Unesite vašu e-mail adresu" required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Lozinka</Form.Label>
                <Form.Control type="password" placeholder="Unesite vašu lozinku" />
            </Form.Group>
            <Form.Group className="btnReg">
                <a href="">Zaboravili ste vašu lozinku</a>&nbsp;&nbsp;
                <Button variant="success">Login</Button>
            </Form.Group>
        </Form>
    )
}

export default Login;