import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteTipOpremeForm from "./modal/DeleteTipOpremeForm";
import EditTipOpremeForm from "./modal/EditTipOpremeForm";
import { TipOprContext } from "./TipOprContext";

const TipOpr = ({ tipOpreme }) => {
  const { fetchTipoveOpreme, deleteTipOpreme } = useContext(TipOprContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleTipOpremeEdit = async () => {
    const controller = new AbortController();
    await fetchTipoveOpreme(true, controller);
    handleCloseEdit();
  };

  const handleTipOpremeDelete = async () => {
    const controller = new AbortController();
    await fetchTipoveOpreme(true, controller);
    handleCloseDelete();
  };

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
          <EditTipOpremeForm
            updatedTipOpreme={tipOpreme}
            onTipOpremeEdited={handleTipOpremeEdit}
          />
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
          <Button
            className="btn btn-danger"
            onClick={async () => {
              await deleteTipOpreme(tipOpreme.id);
              handleTipOpremeDelete();
            }}
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

export default TipOpr;
