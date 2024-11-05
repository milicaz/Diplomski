import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../../../hooks/useHttpProtected";
import { OpremaContext } from "../OpremaContext";

export const AddOpremaForm = ({ onOpremaAdded }) => {
  const { addOpremu } = useContext(OpremaContext);
  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  const [validated, setValidated] = useState(false);
  const [tipoviOpreme, setTipoveOpreme] = useState([]);
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

  const [newOprema, setNewOprema] = useState({
    tipOpremeID: "",
    serijskiBroj: "",
  });

  const onInputChange = (e) => {
    setNewOprema({ ...newOprema, [e.target.name]: e.target.value });
  };

  const { tipOpremeID, serijskiBroj } = newOprema;

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const controller = new AbortController();
    if (form.checkValidity() && tipOpremeID !== "") {
      try {
        const response = await httpProtected.get(
          `/oprema/${newOprema.serijskiBroj}/check`,
          {
            signal: controller.signal,
          }
        );
        const status = response.data;
        if (status === "exists") {
          handleShowToast(
            "Oprema sa unetim serijskim brojem već postoji. Unesite novi serijski broj opreme.",
            "danger"
          );
        } else if (status === "do-not-exist") {
          handleShowToast("Uspešno ste dodali novu opremu", "success");
          await addOpremu(newOprema);
          onOpremaAdded();
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Error dodavanje opreme:", error);
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      } finally {
        controller.abort();
      }
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
            onChange={(e) => onInputChange(e)}
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
            placeholder="Serijski broj *"
            name="serijskiBroj"
            value={serijskiBroj}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !serijskiBroj}
          />
          <Form.Control.Feedback type="invalid">
            Unesite serijski broj opreme.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Dodaj opremu
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
export default AddOpremaForm;
