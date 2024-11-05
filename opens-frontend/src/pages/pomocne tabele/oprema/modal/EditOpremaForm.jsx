import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../../../hooks/useHttpProtected";
import { OpremaContext } from "../OpremaContext";

export const EditOpremaForm = ({ updatedOprema, onOpremaEdited }) => {
  const { editOpremu } = useContext(OpremaContext);
  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  const [validated, setValidated] = useState(false);

  const [tipoviOpreme, setTipoveOpreme] = useState([]);
  const id = updatedOprema.id;
  const [tipOpremeID, setTipOpremeID] = useState(updatedOprema.tipOpreme.id);
  const [serijskiBroj, setSerijskiBroj] = useState(updatedOprema.serijskiBroj);
  const [isFetched, setIsFetched] = useState(false); // Track if data has been fetched

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
        if (error.name !== "CanceledError") {
          console.error("Greška prilikom fetching tipove opreme: ", error);
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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const editedOprema = { tipOpremeID, serijskiBroj };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() && tipOpremeID !== "") {
      handleShowToast("Uspešno ste dodali novu opremu", "success");
      await editOpremu(id, editedOprema);
      onOpremaEdited();
    } else {
      handleShowToast("Popunite sve obavezne podatke.", "danger");
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
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          minWidth: 300,
          backgroundColor: toastVariant === "success" ? "#a3c57b" : "#f56f66",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastVariant === "success" ? "" : "Greška"}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default EditOpremaForm;
