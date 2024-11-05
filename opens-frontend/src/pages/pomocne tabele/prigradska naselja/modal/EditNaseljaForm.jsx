import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PrigradskaNaseljaContext } from "../PrigradskaNaseljaContext";

const EditNaseljaForm = ({ currentNaselje, onNaseljeEdited }) => {
  const { editNaselje } = useContext(PrigradskaNaseljaContext);

  const [validated, setValidated] = useState(false);
  const id = currentNaselje.id;
  const [prigradskoNaselje, setPrigradskoNaselje] = useState({
    naziv: currentNaselje.naziv,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrigradskoNaselje({ ...prigradskoNaselje, [name]: value });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      await editNaselje(id, prigradskoNaselje);
      onNaseljeEdited();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleEdit}>
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
            Izmeni
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default EditNaseljaForm;
