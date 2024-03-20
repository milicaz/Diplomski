import { useContext, useEffect, useState } from "react"
import { MdDelete, MdEdit } from "react-icons/md"
import { MestoDogadjajaContext } from "./MestoDogadjajaContext"
import { Button, Modal } from "react-bootstrap";
import EditMestoDogadjajaForm from "./modal/EditMestoDogadjajaForm";
import DeleteMestoDogadjajaForm from "./modal/DeleteMestoDogadjajaForm";

const MestoDogadjaja = ({mestoDogadjaja}) => {

    const {deleteMestoDogadjaja} = useContext(MestoDogadjajaContext);

    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    useEffect(() => {
        handleCloseEdit();
        handleCloseDelete();
    }, [mestoDogadjaja]);

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
                    <EditMestoDogadjajaForm currentMesto={mestoDogadjaja}/>
                </Modal.Body>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Obriši mesto događaja</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteMestoDogadjajaForm deleteMestoDogadjaja = {mestoDogadjaja}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={() => deleteMestoDogadjaja(mestoDogadjaja.id)}>
                        Obriši
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MestoDogadjaja;