import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ObavestenjeContext } from "../ObavestenjaContext";
import TurndownService from "turndown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill's CSS

export const AddObavestenjaForm = () => {
  const { addObavestenje } = useContext(ObavestenjeContext);

  const [validated, setValidated] = useState(false);
  const [newObavestenje, setNewObavestenje] = useState({
    naziv: "",
    tekst: "",
    pocetakPrikazivanja: "",
    krajPrikazivanja: "",
    prioritet: 1,
  });

  const onInputChange = (e) => {
    setNewObavestenje({ ...newObavestenje, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setNewObavestenje({ ...newObavestenje, tekst: value });
  };

  const { naziv, tekst, pocetakPrikazivanja, krajPrikazivanja, prioritet } =
    newObavestenje;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (tekst.trim() === "") {
      setValidated(true);
      return;
    }
    if (form.checkValidity()) {
      const turndownService = new TurndownService();
      const markdownText = turndownService.turndown(tekst);
      const updatedObavestenje = {
        ...newObavestenje,
        tekst: markdownText,
      };
      addObavestenje(updatedObavestenje);
    }
    setValidated(true);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
    "align",
  ];

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="naziv">
          <Form.Control
            type="text"
            placeholder="Naslov obaveštenja *"
            name="naziv"
            value={naziv}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !naziv}
          />
          <Form.Control.Feedback type="invalid">
            Unesite naslov obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="tekst">
          {/* <Form.Control
            as="textarea"
            placeholder="Tekst obaveštenja *"
            name="tekst"
            value={tekst}
            rows={10}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !tekst}
          />
          <Form.Control.Feedback type="invalid">
            Unesite tekst obaveštenja.
          </Form.Control.Feedback> */}
          <ReactQuill
            value={tekst}
            onChange={handleQuillChange}
            placeholder="Tekst obaveštenja *"
            style={{ height: "200px", marginBottom: "50px" }}
            modules={modules}
            formats={formats}
          />
          {validated && tekst.trim() === "" && (
            <div className="invalid-feedback d-block">
              Unesite tekst obaveštenja.
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="pocetakPrikazivanja">
          <Form.Label>Početak prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Početak prikazivanja obaveštenja *"
            name="pocetakPrikazivanja"
            value={pocetakPrikazivanja}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !pocetakPrikazivanja}
          />
          <Form.Control.Feedback type="invalid">
            Izaberite datum početka prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="krajPrikazivanja">
          <Form.Label>Kraj prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Kraj prikazivanja obaveštenja *"
            name="krajPrikazivanja"
            value={krajPrikazivanja}
            onChange={(e) => onInputChange(e)}
            required
            isInvalid={validated && !krajPrikazivanja}
          />
          <Form.Control.Feedback type="invalid">
            Izaberite datum kraja prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="pinPriority">
          <Form.Label>Prioritet prikazivanja obaveštenja:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Prioritet prikazivanja obaveštenja"
            name="prioritet"
            value={prioritet}
            onChange={(e) => onInputChange(e)}
            min={1}
            max={5}
            step={1}
            isInvalid={validated && (!prioritet || prioritet <= 0)}
          />
          <Form.Text className="text-muted">
            Unesite broj između 1 i 5 koji označava prioritet prikazivanja
            obaveštenja (Veći prioritet se prikazuje prvi).
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Unesite prioritet prikazivanja obaveštenja.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
          <Button variant="success" type="submit">
            Dodaj obaveštenje
          </Button>
        </div>
      </Form>
    </>
  );
};
export default AddObavestenjaForm;
