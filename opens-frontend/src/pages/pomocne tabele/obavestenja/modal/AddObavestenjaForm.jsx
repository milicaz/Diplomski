import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ObavestenjeContext } from "../ObavestenjaContext";

export const AddObavestenjaForm = () => {
  const { addObavestenje } = useContext(ObavestenjeContext);

  const [newObavestenje, setNewObavestenje] = useState({
    naziv: "",
    tekst: "",
    pocetakPrikazivanja: "",
    krajPrikazivanja: "",
    prioritet: 0,
  });

  const onInputChange = (e) => {
    setNewObavestenje({ ...newObavestenje, [e.target.name]: e.target.value });
  };

  const { naziv, tekst, pocetakPrikazivanja, krajPrikazivanja, prioritet } =
    newObavestenje;

  const handleSubmit = (e) => {
    e.preventDefault();
    addObavestenje(newObavestenje);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="naziv">
          <Form.Control
            type="text"
            placeholder="Naslov obaveštenja *"
            name="naziv"
            value={naziv}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tekst">
          <Form.Control
            as="textarea"
            placeholder="Tekst obaveštenja *"
            name="tekst"
            value={tekst}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pocetakPrikazivanja">
          <Form.Control
            type="date"
            placeholder="Početak prikazivanja obaveštenja *"
            name="pocetakPrikazivanja"
            value={pocetakPrikazivanja}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="krajPrikazivanja">
          <Form.Control
            type="date"
            placeholder="Kraj prikazivanja obaveštenja *"
            name="krajPrikazivanja"
            value={krajPrikazivanja}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pinPriority">
          <Form.Control
            type="number"
            placeholder="Prioritet prikazivanja obaveštenja"
            name="prioritet"
            value={prioritet}
            onChange={(e) => onInputChange(e)}
            min={0}
            max={5}
            step={1}
          />
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
