import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { ObavestenjeContext } from '../ObavestenjaContext';

export const EditObavestenjaForm = ({updatedObavestenje}) => {
  const { editObavestenje } = useContext(ObavestenjeContext);

  const id = updatedObavestenje.id;

  const [naziv, setNaziv] = useState(updatedObavestenje.naziv);
  const [tekst, setTekst] = useState(updatedObavestenje.tekst);
  const [pocetakPrikazivanja, setPocetakPrikazivanja] = useState(
    updatedObavestenje.pocetakPrikazivanja
  );
  const [krajPrikazivanja, setKrajPrikazivanja] = useState(
    updatedObavestenje.krajPrikazivanja
  );

  const editedObavestenje = {
    naziv,
    tekst,
    pocetakPrikazivanja,
    krajPrikazivanja,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editObavestenje(id, editedObavestenje);
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
            onChange={(e) => setNaziv(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tekst">
          <Form.Control
            as="textarea"
            placeholder="Tekst obaveštenja *"
            name="tekst"
            value={tekst}
            onChange={(e) => setTekst(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pocetakPrikazivanja">
          <Form.Control
            type="date"
            placeholder="Početak prikazivanja obaveštenja *"
            name="pocetakPrikazivanja"
            value={pocetakPrikazivanja}
            onChange={(e) => setPocetakPrikazivanja(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="krajPrikazivanja">
          <Form.Control
            type="date"
            placeholder="Kraj prikazivanja obaveštenja *"
            name="krajPrikazivanja"
            value={krajPrikazivanja}
            onChange={(e) => setKrajPrikazivanja(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="success" type="submit">
            Izmeni obaveštenje
          </Button>
        </div>
      </Form>
    </>
  );
}
export default EditObavestenjaForm;