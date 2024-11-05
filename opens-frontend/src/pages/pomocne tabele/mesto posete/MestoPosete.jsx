import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { MestoPoseteContext } from "./MestoPoseteContext";
import DeleteMestoPoseteForm from "./modal/DeleteMestoPoseteForm";
import EditMestoPoseteForm from "./modal/EditMestoPoseteForm";

const MestoPosete = ({ mestoPosete }) => {
  const { fetchMestaPosete, deleteMestoPosete } =
    useContext(MestoPoseteContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleMestoPoseteEdit = async () => {
    const controller = new AbortController();
    await fetchMestaPosete(true, controller);
    handleCloseEdit();
  };

  const handleMestoPoseteDelete = async () => {
    const controller = new AbortController();
    await fetchMestaPosete(true, controller);
    handleCloseDelete();
  };

  return (
    <>
      <td>{mestoPosete.nazivMesta}</td>
      <td>{mestoPosete.ukupanBrojMesta}</td>
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
          <Modal.Title>Izmena mesta posete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMestoPoseteForm
            updatedMestoPosete={mestoPosete}
            onMestoPoseteEdited={handleMestoPoseteEdit}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje mesta posete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteMestoPoseteForm mestoPosete={mestoPosete} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={async () => {
              await deleteMestoPosete(mestoPosete.id);
              handleMestoPoseteDelete();
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

export default MestoPosete;
