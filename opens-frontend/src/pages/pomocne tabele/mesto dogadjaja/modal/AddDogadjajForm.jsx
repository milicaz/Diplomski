import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MestoDogadjajaContext } from "../MestoDogadjajaContext";

const AddDogadjajForm = () => {
  const { addMestoDogadjaja } = useContext(MestoDogadjajaContext);
  const [mestoDogadjaja, setMestoDogadjaja] = useState({ nazivSale: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMestoDogadjaja((prevMesto) => ({ ...prevMesto, [name]: value }));
  };

  const handleDodaj = (event) => {
    event.preventDefault();
    addMestoDogadjaja(mestoDogadjaja);
  };

  return (
    <Form onSubmit={handleDodaj}>
      <Form.Group className="mb-3">
        <Form.Control
          name="nazivSale"
          value={mestoDogadjaja.nazivSale}
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

export default AddDogadjajForm;
