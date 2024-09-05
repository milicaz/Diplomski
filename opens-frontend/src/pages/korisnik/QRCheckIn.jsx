import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { equipmentImage } from "../../assets";
import httpCommon from "../../http-common";

export const QRCheckIn = () => {
  const [posetilac, setPosetilac] = useState("");
  const [mestaPosete, setMestaPosete] = useState([]);
  const [oprema, setOprema] = useState([]);

  const [mestoPoseteId, setMestaPoseteId] = useState();
  const [selectedOprema, setSelectedOprema] = useState([]);
  const inputRef = useRef(null);

  const [status, setStatus] = useState("");
  const [poseta, setPoseta] = useState([]);

  //za prikazivanje modalnog dijaloga
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchMestaPosete();
    fetchOprema();
    handleClose();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //ZA RESET TJ. ZA AUTO FOCUS
  // useEffect(() => {
  //   if (posetilac === "") {
  //     inputRef.current.focus(); // Focus the input field when the form is reset
  //   }
  // }, [posetilac]);

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

  const fetchPosetu = async (email) => {
    try {
      const { data } = await httpCommon.get(`/posete/${email}/oprema`);
      return data;
    } catch (error) {
      console.error("Error fetching oprema:", error);
      return [];
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Tab") {
      setPosetilac(inputRef.current.value);
      try {
        const scannedEmail = inputRef.current.value;
        const response = await httpCommon.get(`/posete/${scannedEmail}/status`);
        setStatus(response.data);
      } catch (error) {}
      inputRef.current.value = "";
    }
  };

  const handleOpremaChange = (selectedOptions) => {
    setSelectedOprema(selectedOptions);
  };

  //CHECK IN
  const addPosetu = async (newPoseta) => {
    httpCommon.post("/posete", newPoseta);
    console.log(newPoseta);
  };

  //CHECK OUT
  const checkOut = async (email) => {
    httpCommon.put(`/posete/${email}`);
  };

  const checkOutWithOprema = async (email) => {
    try {
      await httpCommon.put(`/posete/${email}/checkOprema`);
    } catch (error) {
      console.error("Error checking out opremu:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (status === "not-checked-in") {
        console.log("Usao sam u ADD POSETE - CHECK IN");
        const posetaData = {
          posetilacEmail: posetilac,
          mestoPoseteID: mestoPoseteId,
          oprema: selectedOprema.map((oprema) => ({ id: oprema.value })),
        };
        await addPosetu(posetaData);
        // Reset form state
        setPosetilac("");
        setMestaPoseteId(null);
        setSelectedOprema([]);
        setStatus("");
        setPoseta([]);
      } else if (status === "checked-in") {
        await checkOut(posetilac);
        // Reset form state
        setPosetilac("");
        setMestaPoseteId(null);
        setSelectedOprema([]);
        setStatus("");
        setPoseta([]);
      } else if (status === "checked-in-with-oprema") {
        const p = await fetchPosetu(posetilac);
        if (p) {
          setPoseta(p);
          handleShow(true);
        }
      }
      //window.location.reload();
    } catch (error) {
      console.error("Greska prilikom kreiranja posete:", error);
    }
  };

  const handleDaClick = () => {
    if (posetilac) {
      checkOutWithOprema(posetilac);
      // Reset form state
      setPosetilac("");
      setMestaPoseteId(null);
      setSelectedOprema([]);
      setStatus("");
      setPoseta([]);
      handleClose();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mb-3"
          value={posetilac}
          onChange={(e) => setPosetilac(e.target.value)}
          placeholder="Posetilac"
          autoComplete="off"
          autoFocus
        />
        {status === "not-checked-in" && (
          <>
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
                      label:
                        item.tipOpreme.naziv +
                        " ( " +
                        item.serijskiBroj +
                        " ) ",
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
          </>
        )}
        {(status === "checked-in" || status === "checked-in-with-oprema") && (
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" type="submit" size="lg">
              Check-out
            </Button>
          </div>
        )}
        {/* Hidden input field to capture keyboard input */}
        {/* <input
          ref={inputRef}
          type="text"
          style={{ position: "absolute", top: -100 }}
        /> */}
      </Form>

      <Modal show={show} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Vraćanje opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col className="col-sm-3">
              <Image
                src={equipmentImage}
                alt="slika"
                width="64"
                height="64"
                className="text-center mx-1 mx-md-4"
              />
            </Col>
            <Col className="col-sm-9">
              {poseta ? (
                <div>
                  <p>Da li je oprema vraćena? </p>
                  <b>
                    <ul>
                      {poseta.oprema && poseta.oprema.length > 0 ? (
                        poseta.oprema.map((oprema) => (
                          <li key={oprema.id}>
                            {oprema.tipOpreme?.naziv} ({oprema.serijskiBroj})
                          </li>
                        ))
                      ) : (
                        <li>Nema opreme.</li>
                      )}
                    </ul>
                  </b>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDaClick}>
            Da
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Ne
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default QRCheckIn;
