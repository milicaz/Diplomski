import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { LogoContext } from "./LogoContext";
import DeleteLogoForm from "./modal/DeleteLogoForm";

const Logo = ({ logo }) => {
  const { deleteLogo } = useContext(LogoContext);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  useEffect(() => {
    handleCloseDelete();
  }, [logo]);

  return (
    <>
      <td>
        <img src={`data:${logo.type};base64,${logo.picByte}`} width={500} />
      </td>
      <td>{logo.name}</td>
      <td>
        <button className="btn text-danger btn-act" onClick={handleShowDelete}>
          <MdDelete />
        </button>
      </td>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteLogoForm deleteLogo={logo} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => deleteLogo(logo.id)}
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

export default Logo;
