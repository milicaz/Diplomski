import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TipOprContext } from "../TipOprContext";

export const EditTipOpremeForm = ({ updatedTipOpreme }) => {
  const { editTipOpreme } = useContext(TipOprContext);

  const id = updatedTipOpreme.id;
  const [naziv, setNaziv] = useState(updatedTipOpreme.naziv);

  const editedTipOpreme = { naziv };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTipOpreme(id, editedTipOpreme);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="naziv">
          <Form.Control
            type="text"
            placeholder="Naziv tipa opreme *"
            name="naziv"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="success" type="submit">
            Izmeni tip opreme
          </Button>
        </div>
      </Form>
    </>
  );
};
export default EditTipOpremeForm;
