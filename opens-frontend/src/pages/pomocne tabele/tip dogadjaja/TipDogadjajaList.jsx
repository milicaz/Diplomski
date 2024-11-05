import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import TipDogadjaja from "./TipDogadjaja";
import { TipDogadjajaContext } from "./TipDogadjajaContext";
import AddTipDogadjajaForm from "./modal/AddTipDogadjajaForm";

const TipDogadjajaList = () => {
  const { sortedTipoviDogadjaja, getTipovi } = useContext(TipDogadjajaContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [tipDogadjajaPerPage, setTipDogadjajaPerPage] = useState(10);

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

  const onInputChange = (e) => {
    setTipDogadjajaPerPage(e.target.value);
  };

  const handleTipDogadjajaAdded = async () => {
    const controller = new AbortController();
    await getTipovi(true, controller);
    handleClose();
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
                  name="tipDogadjajaPerPage"
                  value={tipDogadjajaPerPage}
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
              <FaSquarePlus size={20} className="mx-1" />
              Dodaj novi tip događaja
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

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={sortedTipoviDogadjaja}
        limit={tipDogadjajaPerPage}
        maxVisibleButtons={3}
      />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj tip događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTipDogadjajaForm onTipDogadjajaAdded={handleTipDogadjajaAdded} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TipDogadjajaList;
