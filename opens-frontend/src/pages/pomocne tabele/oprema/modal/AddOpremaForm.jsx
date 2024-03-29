import React, { useContext, useEffect, useState } from "react";
import { OpremaContext } from "../OpremaContext";
import httpCommon from "../../../../http-common";
import { Button, Form } from "react-bootstrap";

export const AddOpremaForm = () => {
    const { addOpremu } = useContext(OpremaContext);
    const [tipoviOpreme, setTipoveOpreme] = useState([]);
  
    const fetchTipoveOpreme = async () => {
      const { data } = await httpCommon.get("/tipoviOpreme");
      setTipoveOpreme(data);
    };
  
    useEffect(() => {
      fetchTipoveOpreme();
    });
  
    const [newOprema, setNewOprema] = useState({
      tipOpremeID: "",
      serijskiBroj: "",
    });
  
    const onInputChange = (e) => {
      setNewOprema({ ...newOprema, [e.target.name]: e.target.value });
    };
  
    const { tipOpremeID, serijskiBroj } = newOprema;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addOpremu(newOprema);
    };
  
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="tipOpreme">
            <Form.Select
              name="tipOpremeID"
              value={tipOpremeID}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Tip opreme</option>
              {tipoviOpreme.map((tipOpreme) => (
                <option value={tipOpreme.id}>{tipOpreme.naziv}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serijskiBroj">
            <Form.Control
              type="text"
              placeholder="Serijski broj *"
              name="serijskiBroj"
              value={serijskiBroj}
              onChange={(e) => onInputChange(e)}
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit">
              Dodaj opremu
            </Button>
          </div>
        </Form>
      </>
    );
};
export default AddOpremaForm;
