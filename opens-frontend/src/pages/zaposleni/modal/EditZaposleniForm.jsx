import { useContext, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../../hooks/useHttpProtected";
import { ZaposleniContext } from "../ZaposleniContext";

const EditZaposleniForm = ({ currentZaposleni, onZaposleniEdit }) => {
  const { editZaposleni } = useContext(ZaposleniContext);
  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  const id = currentZaposleni.id;
  const [zaposleni, setZaposleni] = useState({
    email: currentZaposleni.email,
    ime: currentZaposleni.ime,
    prezime: currentZaposleni.prezime,
    rod: currentZaposleni.rod,
    godine: currentZaposleni.godine,
    mestoBoravista: currentZaposleni.mestoBoravista,
    brojTelefona: currentZaposleni.brojTelefona,
    uloge: currentZaposleni.uloge.map((role) => role.naziv),
  });
  const [availableRoles, setAvailableRoles] = useState([]);

  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const r = [
    { id: 1, naziv: "muško", serverValue: "MUSKO" },
    { id: 2, naziv: "žensko", serverValue: "ZENSKO" },
    { id: 3, naziv: "drugo", serverValue: "DRUGO" },
  ];

  const roleMapping = {
    ROLE_ADMIN_DOGADJAJ: "admin događaj",
    ROLE_ADMIN: "admin",
    ROLE_SUPER_ADMIN: "super admin",
  };

  const roleServerMapping = {
    "admin događaj": "ROLE_ADMIN_DOGADJAJ",
    admin: "ROLE_ADMIN",
    "super admin": "ROLE_SUPER_ADMIN",
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUloge = async () => {
      try {
        const { data } = await httpProtected.get("/uloge", {
          signal: controller.signal,
        });
        if (isMounted) {
          setAvailableRoles(data);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Greška prilikom fetching uloge: ", error);
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };
    getUloge();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "uloge") {
      // Handle role selection
      setZaposleni((prevState) => {
        const newRoles = checked
          ? [...prevState.uloge, value]
          : prevState.uloge.filter((role) => role !== value);
        return { ...prevState, uloge: newRoles };
      });
    } else if (name === "rod") {
      // Find the corresponding server value for the selected "rod"
      const selectedRod = r.find((item) => item.naziv === value);
      const serverValue = selectedRod ? selectedRod.serverValue : "";
      setZaposleni({ ...zaposleni, rod: serverValue });
    } else {
      // Handle other form fields
      setZaposleni({ ...zaposleni, [name]: value });
    }
  };

  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    const serverValue = roleServerMapping[value];

    setZaposleni((prevState) => {
      const newRoles = checked
        ? [...prevState.uloge, serverValue]
        : prevState.uloge.filter((role) => role !== serverValue);
      return { ...prevState, uloge: newRoles };
    });
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false || !isValidEmail(zaposleni.email)) {
      setValidated(true);
    } else {
      try {
        handleShowToast("Uspešno ste se izmenili zaposlenog!", "success");
        await editZaposleni(id, zaposleni);
        onZaposleniEdit();
      } catch (error) {
        if (!error.response) {
          handleShowToast("Nema odgovora sa servera", "danger");
        } else {
          handleShowToast("Izmena zaposlenog nije uspela!", "danger");
        }
      }
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="email"
            placeholder="Email *"
            value={zaposleni.email}
            onChange={handleChange}
            required
            isInvalid={
              validated &&
              (!isValidEmail(zaposleni.email) || zaposleni.email.length === 0)
            }
          />
          <Form.Control.Feedback type="invalid">
            Unesite ispravnu e-mail adresu.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="ime"
            placeholder="Ime *"
            value={zaposleni.ime}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Ime je obavezno.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="prezime"
            placeholder="Prezime *"
            value={zaposleni.prezime}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Prezime je obavezno.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="select"
            name="rod"
            value={
              r.find((item) => item.serverValue === zaposleni.rod)?.naziv || ""
            }
            onChange={handleChange}
            required
          >
            <option value="">Izaberite rod *</option>
            {r.map((item) => (
              <option key={item.id} value={item.naziv}>
                {item.naziv}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Rod je obavezan.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="godine"
            value={zaposleni.godine}
            onChange={handleChange}
            placeholder="Godina rođenja *"
            required
          />
          <Form.Control.Feedback type="invalid">
            Godina rođenja je obavezna.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="mestoBoravista"
            value={zaposleni.mestoBoravista}
            onChange={handleChange}
            placeholder="Mesto boravišta *"
            required
          />
          <Form.Control.Feedback type="invalid">
            Mesto boravišta je obavezno.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="brojTelefona"
            value={zaposleni.brojTelefona}
            onChange={handleChange}
            placeholder="Broj telefona *"
            required
          />
          <Form.Control.Feedback type="invalid">
            Broj telefona je obavezan.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          {availableRoles
            .filter((role) => role.naziv !== "ROLE_POSETILAC") // Exclude ROLE_POSETILAC
            .map((role) => (
              <Form.Check
                key={role.id}
                type="checkbox"
                label={roleMapping[role.naziv] || role.naziv} // Display friendly name
                value={roleMapping[role.naziv] || role.naziv}
                checked={zaposleni.uloge.includes(role.naziv)}
                onChange={handleRoleChange} // Use the new handler
                name="uloge"
              />
            ))}
          <Form.Control.Feedback type="invalid">
            Uloge su obavezne.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="success">
              Izmeni
            </Button>
          </div>
        </Form.Group>
      </Form>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          minWidth: 300,
          backgroundColor: toastVariant === "success" ? "#a3c57b" : "#f56f66",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastVariant === "success" ? "" : "Greška"}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default EditZaposleniForm;
