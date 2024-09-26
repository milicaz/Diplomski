import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ZaposleniContext } from "../ZaposleniContext";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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

  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true); // State variable to track email validity

  // const r = [
  //   {id: 1, naziv: 'ZENSKO'},
  //   {id: 2, naziv: "MUSKO"},
  //   {id: 3, naziv: "DRUGO"},
  // ];

  // const u = [
  //   {id: 1, naziv: 'admin'},
  //   {id: 2, naziv: "dogadjaj_admin"},
  //   {id: 3, naziv: "super_admin"},
  // ]

  // const handleUlogeChange = (e) => {
  //   const selectedOptions = e.target.selectedOptions;
  //   const selectedValues = Array.from(selectedOptions, option => option.value);
  //   setUloge(new Set(selectedValues)); // Update uloge with a Set of selected values
  // };

  const r = [
    { id: 1, naziv: "ZENSKO" },
    { id: 2, naziv: "MUSKO" },
    { id: 3, naziv: "DRUGO" },
  ];

  const rodMapping = {
    ZENSKO: "žensko",
    MUSKO: "muško",
    DRUGO: "drugo",
  };

  const roleMapping = {
    admin: "Admin",
    dogadjaj_admin: "Admin događaj",
    super_admin: "Super admin",
  };

  const u = Object.keys(roleMapping).map((key, index) => ({
    id: index + 1,
    naziv: key,
    displayName: roleMapping[key],
  }));

  const handleUlogeChange = (e) => {
    const { value } = e.target;
    const newUloge = new Set(uloge); // Copy current set

    if (newUloge.has(value)) {
      newUloge.delete(value); // Remove if already exists
    } else {
      newUloge.add(value); // Add if not present
    }

    setUloge(newUloge); // Update state
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Validate email format using regex
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
  };

  const handleRegistracija = async (event) => {
    
    event.preventDefault();

    if (!emailValid) {
      // Display error message or handle invalid email format
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if password matches complexity criteria
    if (!passwordRegex.test(password)) {
        // Password does not meet complexity criteria
        alert("Lozinka mora sadržati najmanje 8 karaktera, barem jedno veliko slovo, jedan broj i jedan poseban znak(@$!%*?&).");
        return;
    }
    
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
          onChange={handleEmailChange}
          type="text"
          placeholder="Email"
          required
          isInvalid={!emailValid}
        />
        {!emailValid && (
          <Form.Control.Feedback type="invalid">
            Morate uneti ispravnu e-mail adresu!
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <br />
      <Form.Group>
      <InputGroup>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"} // Toggle password visibility
          aria-describedby="passwordHelpBlock"
          placeholder="Lozinka"
          required
        />
        <InputGroup.Text onClick={handleTogglePasswordVisibility} style={{ cursor: "pointer" }}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <br />
      {/* <Form.Group>
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
      </Form.Group> */}
      <Form.Group>
        <Form.Label>Uloge</Form.Label>
        {u.map((item) => (
          <Form.Check
            key={item.id}
            type="checkbox"
            label={item.displayName} // Display user-friendly name
            value={item.naziv} // Use server value for submission
            checked={uloge.has(item.naziv)}
            onChange={handleUlogeChange}
          />
        ))}
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
      {/* <Form.Group>
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
      </Form.Group> */}
      <Form.Group>
        
        <Form.Control as="select" value={rod} onChange={(e) => setRod(e.target.value)} required>
          <option value="">Izaberite rod</option>
          {Object.entries(rodMapping).map(([key, value]) => (
            <option key={key} value={key}>{value}</option> // Send server value, display friendly name
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
          value={mestoBoravista}
          onChange={(e) => setMestoBoravista(e.target.value)}
          type="text"
          placeholder="Mesto boravišta"
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
