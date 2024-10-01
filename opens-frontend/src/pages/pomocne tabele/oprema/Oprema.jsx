import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteOpremaForm from "./modal/DeleteOpremaForm";
import EditOpremaForm from "./modal/EditOpremaForm";
import { OpremaContext } from "./OpremaContext";

export const Oprema = ({ oprema }) => {
  const { deleteOpremu } = useContext(OpremaContext);

  //za prikazivanje modalnog dijaloga
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  useEffect(() => {
    handleCloseEdit();
    handleCloseDelete();
  }, [oprema]);

  return (
    <>
      <td>{oprema.tipOpreme.naziv}</td>
      <td>{oprema.serijskiBroj}</td>
      <td>
        <button className="btn text-warning btn-act" onClick={handleShowEdit}>
          <MdEdit />
        </button>
        <button className="btn text-danger btn-act" onClick={handleShowDelete}>
          <MdDelete />
        </button>
      </td>

      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Izmena opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditOpremaForm updatedOprema={oprema} />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteOpremaForm oprema={oprema} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => deleteOpremu(oprema.id)}
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
export default Oprema;
