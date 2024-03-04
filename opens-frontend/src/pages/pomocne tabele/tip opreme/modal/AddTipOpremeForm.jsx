import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TipOprContext } from "../TipOprContext";

const AddTipOpremeForm = () => {
  const { addTipOpreme } = useContext(TipOprContext);

  const [newTipOpreme, setNewTipOpreme] = useState({
    naziv: "",
  });

  const onInputChange = (e) => {
    setNewTipOpreme({ ...newTipOpreme, [e.target.name]: e.target.value });
  };

  const { naziv } = newTipOpreme;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTipOpreme(newTipOpreme);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="naziv">
          <Form.Control
            type="text"
            placeholder="Naziv tipa opreme *"
            name="naziv"
            value={naziv}
            onChange={(e) => onInputChange(e)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="success" type="submit">
            Dodaj tip opreme
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddTipOpremeForm;
