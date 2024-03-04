import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoPoseteContext } from "../MestoPoseteContext";

export const EditMestoPoseteForm = ({ updatedMestoPosete }) => {
  const { editMestoPosete } = useContext(MestoPoseteContext);

  const id = updatedMestoPosete.id;
  const [nazivMesta, setNazivMesta] = useState(updatedMestoPosete.nazivMesta);
  const [ukupanBrojMesta, setUkupanBrojMesta] = useState(
    updatedMestoPosete.ukupanBrojMesta
  );

  const editedMestoPosete = { nazivMesta, ukupanBrojMesta };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMestoPosete(id, editedMestoPosete);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nazivMesta">
          <Form.Control
            type="text"
            placeholder="Naziv mesta *"
            name="nazivMesta"
            value={nazivMesta}
            onChange={(e) => setNazivMesta(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ukupanBrojMesta">
          <Form.Control
            type="number"
            placeholder="Ukupan broj mesta *"
            name="ukupanBrojMesta"
            value={ukupanBrojMesta}
            onChange={(e) => setUkupanBrojMesta(e.target.value)}
            required
          />
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
