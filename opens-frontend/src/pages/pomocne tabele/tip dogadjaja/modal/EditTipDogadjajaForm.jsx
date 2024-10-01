import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TipDogadjajaContext } from "../TipDogadjajaContext";

const EditTipDogadjajaForm = ({ currentTip }) => {
  const { editTip } = useContext(TipDogadjajaContext);

  const [tipDogadjaja, setTipDogadjaja] = useState({ naziv: currentTip.naziv });

  const id = currentTip.id;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTipDogadjaja({ ...tipDogadjaja, [name]: value });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    editTip(id, tipDogadjaja);
  };

  return (
    <Form onSubmit={handleEdit}>
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
            Izmeni
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default EditTipDogadjajaForm;
