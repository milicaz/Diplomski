import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ZaposleniContext } from "../ZaposleniContext";
import axios from "axios";

const RegistracijaZaposleniForm = ({handleClose}) => {

    const {uloga} = useContext(ZaposleniContext)
    const {registracija} = useContext(ZaposleniContext)


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [rod, setRod] = useState("");
  const [godine, setGodine] = useState("");
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefon, setBrojTelefon] = useState("");
  const [uloge, setUloge] = useState(new Set()); // Assuming this is managed as a Set

  const r = [
    {id: 1, naziv: 'ZENSKO'},
    {id: 2, naziv: "MUSKO"},
    {id: 3, naziv: "DRUGO"},
  ];

  const u = [
    {id: 1, naziv: 'admin'},
    {id: 2, naziv: "dogadjaj_admin"},
    {id: 3, naziv: "super_admin"},
  ]

  const handleUlogeChange = (e) => {
    const selectedOptions = e.target.selectedOptions;
    const selectedValues = Array.from(selectedOptions, option => option.value);
    setUloge(new Set(selectedValues)); // Update uloge with a Set of selected values
  };

  const handleRegistracija = async (event) => {
    
    event.preventDefault();
    
    const zaposleniDTO = {
      email,
      password,
      ime,
      prezime,
      rod,
      godine,
      mestoBoravista,
      brojTelefon,
      uloge: Array.from(uloge), // Convert Set to Array assuming DTO structure
    };

    try {
      // const response = await axios.post(
      //   "http://localhost:8080/api/auth/signup",
      //   zaposleniDTO
      // );

      registracija(zaposleniDTO)
      // console.log(response.data); // Log success message or handle accordingly
      handleClose();
      // Optionally, redirect to another page or show success message
      setEmail("");
      setPassword("");
      setIme("");
      setPrezime("");
      setRod("");
      setGodine("");
      setMestoBoravista("");
      setBrojTelefon("");
      setUloge(new Set());
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <Form onSubmit={handleRegistracija}>
      <Form.Group>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          required
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          aria-describedby="passwordHelpBlock"
          placeholder="Lozinka"
          required
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
            as="select"
          value={Array.from(uloge)}
          onChange={handleUlogeChange}
          type="text"
          placeholder="Uloga"
          required multiple>
            <option value="">Izaberite ulogu:</option>
                  {u.map((item, index) => (
                <option key={item.id} value={item.naziv}>
                  {item.naziv}
                </option>
                  ))}
        </Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          value={ime}
          onChange={(e) => setIme(e.target.value)}
          type="text"
          placeholder="Ime"
          required
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          value={prezime}
          onChange={(e) => setPrezime(e.target.value)}
          type="text"
          placeholder="Prezime"
          required
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
            as="select"
          value={rod}
          onChange={(e) => setRod(e.target.value)}
          type="text"
          placeholder="Rod"
          required>
            <option value="">Izaberite rod</option>
                  {r.map((item, index) => (
                <option key={item.id} value={item.naziv}>
                  {item.naziv}
                </option>
                  ))}
        </Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          value={godine}
          onChange={(e) => setGodine(e.target.value)}
          type="text"
          placeholder="Godina rođenja"
          required
        />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          value={brojTelefon}
          onChange={(e) => setBrojTelefon(e.target.value)}
          type="text"
          placeholder="Broj telefona"
          required
        />
      </Form.Group>
      <br />
      <Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Registracija
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default RegistracijaZaposleniForm;
