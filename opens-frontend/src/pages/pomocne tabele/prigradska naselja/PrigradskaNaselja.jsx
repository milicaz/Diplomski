import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteNaseljaForm from "./modal/DeleteNaseljaForm";
import EditNaseljaForm from "./modal/EditNaseljaForm";
import { PrigradskaNaseljaContext } from "./PrigradskaNaseljaContext";

const PrigradskaNaselja = ({ prigradskoNaselje }) => {
  const { getNaselje, deleteNaselje } = useContext(PrigradskaNaseljaContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleNaseljeEdit = async () => {
    const controller = new AbortController();
    await getNaselje(true, controller);
    handleCloseEdit();
  };

  const handleNaseljeDelete = async () => {
    const controller = new AbortController();
    await getNaselje(true, controller);
    handleCloseDelete();
  };

  return (
    <>
      <td>{prigradskoNaselje.naziv}</td>
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
          <Modal.Title>Izmeni prigradsko naselje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditNaseljaForm
            currentNaselje={prigradskoNaselje}
            onNaseljeEdited={handleNaseljeEdit}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši prigradsko naselje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteNaseljaForm deleteNaselje={prigradskoNaselje} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={async () => {
              await deleteNaselje(prigradskoNaselje.id);
              handleNaseljeDelete();
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

export default PrigradskaNaselja;
