import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { TipDogadjajaContext } from "./TipDogadjajaContext";
import DeleteTipDogadjajaForm from "./modal/DeleteTipDogadjajaForm";
import EditTipDogadjajaForm from "./modal/EditTipDogadjajaForm";

const TipDogadjaja = ({ tipDogadjaja }) => {
  const { getTipovi, deleteTip } = useContext(TipDogadjajaContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleTipDogadjajaEdit = async () => {
    const controller = new AbortController();
    await getTipovi(true, controller);
    handleCloseEdit();
  };

  const handleTipDogadjajaDelete = async () => {
    const controller = new AbortController();
    await getTipovi(true, controller);
    handleCloseDelete();
  };

  return (
    <>
      <td>{tipDogadjaja.naziv}</td>
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
          <Modal.Title>Izmeni tip događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTipDogadjajaForm
            currentTip={tipDogadjaja}
            onTipDogadjajaEdited={handleTipDogadjajaEdit}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši tip događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteTipDogadjajaForm deleteTipDogadjaja={tipDogadjaja} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={async () => {
              await deleteTip(tipDogadjaja.id);
              handleTipDogadjajaDelete();
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

export default TipDogadjaja;
