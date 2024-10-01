import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TipDogadjajaContext } from "../TipDogadjajaContext";

const AddTipDogadjajaForm = () => {
  const { addTip } = useContext(TipDogadjajaContext);

  const [tipDogadjaja, setTipDogadjaja] = useState({ naziv: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTipDogadjaja({ ...tipDogadjaja, [name]: value });
  };

  const handleDodaj = (event) => {
    event.preventDefault();
    addTip(tipDogadjaja);
  };

  return (
    <Form onSubmit={handleDodaj}>
      <Form.Group className="mb-3">
        <Form.Control
          name="naziv"
          value={tipDogadjaja.naziv}
          onChange={handleChange}
          type="text"
          placeholder="Naziv "
          required
        />
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

export default AddTipDogadjajaForm;
