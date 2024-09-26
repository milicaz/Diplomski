import { useContext, useEffect, useState } from "react";
import { ZaposleniContext } from "../ZaposleniContext";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const EditZaposleniForm = ({ currentZaposleni }) => {
  const { editZaposleni } = useContext(ZaposleniContext);

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

  const r = [
    { id: 1, naziv: "žensko", serverValue: "ZENSKO" },
    { id: 2, naziv: "muško", serverValue: "MUSKO" },
    { id: 3, naziv: "drugo", serverValue: "DRUGO" },
  ];

  const roleMapping = {
    ROLE_ADMIN_DOGADJAJ: "Admin Događaj",
    ROLE_ADMIN: "Admin",
    ROLE_SUPER_ADMIN: "Super Admin",
  };

  const roleServerMapping = {
    "Admin Događaj": "ROLE_ADMIN_DOGADJAJ",
    Admin: "ROLE_ADMIN",
    "Super Admin": "ROLE_SUPER_ADMIN",
  };

  useEffect(() => {
    // Fetch available roles when the component mounts
    axios
      .get("http://localhost:8080/api/uloge") // Replace with your actual endpoint for roles
      .then((response) => {
        setAvailableRoles(response.data); // Assuming the response data is an array of roles
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const id = currentZaposleni.id;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    editZaposleni(id, zaposleni);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="email"
          value={zaposleni.email}
          onChange={handleChange}
          placeholder="Email "
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="ime"
          value={zaposleni.ime}
          onChange={handleChange}
          placeholder="Ime "
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="prezime"
          value={zaposleni.prezime}
          onChange={handleChange}
          placeholder="Prezime "
          required
        />
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
          <option value="">Izaberite rod</option>
          {r.map((item) => (
            <option key={item.id} value={item.naziv}>
              {item.naziv}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="godine"
          value={zaposleni.godine}
          onChange={handleChange}
          placeholder="Godine "
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="mestoBoravista"
          value={zaposleni.mestoBoravista}
          onChange={handleChange}
          placeholder="Mesto boravišta "
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="brojTelefona"
          value={zaposleni.brojTelefona}
          onChange={handleChange}
          placeholder="Broj telefona "
          required
        />
      </Form.Group>
      {/* <Form.Group>
        {availableRoles.map((role) => (
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
      </Form.Group> */}
      <Form.Group>
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
      </Form.Group>
      <Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="success">
            Izmeni
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default EditZaposleniForm;
