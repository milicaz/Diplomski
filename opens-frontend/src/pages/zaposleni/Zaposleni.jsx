import { useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ZaposleniContext } from "./ZaposleniContext";
import { Button, Modal } from "react-bootstrap";
import DeleteZaposleniForm from "./modal/DeleteZaposleniForm";
import EditZaposleniForm from "./modal/EditZaposleniForm";

const Zaposleni = ({zaposleni}) => {

    const {deleteZaposleni} = useContext(ZaposleniContext)

    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false);

    useEffect(() => {
        handleCloseDelete();
        handleCloseEdit();
    }, [zaposleni])

    return (
        <>
           <td>{zaposleni.email}</td> 
           <td>{zaposleni.ime}</td>
           <td>{zaposleni.prezime}</td>
           <td>{zaposleni.rod}</td>
           <td>{zaposleni.godine}</td>
           <td>{zaposleni.brojTelefona}</td>
           {/* <td>{zaposleni.uloge}</td> */}
           <td>
           <button className="btn text-warning btn-act" onClick={handleShowEdit}>
                    <MdEdit />
                </button>
                <button className="btn text-danger btn-act" onClick={handleShowDelete}>
                    <MdDelete />
                </button>
            </td>

            <Modal show={showDelete} onHide={handleCloseDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Obriši zaposlenog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteZaposleniForm deleteZaposleni={zaposleni} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={() => deleteZaposleni(zaposleni.id)}>
                        Obriši
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>   

            <Modal show={showEdit} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Izmeni zaposlenog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditZaposleniForm currentZaposleni={zaposleni} />
                </Modal.Body>
            </Modal>   
        </>
    )
}

export default Zaposleni;