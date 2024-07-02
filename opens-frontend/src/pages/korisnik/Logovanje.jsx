import { Button, Form } from "react-bootstrap";
import { opensBojaImage } from "../../assets";
import { useState } from "react";
import axios from "axios";

const Logovanje = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            console.log(response.data); // Log response from backend

            // Handle success or redirect to dashboard
            // Example: redirect to dashboard if login successful
            // history.push('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="mb-4"> {/* Wrapper div for the image */}
                <img src={opensBojaImage} alt="OPENS" style={{ width: "300px", marginBottom: "20px"}} />
            </div>
            <div style={{ width: "300px" }}> {/* Wrapper div for the form */}
            <Form>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control style={{ width: "150%", maxWidth: "150%" }}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Unesite vaš email"
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lozinka: </Form.Label>
                    <Form.Control style={{ width: "150%", maxWidth: "150%" }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Unesite vašu lozinku"
                        required/>
                </Form.Group>
                <br />
                <Button variant="success" onClick={handleLogin}>Login</Button>
            </Form>
            </div>
        </div>
    )
}

export default Logovanje;