import { useContext, useState } from "react";
import { DogadjajContext } from "./DogadjajContext";
import { Button, Modal } from "react-bootstrap";
import Dogadjaj from "./Dogadjaj";
import AddNoviDogadjajForm from "./modal/AddNoviDogadjajForm";
import Pagination from "../Pagination";

const DogadjajList = () => {
  const { dogadjaji } = useContext(DogadjajContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1)

  const [dogadjajiPerPage] = useState(5)

  const indexOfLastDogadjaj = currentPage * dogadjajiPerPage

  const indexOfFirstDogadjaj = indexOfLastDogadjaj - dogadjajiPerPage

  const currentDogadjaji = dogadjaji.slice(indexOfFirstDogadjaj, indexOfLastDogadjaj)

  const totalPagesNumber = Math.ceil(dogadjaji.length / dogadjajiPerPage)

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
          {currentDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages = {totalPagesNumber} setCurrentPage = {setCurrentPage} />

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
