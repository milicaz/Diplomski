import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { ObavestenjeContext } from "./ObavestenjaContext";
import DeleteObavestenjaForm from "./modal/DeleteObavestenjaForm";
import EditObavestenjaForm from "./modal/EditObavestenjaForm";

export const Obavestenja = ({ obavestenje }) => {
  const { deleteObavestenje } = useContext(ObavestenjeContext);

  const [isTruncated, setIsTruncated] = useState(true);

  //za prikazivanje modalnog dijaloga
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  useEffect(() => {
    handleCloseEdit();
    handleCloseDelete();
  }, [obavestenje]);

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title className="mb-3">{obavestenje.naziv}</Card.Title>
          <Card.Subtitle className="mb-3">
            Početak prikazivanja:{" "}
            {new Date(obavestenje.pocetakPrikazivanja).toLocaleDateString(
              "sr-SR"
            )}{" "}
            <br />
            Kraj prikazivanja:{" "}
            {new Date(obavestenje.krajPrikazivanja).toLocaleDateString("sr-SR")}
          </Card.Subtitle>
          {isTruncated ? (
            <ReactMarkdown>
              {obavestenje.tekst.slice(0, 200) + "..."}
            </ReactMarkdown>
          ) : (
            <ReactMarkdown>{obavestenje.tekst}</ReactMarkdown>
          )}
          <div className="row align-items-center">
            <div className="col">
              <Button onClick={toggleTruncate}>
                {isTruncated ? "Prikaži više" : "Prikaži manje"}
              </Button>
            </div>

            <div className="col-auto ps-0">
              <button
                className="btn text-warning btn-act"
                onClick={handleShowEdit}
              >
                <MdEdit />
              </button>
              <button
                className="btn text-danger btn-act"
                onClick={handleShowDelete}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Izmena obaveštenja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditObavestenjaForm updatedObavestenje={obavestenje} />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje obaveštenja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteObavestenjaForm obavestenje={obavestenje} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => deleteObavestenje(obavestenje.id)}
          >
            Obriši
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Obavestenja;
