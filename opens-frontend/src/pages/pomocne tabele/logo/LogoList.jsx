import { useContext, useState } from "react";
import { LogoContext } from "./LogoContext";
import { Button, Modal } from "react-bootstrap";
import Logo from "./Logo";
import AddLogoForm from "./modal/AddLogoForm";

const LogoList = () => {
  const { base64 } = useContext(LogoContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <p>Paginator</p>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi logo</span>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <table className="image-table">
          <thead>
            <tr>
              <th>Redni broj</th>
              <th>Logo</th>
              <th>Naziv</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {base64.map((image, index) => (
              <tr key={image.id}>
                <td>{index + 1}</td>
                <Logo logo={image} />
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddLogoForm />
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
};

export default LogoList;
