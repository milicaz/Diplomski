import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Pagination from "../../Pagination";
import AddDogadjajForm from "../mesto dogadjaja/modal/AddDogadjajForm";
import PrigradskaNaselja from "./PrigradskaNaselja";
import { PrigradskaNaseljaContext } from "./PrigradskaNaseljaContext";

const PrigradskaNaseljaList = () => {
  const { prigradskaNaselja } = useContext(PrigradskaNaseljaContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [naseljaPerPage] = useState(5);

  const indexOfLastNaselje = currentPage * naseljaPerPage;

  const indexOfFirstNaselje = indexOfLastNaselje - naseljaPerPage;

  const currentNaselja = prigradskaNaselja.slice(
    indexOfFirstNaselje,
    indexOfLastNaselje
  );

  const totalPagesNumber = Math.ceil(prigradskaNaselja.length / naseljaPerPage);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Prigradska Naselja</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novo prigradsko naselje</span>
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
          {currentNaselja.map((prigradskoNaselje) => (
            <tr key={prigradskoNaselje.id}>
              <PrigradskaNaselja prigradskoNaselje={prigradskoNaselje} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages={totalPagesNumber} setCurrentPage={setCurrentPage} array={prigradskaNaselja} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj prigradsko naselje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDogadjajForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Dodaj</Button>
          <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrigradskaNaseljaList;
