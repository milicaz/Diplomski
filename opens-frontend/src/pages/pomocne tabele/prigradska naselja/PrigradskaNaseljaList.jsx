import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
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
  const [naseljaPerPage, setNaseljaPerPage] = useState(10);

  const indexOfLastNaselje = currentPage * naseljaPerPage;
  const indexOfFirstNaselje = indexOfLastNaselje - naseljaPerPage;
  const currentNaselja = sortedPrigradskaNaselja.slice(
    indexOfFirstNaselje,
    indexOfLastNaselje
  );
  const totalPagesNumber = Math.ceil(
    sortedPrigradskaNaselja.length / naseljaPerPage
  );

  useEffect(() => {
    handleClose();
  }, [sortedPrigradskaNaselja]);

  const onInputChange = (e) => {
    setNaseljaPerPage(e.target.value);
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <div className="row align-items-center mb-3">
              <div className="col-auto pe-0">
                <span>Prikaži</span>
              </div>
              <div className="col-auto">
                <Form.Select
                  name="naseljaPerPage"
                  value={naseljaPerPage}
                  onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Form.Select>
              </div>
              <div className="col-auto ps-0">
                <span>unosa</span>
              </div>
            </div>
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

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={sortedPrigradskaNaselja}
        limit={naseljaPerPage}
        maxVisibleButtons={3}
      />

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
