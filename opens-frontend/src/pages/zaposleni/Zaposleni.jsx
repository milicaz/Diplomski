import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteZaposleniForm from "./modal/DeleteZaposleniForm";
import EditZaposleniForm from "./modal/EditZaposleniForm";
import { ZaposleniContext } from "./ZaposleniContext";

const Zaposleni = ({ zaposleni }) => {
  const { getZaposleni, deleteZaposleni } = useContext(ZaposleniContext);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const roleMapping = {
    ROLE_ADMIN_DOGADJAJ: "admin događaj",
    ROLE_ADMIN: "admin",
    ROLE_SUPER_ADMIN: "super admin",
  };

  const rodMapping = {
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  const handleZaposleniEdit = async () => {
    const controller = new AbortController();
    await getZaposleni(true, controller);
    handleCloseEdit();
  };

  const handleZaposleniDelete = async () => {
    const controller = new AbortController();
    await getZaposleni(true, controller);
    handleCloseDelete();
  };

  return (
    <>
      <td>{zaposleni.email}</td>
      <td>
        {zaposleni.ime} {zaposleni.prezime}
      </td>
      <td>{rodMapping[zaposleni.rod] || zaposleni.rod}</td>
      <td>{zaposleni.godine}</td>
      <td>{zaposleni.mestoBoravista}</td>
      <td>{zaposleni.brojTelefona}</td>
      <td>
        {/* Map through the uloge array and use the role mapping */}
        {zaposleni.uloge.map((uloga, index) => (
          <span key={index}>
            {roleMapping[uloga.naziv] || uloga.naziv}
            {index < zaposleni.uloge.length - 1 ? ", " : ""}
          </span>
        ))}
      </td>
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
          <Modal.Title>Izmeni zaposlenog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditZaposleniForm currentZaposleni={zaposleni} onZaposleniEdit={handleZaposleniEdit}/>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši zaposlenog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteZaposleniForm deleteZaposleni={zaposleni} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={async () => {
              await deleteZaposleni(zaposleni.id);
              handleZaposleniDelete();
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

export default Zaposleni;
