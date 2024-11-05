import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { MestoDogadjajaContext } from "./MestoDogadjajaContext";
import DeleteMestoDogadjajaForm from "./modal/DeleteMestoDogadjajaForm";
import EditMestoDogadjajaForm from "./modal/EditMestoDogadjajaForm";

const MestoDogadjaja = ({ mestoDogadjaja }) => {
  const { getMesta, deleteMestoDogadjaja } = useContext(MestoDogadjajaContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleDogadjajEdit = async () => {
    const controller = new AbortController();
    await getMesta(true, controller);
    handleCloseEdit();
  };

  const handleDogadjajDelete = async () => {
    const controller = new AbortController();
    await getMesta(true, controller);
    handleCloseDelete();
  };

  return (
    <>
      <td>{mestoDogadjaja.nazivSale}</td>
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
          <Modal.Title>Izmeni mesto događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMestoDogadjajaForm
            currentMesto={mestoDogadjaja}
            onDogadjajEdited={handleDogadjajEdit}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši mesto događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteMestoDogadjajaForm deleteMestoDogadjaja={mestoDogadjaja} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={async () => {
              await deleteMestoDogadjaja(mestoDogadjaja.id);
              handleDogadjajDelete();
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

export default MestoDogadjaja;
