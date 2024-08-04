import React, { useContext, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import httpCommon from "../../../../http-common";
import { TipOprContext } from "../TipOprContext";

export const EditTipOpremeForm = ({ updatedTipOpreme }) => {
  const { editTipOpreme } = useContext(TipOprContext);

  const [validated, setValidated] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const id = updatedTipOpreme.id;
  const [naziv, setNaziv] = useState(updatedTipOpreme.naziv);

  const editedTipOpreme = { naziv };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const response = await httpCommon.get(
        `/tipoviOpreme/${editedTipOpreme.naziv}`
      );
      const status = response.data;
      if (status === "exists") {
        handleShowToast(
          "Tip opreme sa unetim nazivom već postoji.Unesite novi naziv tipa opreme.",
          "danger"
        );
      } else if (status === "do-not-exist") {
        handleShowToast("Uspešno ste izmenili tip opreme", "success");
        editTipOpreme(id, editedTipOpreme);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="naziv">
          <Form.Control
            type="text"
            placeholder="Naziv tipa opreme *"
            name="naziv"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            required
            isInvalid={validated && !naziv}
          />
          <Form.Control.Feedback type="invalid">
            Unesite naziv tipa opreme.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="success" type="submit">
            Izmeni tip opreme
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
export default EditTipOpremeForm;
