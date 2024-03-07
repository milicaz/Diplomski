import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoPoseteContext } from "../MestoPoseteContext";

const AddMestoPoseteForm = () => {
  const { addMestoPosete } = useContext(MestoPoseteContext);

  const [newMestoPosete, setNewMestoPosete] = useState({
    nazivMesta: "",
    ukupanBrojMesta: 0,
  });

  const onInputChange = (e) => {
    setNewMestoPosete({ ...newMestoPosete, [e.target.name]: e.target.value });
  };

  const { nazivMesta, ukupanBrojMesta } = newMestoPosete;

  const handleSubmit = (e) => {
    e.preventDefault();
    addMestoPosete(newMestoPosete);
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
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ukupanBrojMesta">
          <Form.Control
            type="number"
            placeholder="Ukupan broj mesta"
            name="ukupanBrojMesta"
            value={ukupanBrojMesta}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Dodaj mesto posete
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddMestoPoseteForm;
