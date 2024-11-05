import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoDogadjajaContext } from "../MestoDogadjajaContext";

const EditMestoDogadjajaForm = ({ currentMesto, onDogadjajEdited }) => {
  const { editMestoDogadjaja } = useContext(MestoDogadjajaContext);

  const [validated, setValidated] = useState(false);
  const id = currentMesto.id;
  const [mesto, setMesto] = useState({ nazivSale: currentMesto.nazivSale });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMesto({ ...mesto, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      await editMestoDogadjaja(id, mesto);
      onDogadjajEdited();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="nazivSale"
          value={mesto.nazivSale}
          onChange={handleChange}
          placeholder="Naziv sale *"
          required
          isInvalid={validated && !mesto.nazivSale}
        />
        <Form.Control.Feedback type="invalid">
          Unesite naziv sale.
        </Form.Control.Feedback>
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

export default EditMestoDogadjajaForm;
