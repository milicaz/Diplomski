import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Pagination from "../../Pagination";
import PrigradskaNaselja from "./PrigradskaNaselja";
import { PrigradskaNaseljaContext } from "./PrigradskaNaseljaContext";
import AddNaseljaForm from "./modal/AddNaseljaForm";

const PrigradskaNaseljaList = () => {
  const { sortedPrigradskaNaselja } = useContext(PrigradskaNaseljaContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [naseljaPerPage] = useState(5);

  const indexOfLastNaselje = currentPage * naseljaPerPage;

  const indexOfFirstNaselje = indexOfLastNaselje - naseljaPerPage;

  const currentNaselja = sortedPrigradskaNaselja.slice(
    indexOfFirstNaselje,
    indexOfLastNaselje
  );

  useEffect(() => {
    handleClose();
  }, [sortedPrigradskaNaselja])

  const totalPagesNumber = Math.ceil(sortedPrigradskaNaselja.length / naseljaPerPage);

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

      <Pagination pages={totalPagesNumber} setCurrentPage={setCurrentPage} array={sortedPrigradskaNaselja} />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj prigradsko naselje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNaseljaForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PrigradskaNaseljaList;
