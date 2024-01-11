import { useContext, useState } from "react";
import { DogadjajContext } from "./DogadjajContext";
import { Button, Modal } from "react-bootstrap";
import Dogadjaj from "./Dogadjaj";
import AddNoviDogadjajForm from "./modal/AddNoviDogadjajForm";

const DogadjajList = () => {
  const { dogadjaji } = useContext(DogadjajContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Događaji</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi događaj</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Datum</th>
            <th>Mesto</th>
            <th>Vrsta</th>
            <th>Početak događaja</th>
            <th>Kraj događaja</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {dogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dodaj događaj</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddNoviDogadjajForm />
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

export default DogadjajList;
