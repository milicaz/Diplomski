import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { MestoPoseteContext } from "./MestoPoseteContext";
import DeleteMestoPoseteForm from "./modal/DeleteMestoPoseteForm";
import EditMestoPoseteForm from "./modal/EditMestoPoseteForm";

const MestoPosete = ({ mestoPosete }) => {
  const { deleteMestoPosete } = useContext(MestoPoseteContext);

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
  }, [mestoPosete]);

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
          <EditMestoPoseteForm updatedMestoPosete={mestoPosete} />
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
            onClick={() => deleteMestoPosete(mestoPosete.id)}
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
