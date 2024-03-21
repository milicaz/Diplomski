import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import EditNaseljaForm from "./modal/EditNaseljaForm";
import DeleteNaseljaForm from "./modal/DeleteNaseljaForm";
import { PrigradskaNaseljaContext } from "./PrigradskaNaseljaContext";

const PrigradskaNaselja = ({ prigradskoNaselje }) => {

  const {deleteNaselje} = useContext(PrigradskaNaseljaContext)

  const [showEdit, setShowEdit] = useState(false)
  const handleShowEdit = () => setShowEdit(true)
  const handleCloseEdit = () => setShowEdit(false)

  const [showDelete, setShowDelete] = useState(false)
  const handleShowDelete = () => setShowDelete(true)
  const handleCloseDelete = () => setShowDelete(false)

  useEffect(() => {
    handleCloseEdit();
    handleCloseDelete();
  }, [prigradskoNaselje])

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

      <Modal show = {showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Izmeni prigradsko naselje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditNaseljaForm currentNaselje = {prigradskoNaselje}/>
        </Modal.Body>
      </Modal>

      <Modal show = {showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši prigradsko naselje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteNaseljaForm deleteNaselje = {prigradskoNaselje}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={() => deleteNaselje(prigradskoNaselje.id)}>Obriši</Button>
          <Button variant="secondary" onClick={handleCloseDelete}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrigradskaNaselja;
