import { useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TipOprContext } from "./TipOprContext";
import { Button, Modal } from "react-bootstrap";
import DeleteTipOpremeForm from "./modal/DeleteTipOpremeForm";
import EditTipOpremeForm from "./modal/EditTipOpremeForm";

const TipOpr = ({ tipOpreme }) => {
  const { deleteTipOpreme } = useContext(TipOprContext);

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
  }, [tipOpreme]);

  return (
    <>
      <td>{tipOpreme.naziv}</td>
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
          <Modal.Title>Izmena tipa opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTipOpremeForm updatedTipOpreme={tipOpreme} />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje tipa opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteTipOpremeForm tipOpreme={tipOpreme} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={() => deleteTipOpreme(tipOpreme.id)}>
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

export default TipOpr;
