import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TipDogadjajaContext } from "../TipDogadjajaContext";

const AddTipDogadjajaForm = ({ onTipDogadjajaAdded }) => {
  const { addTip } = useContext(TipDogadjajaContext);

  const [validated, setValidated] = useState(false);
  const [tipDogadjaja, setTipDogadjaja] = useState({ naziv: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTipDogadjaja({ ...tipDogadjaja, [name]: value });
  };

  const handleDodaj = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      await addTip(tipDogadjaja);
      onTipDogadjajaAdded();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleDodaj}>
      <Form.Group className="mb-3">
        <Form.Control
          name="naziv"
          value={tipDogadjaja.naziv}
          onChange={handleChange}
          type="text"
          placeholder="Naziv tipa događaja *"
          required
          isInvalid={validated && !tipDogadjaja.naziv}
        />
        <Form.Control.Feedback type="invalid">
          Unesite naziv tipa događaja.
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

export default AddTipDogadjajaForm;
