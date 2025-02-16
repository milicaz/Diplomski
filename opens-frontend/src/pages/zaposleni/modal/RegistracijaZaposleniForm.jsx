import { useContext, useState } from "react";
import { Button, Form, InputGroup, Toast } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ZaposleniContext } from "../ZaposleniContext";
import useToast from "../../../hooks/useToast";

const RegistracijaZaposleniForm = ({ handleClose }) => {
  const { registracija } = useContext(ZaposleniContext);

  const [validated, setValidated] = useState(false);
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
  const { handleShowToast } = useToast();

  const rodMapping = {
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  const roleMapping = {
    admin: "admin",
    dogadjaj_admin: "admin događaj",
    super_admin: "super admin",
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

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleRegistracija = async (event) => {
    event.preventDefault();
  
    const form = event.currentTarget;

    const godinaValidna =
    /^\d{4}$/.test(godine) &&
    Number(godine) >= 1930
  
    if (
      form.checkValidity() === false ||
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !godinaValidna
    ) {
      setValidated(true);
    } else {
      // try {
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
        console.log("Slanje podataka za registraciju:", zaposleniDTO);
  
        const response = await registracija(zaposleniDTO);
        console.log("Response je: " + JSON.stringify(response))
  
        if (response !== undefined && (response.message = "Zaposleni je uspešno registrovan!")) {
          setEmail("");
          setPassword("");
          setIme("");
          setPrezime("");
          setRod("");
          setGodine("");
          setMestoBoravista("");
          setBrojTelefon("");
          setUloge(new Set());
          handleClose();
        } else {
          // console.error("Neočekivani odgovor sa servera:", response);
          // handleShowToast("Greška", "Registracija zaposlenog nije uspela!", "danger");
        }
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleRegistracija}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={
              validated && (!isValidEmail(email) || email.length === 0)
            }
          />
          <Form.Control.Feedback type="invalid">
            Unesite ispravnu e-mail adresu.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Lozinka *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isInvalid={
                validated &&
                (!isValidPassword(password) || password.length === 0)
              }
            />
            <InputGroup.Text
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Lozinka mora imati najmanje 8 karaktera, jedno veliko slovo, jedan
              broj i jedan specijalni karakter!
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Uloge *</Form.Label>
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
          <Form.Control.Feedback type="invalid">
            Uloge su obavezne.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Ime *"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Ime je obavezno.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Prezime *"
            value={prezime}
            onChange={(e) => setPrezime(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Prezime je obavezno.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="select"
            value={rod}
            onChange={(e) => setRod(e.target.value)}
            required
          >
            <option value="">Izaberite rod *</option>
            {Object.entries(rodMapping).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option> // Send server value, display friendly name
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Rod je obavezan.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={godine}
            onChange={(e) => setGodine(e.target.value)}
            type="number"
            placeholder="Godina rođenja *"
            required
            isInvalid={
              validated &&
              (!/^\d{4}$/.test(godine) || godine < 1930)
            }
          />
          <Form.Control.Feedback type="invalid">
            Godina rođenja je obavezna.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={mestoBoravista}
            onChange={(e) => setMestoBoravista(e.target.value)}
            type="text"
            placeholder="Mesto boravišta *"
            required
          />
          <Form.Control.Feedback type="invalid">
            Mesto boravišta je obavezno.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={brojTelefon}
            onChange={(e) => setBrojTelefon(e.target.value)}
            type="text"
            placeholder="Broj telefona *"
            required
          />
          <Form.Control.Feedback type="invalid">
            Broj telefona je obavezan.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Registracija
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegistracijaZaposleniForm;
