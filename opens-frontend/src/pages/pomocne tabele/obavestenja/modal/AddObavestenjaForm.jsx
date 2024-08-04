import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ObavestenjeContext } from "../ObavestenjaContext";

export const AddObavestenjaForm = () => {
  const { addObavestenje } = useContext(ObavestenjeContext);

  const [validated, setValidated] = useState(false);
  const [newObavestenje, setNewObavestenje] = useState({
    naziv: "",
    tekst: "",
    pocetakPrikazivanja: "",
    krajPrikazivanja: "",
    prioritet: 1,
  });

  const onInputChange = (e) => {
    setNewObavestenje({ ...newObavestenje, [e.target.name]: e.target.value });
  };

  const { naziv, tekst, pocetakPrikazivanja, krajPrikazivanja, prioritet } =
    newObavestenje;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      addObavestenje(newObavestenje);
    }
    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="naziv">
          <Form.Control
            type="text"
            placeholder="Naslov obaveštenja *"
            name="naziv"
            value={naziv}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !naziv}
          />
          <Form.Control.Feedback type="invalid">
            Unesite naslov obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="tekst">
          <Form.Control
            as="textarea"
            placeholder="Tekst obaveštenja *"
            name="tekst"
            value={tekst}
            rows={10}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !tekst}
          />
          <Form.Control.Feedback type="invalid">
            Unesite tekst obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="pocetakPrikazivanja">
          <Form.Label>Početak prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Početak prikazivanja obaveštenja *"
            name="pocetakPrikazivanja"
            value={pocetakPrikazivanja}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !pocetakPrikazivanja}
          />
          <Form.Control.Feedback type="invalid">
            Izaberite datum početka prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="krajPrikazivanja">
          <Form.Label>Kraj prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Kraj prikazivanja obaveštenja *"
            name="krajPrikazivanja"
            value={krajPrikazivanja}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !krajPrikazivanja}
          />
          <Form.Control.Feedback type="invalid">
            Izaberite datum kraja prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="pinPriority">
          <Form.Label>Prioritet prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Prioritet prikazivanja obaveštenja"
            name="prioritet"
            value={prioritet}
            onChange={(e) => onInputChange(e)}
            min={1}
            max={5}
            step={1}
            isInvalid={validated && (!prioritet || prioritet <=0)}
          />
          <Form.Text className="text-muted">
            Unesite broj između 1 i 5 koji označava prioritet prikazivanja
            obaveštenja (Veći prioritet se prikazuje prvi).
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Unesite prioritet prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="success" type="submit">
            Dodaj obaveštenje
          </Button>
        </div>
      </Form>
    </>
  );
};
export default AddObavestenjaForm;
