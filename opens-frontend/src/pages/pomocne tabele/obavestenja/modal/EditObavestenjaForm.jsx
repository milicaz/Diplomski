import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ObavestenjeContext } from "../ObavestenjaContext";

export const EditObavestenjaForm = ({ updatedObavestenje }) => {
  const { editObavestenje } = useContext(ObavestenjeContext);

  const [validated, setValidated] = useState(false);

  const id = updatedObavestenje.id;

  const [naziv, setNaziv] = useState(updatedObavestenje.naziv);
  const [tekst, setTekst] = useState(updatedObavestenje.tekst);
  const [pocetakPrikazivanja, setPocetakPrikazivanja] = useState(
    updatedObavestenje.pocetakPrikazivanja
  );
  const [krajPrikazivanja, setKrajPrikazivanja] = useState(
    updatedObavestenje.krajPrikazivanja
  );
  const [prioritet, setPrioritet] = useState(updatedObavestenje.prioritet);

  const editedObavestenje = {
    naziv,
    tekst,
    pocetakPrikazivanja,
    krajPrikazivanja,
    prioritet: parseInt(prioritet),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      editObavestenje(id, editedObavestenje);
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
            onChange={(e) => setNaziv(e.target.value)}
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
            onChange={(e) => setTekst(e.target.value)}
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
            onChange={(e) => setPocetakPrikazivanja(e.target.value)}
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
            onChange={(e) => setKrajPrikazivanja(e.target.value)}
            required
            isInvalid={validated && !krajPrikazivanja}
          />
          <Form.Control.Feedback type="invalid">
            Izaberite datum kraja prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="prioritet">
          <Form.Label>Prioritet prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Prioritet prikazivanja obaveštenja"
            name="prioritet"
            value={prioritet}
            onChange={(e) => setPrioritet(e.target.value)}
            min={1}
            max={5}
            step={1}
            isInvalid={validated && (!prioritet || prioritet <= 0)}
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
            Izmeni obaveštenje
          </Button>
        </div>
      </Form>
    </>
  );
};
export default EditObavestenjaForm;
