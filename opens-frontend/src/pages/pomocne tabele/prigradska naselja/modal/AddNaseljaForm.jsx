import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PrigradskaNaseljaContext } from "../PrigradskaNaseljaContext";

const AddNaseljaForm = ({ onNaseljeAdded }) => {
  const { addNaselje } = useContext(PrigradskaNaseljaContext);

  const [validated, setValidated] = useState(false);
  const [prigradskoNaselje, setPrigradskoNaselje] = useState({ naziv: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrigradskoNaselje((prevNaselje) => ({ ...prevNaselje, [name]: value }));
  };

  const handleDodaj = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      await addNaselje(prigradskoNaselje);
      onNaseljeAdded();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleDodaj}>
      <Form.Group className="mb-3">
        <Form.Control
          name="naziv"
          value={prigradskoNaselje.naziv}
          onChange={handleChange}
          type="text"
          placeholder="Naziv prigradskog naselja *"
          required
          isInvalid={validated && !prigradskoNaselje.naziv}
        />
        <Form.Control.Feedback type="invalid">
          Unesite naziv prigradskog naselja.
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

export default AddNaseljaForm;
