import { useContext, useState } from "react";
import { MestoPoseteContext } from "./MestoPoseteContext";
import { Button, Modal } from "react-bootstrap";
import MestoPosete from "./MestoPosete";
import AddMestoPoseteForm from "./modal/AddMestoPoseteForm";

const MestoPoseteList = () => {
  const { mestaPosete } = useContext(MestoPoseteContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Mesto Posete</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novo mesto posete</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Ukupan broj mesta</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {mestaPosete.map((mestoPosete) => (
            <tr key={mestoPosete.id}>
              <MestoPosete mestoPosete={mestoPosete} />
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj mesto posete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMestoPoseteForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">
            Dodaj
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MestoPoseteList;
