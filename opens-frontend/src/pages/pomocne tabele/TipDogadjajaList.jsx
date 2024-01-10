import { useContext, useState } from "react";
import { TipDogadjajaContext } from "./TipDogadjajaContext";
import { Button, Modal } from "react-bootstrap";
import TipDogadjaja from "./TipDogadjaja";
import AddDogadjajForm from "./modal/AddDogadjajForm";

const TipDogadjajaList = () => {
  const { tipoviDogadjaja } = useContext(TipDogadjajaContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Tip Događaja</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi tip događaja</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {tipoviDogadjaja.map((tipDogadjaja) => (
            <tr key={tipDogadjaja.id}>
              <TipDogadjaja tipDogadjaja={tipDogadjaja} />
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Dodaj tip događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddDogadjajForm />
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

export default TipDogadjajaList;
