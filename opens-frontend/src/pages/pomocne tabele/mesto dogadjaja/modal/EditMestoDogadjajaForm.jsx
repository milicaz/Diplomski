import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoDogadjajaContext } from "../MestoDogadjajaContext";

const EditMestoDogadjajaForm = ({ currentMesto }) => {
  const { editMestoDogadjaja } = useContext(MestoDogadjajaContext);

  const [mesto, setMesto] = useState({ nazivSale: currentMesto.nazivSale });

  const id = currentMesto.id;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMesto({ ...mesto, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editMestoDogadjaja(id, mesto);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="nazivSale"
          value={mesto.nazivSale}
          onChange={handleChange}
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

export default EditMestoDogadjajaForm;
