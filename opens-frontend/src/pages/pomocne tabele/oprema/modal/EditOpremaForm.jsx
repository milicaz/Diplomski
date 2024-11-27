import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../../../hooks/useHttpProtected";
import useToast from "../../../../hooks/useToast";
import { OpremaContext } from "../OpremaContext";

export const EditOpremaForm = ({ updatedOprema, onOpremaEdited }) => {
  const { editOpremu } = useContext(OpremaContext);
  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowToast } = useToast();

  const [validated, setValidated] = useState(false);

  const [tipoviOpreme, setTipoveOpreme] = useState([]);
  const id = updatedOprema.id;
  const [tipOpremeID, setTipOpremeID] = useState(updatedOprema.tipOpreme.id);
  const [serijskiBroj, setSerijskiBroj] = useState(updatedOprema.serijskiBroj);
  const [isFetched, setIsFetched] = useState(false);

  const fetchTipoveOpreme = async () => {
    if (!isFetched) {
      const controller = new AbortController();
      try {
        const { data } = await httpProtected.get("/tipoviOpreme", {
          signal: controller.signal,
        });
        setTipoveOpreme(data);
        setIsFetched(true);
      } catch (error) {
        if (error.response?.status >= 500) {
          handleShowToast(
            "Greška",
            "Greška pri učitavanju podataka. Došlo je do problema prilikom obrade zahteva. Molimo Vas da pokušate ponovo kasnije.",
            "danger"
          );
        } else if (error.name !== "CanceledError") {
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      } finally {
        controller.abort();
      }
    }
  };
  useEffect(() => {
    fetchTipoveOpreme();
  }, []);

  const editedOprema = { tipOpremeID, serijskiBroj };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() && tipOpremeID !== "") {
      await editOpremu(id, editedOprema);
      handleShowToast("", `Opema sa serijskim brojem: ${editedOprema.serijskiBroj} je uspešno izmenjena.`, "success");
      onOpremaEdited();
    } else {
      handleShowToast("Greška", "Popunite sve obavezne podatke.", "danger");
    }
    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="tipOpreme">
          <Form.Select
            name="tipOpremeID"
            value={tipOpremeID}
            onChange={(e) => setTipOpremeID(e.target.value)}
            isInvalid={validated && !tipOpremeID}
          >
            <option value="">Tip opreme</option>
            {tipoviOpreme.map((tipOpreme) => (
              <option key={tipOpreme.id} value={tipOpreme.id}>
                {tipOpreme.naziv}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Izaberite tip opreme.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="serijskiBroj">
          <Form.Control
            type="text"
            placeholder="Serijski broj opreme *"
            name="serijskiBroj"
            value={serijskiBroj}
            onChange={(e) => setSerijskiBroj(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Izmeni opremu
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditOpremaForm;
