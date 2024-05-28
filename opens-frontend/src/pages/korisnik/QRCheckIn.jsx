import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import httpCommon from "../../http-common";

export const QRCheckIn = () => {
  const [posetilac, setPosetilac] = useState("");
  const [mestaPosete, setMestaPosete] = useState([]);
  const [oprema, setOprema] = useState([]);

  const [mestoPoseteId, setMestaPoseteId] = useState();
  const [selectedOprema, setSelectedOprema] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchMestaPosete();
    fetchOprema();
    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fetchMestaPosete = async () => {
    const { data } = await httpCommon.get("/mestaPosete");
    setMestaPosete(data);
  };

  const fetchOprema = async () => {
    try {
      const { data } = await httpCommon.get("/oprema/false");
      setOprema(data);
    } catch (error) {
      console.error("Greška prilikom fetching opreme:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (inputRef.current === document.activeElement && e.key === "Tab") {
      setPosetilac(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleOpremaChange = (selectedOptions) => {
    setSelectedOprema(selectedOptions);
  };

  const addPosetu = async (newPoseta) => {
    httpCommon.post("/posete", newPoseta);
    console.log(newPoseta);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const posetaData = {
        posetilacEmail: posetilac,
        mestoPoseteID: mestoPoseteId,
        oprema: selectedOprema.map((oprema) => ({ id: oprema.value })),
      };
      addPosetu(posetaData);
      //window.location.reload();
    } catch (error) {
      console.error("Greska prilikom kreiranja posete:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        className="mb-3"
        value={posetilac}
        onChange={(e) => setPosetilac(e.target.value)}
        placeholder="Posetilac"
        autoComplete="off"
        autoFocus
      />
      <div className="mb-3">
        <span className="mx-3">Mesto posete:</span>
        {mestaPosete.map((mesto) => (
          <Form.Check
            inline
            key={mesto.id}
            label={`${mesto.nazivMesta}`}
            name="mestoPoseteID"
            type="radio"
            value={mesto.id}
            onChange={() => setMestaPoseteId(mesto.id)}
            checked={mestoPoseteId === mesto.id}
          />
        ))}
      </div>
      <Select
        className="mb-3"
        value={selectedOprema}
        onChange={handleOpremaChange}
        options={
          oprema.length > 0
            ? oprema.map((item) => ({
                value: item.id,
                label: item.tipOpreme.naziv + " ( " + item.serijskiBroj + " ) ",
              }))
            : []
        }
        placeholder={"Oprema"}
        isMulti
        isSearchable
      />
      <div className="d-grid gap-2 mt-3">
        <Button variant="success" type="submit" size="lg">
          Check-in
        </Button>
      </div>
      {/* Hidden input field to capture keyboard input */}
      <input
        ref={inputRef}
        type="text"
        style={{ position: "absolute", top: -100 }}
      />
    </Form>
  );
};
export default QRCheckIn;
