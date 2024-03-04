import React, { useContext, useState } from "react";
import { OpremaContext } from "../OpremaContext";
import { Button, Form } from "react-bootstrap";

export const EditOpremaForm = ({ updatedOprema }) => {
  const { editOpremu } = useContext(OpremaContext);

  const id = updatedOprema.id;
  console.log(updatedOprema);
  //   const [tipOpremeID, setTipOpremeID] = useState(updated.nazivMesta);
  const [serijskiBroj, setSerijskiBroj] = useState(updatedOprema.serijskiBroj);

  const editedOprema = { serijskiBroj };

  const handleSubmit = (e) => {
    e.preventDefault();
    editOpremu(id, editedOprema);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="serijskiBroj">
          <Form.Control
            type="text"
            placeholder="Serijski broj opreme *"
            name="serijskiBroj"
            value={serijskiBroj}
            onChange={(e) => setSerijskiBroj(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Izmeni opremu
          </Button>
        </div>
      </Form>
    </>
  );
};
export default EditOpremaForm;
