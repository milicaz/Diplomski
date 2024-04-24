import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Pagination from "../../Pagination";
import MestoDogadjaja from "./MestoDogadjaja";
import { MestoDogadjajaContext } from "./MestoDogadjajaContext";
import AddDogadjajForm from "./modal/AddDogadjajForm";

const MestoDogadjajaList = () => {
  const { sortedMestaDogadjaja } = useContext(MestoDogadjajaContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [mestaDogadjajaPerPage, setMestaPosetePerPage] = useState(10);

  useEffect(() => {
    handleClose();
    console.log("Handle close uradjen");
  }, [sortedMestaDogadjaja]);

  const indexOfLastMestoDogadjaja = currentPage * mestaDogadjajaPerPage;
  const indexOfFirstMestoDogadjaja =
    indexOfLastMestoDogadjaja - mestaDogadjajaPerPage;
  const currentMestaDogadjaja = sortedMestaDogadjaja.slice(
    indexOfFirstMestoDogadjaja,
    indexOfLastMestoDogadjaja
  );
  const totalPagesNumber = Math.ceil(
    sortedMestaDogadjaja.length / mestaDogadjajaPerPage
  );

  const onInputChange = (e) => {
    setMestaPosetePerPage(e.target.value);
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
                  name="mestaDogadjajaPerPage"
                  value={mestaDogadjajaPerPage}
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
              <span>Dodaj novo mesto događaja</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv sale</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentMestaDogadjaja.map((mestoDogadjaja) => (
            <tr key={mestoDogadjaja.id}>
              <MestoDogadjaja mestoDogadjaja={mestoDogadjaja} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={sortedMestaDogadjaja}
        limit={mestaDogadjajaPerPage}
        maxVisibleButtons={3}
      />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj mesto događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDogadjajForm />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="success" onClick={handleDodaj}>Dodaj</Button>
          <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default MestoDogadjajaList;
