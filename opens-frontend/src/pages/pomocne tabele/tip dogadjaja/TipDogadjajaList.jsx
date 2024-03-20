import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Pagination from "../../Pagination";
import AddDogadjajForm from "../mesto dogadjaja/modal/AddDogadjajForm";
import TipDogadjaja from "./TipDogadjaja";
import { TipDogadjajaContext } from "./TipDogadjajaContext";
import AddTipDogadjajaForm from "./modal/AddTipDogadjajaForm";

const TipDogadjajaList = () => {
  const { sortedTipoviDogadjaja } = useContext(TipDogadjajaContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [tipDogadjajaPerPage] = useState(5);

  useEffect(() => {
    handleClose();
  }, [sortedTipoviDogadjaja]);

  const indexOfLastTipDogadjaja = currentPage * tipDogadjajaPerPage;

  const indexOfFirstTipDogadjaja =
    indexOfLastTipDogadjaja - tipDogadjajaPerPage;

  const currentTipoviDogadjaja = sortedTipoviDogadjaja.slice(
    indexOfFirstTipDogadjaja,
    indexOfLastTipDogadjaja
  );

  const totalPagesNumber = Math.ceil(
    sortedTipoviDogadjaja.length / tipDogadjajaPerPage
  );

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
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
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
          {currentTipoviDogadjaja.map((tipDogadjaja) => (
            <tr key={tipDogadjaja.id}>
              <TipDogadjaja tipDogadjaja={tipDogadjaja} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages={totalPagesNumber} setCurrentPage={setCurrentPage} array={sortedTipoviDogadjaja} />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj tip događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTipDogadjajaForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TipDogadjajaList;
