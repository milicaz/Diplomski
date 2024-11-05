import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoDogadjajaContext } from "../MestoDogadjajaContext";

const AddDogadjajForm = ({ onDogadjajAdded }) => {
  const { addMestoDogadjaja } = useContext(MestoDogadjajaContext);

  const [validated, setValidated] = useState(false);
  const [mestoDogadjaja, setMestoDogadjaja] = useState({ nazivSale: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMestoDogadjaja((prevMesto) => ({ ...prevMesto, [name]: value }));
  };

  const handleDodaj = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      await addMestoDogadjaja(mestoDogadjaja);
      onDogadjajAdded();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleDodaj}>
      <Form.Group className="mb-3">
        <Form.Control
          name="nazivSale"
          value={mestoDogadjaja.nazivSale}
          onChange={handleChange}
          type="text"
          placeholder="Naziv sale *"
          required
          isInvalid={validated && !mestoDogadjaja.nazivSale}
        />
        <Form.Control.Feedback type="invalid">
          Unesite naziv sale.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="success">
            Dodaj
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default AddDogadjajForm;
