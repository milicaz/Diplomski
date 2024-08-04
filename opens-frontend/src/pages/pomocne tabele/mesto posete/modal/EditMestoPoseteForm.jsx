import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoPoseteContext } from "../MestoPoseteContext";

export const EditMestoPoseteForm = ({ updatedMestoPosete }) => {
  const { editMestoPosete } = useContext(MestoPoseteContext);

  const [validated, setValidated] = useState(false);
  const id = updatedMestoPosete.id;
  const [nazivMesta, setNazivMesta] = useState(updatedMestoPosete.nazivMesta);
  const [ukupanBrojMesta, setUkupanBrojMesta] = useState(
    updatedMestoPosete.ukupanBrojMesta
  );

  const editedMestoPosete = { nazivMesta, ukupanBrojMesta };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() && ukupanBrojMesta > 0) {
      editMestoPosete(id, editedMestoPosete);
    }
    setValidated(true);
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nazivMesta">
          <Form.Control
            type="text"
            placeholder="Naziv mesta *"
            name="nazivMesta"
            value={nazivMesta}
            onChange={(e) => setNazivMesta(e.target.value)}
            required
            isInvalid={validated && !nazivMesta}
          />
          <Form.Control.Feedback type="invalid">
            Unesite naziv mesta posete.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ukupanBrojMesta">
          <Form.Control
            type="number"
            placeholder="Ukupan broj mesta *"
            name="ukupanBrojMesta"
            value={ukupanBrojMesta}
            onChange={(e) => setUkupanBrojMesta(e.target.value)}
            min={1}
            step={1}
            required
            isInvalid={validated && (!ukupanBrojMesta || ukupanBrojMesta <= 0)}
          />
          <Form.Control.Feedback type="invalid">
            Unesite ukupan broj mesta.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Izmeni mesto posete
          </Button>
        </div>
      </Form>
    </>
  );
};
export default EditMestoPoseteForm;
