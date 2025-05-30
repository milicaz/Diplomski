import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import TipOpr from "./TipOpr";
import { TipOprContext } from "./TipOprContext";
import AddTipOpremeForm from "./modal/AddTipOpremeForm";

const TipOprList = () => {
  const { sortedTipoviOpreme, fetchTipoveOpreme } = useContext(TipOprContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [tipPerPage, setTipPerPage] = useState(10);

  const indexOfLastTip = currentPage * tipPerPage;
  const indexOfFirstTip = indexOfLastTip - tipPerPage;
  const currentTipovi = sortedTipoviOpreme.slice(
    indexOfFirstTip,
    indexOfLastTip
  );
  const totalPagesNumber = Math.ceil(sortedTipoviOpreme.length / tipPerPage);

  const shouldShowPagination = sortedTipoviOpreme.length >= 10;

  const onInputChange = (e) => {
    setTipPerPage(e.target.value);
  };

  const handleTipOpremeAdded = async () => {
    const controller = new AbortController();
    await fetchTipoveOpreme(true, controller);
    handleClose();
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            {sortedTipoviOpreme && shouldShowPagination && (
              <div className="row align-items-center mb-3">
                <div className="col-auto pe-0">
                  <span>Prikaži</span>
                </div>
                <div className="col-auto">
                  <Form.Select
                    name="tipPerPage"
                    value={tipPerPage}
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
            )}
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" onClick={handleShow}>
              <FaSquarePlus size={20} className="mx-1" /> Dodaj tip opreme
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv opreme</th>
            <th>Akcije</th>
          </tr>
        </thead>
        {sortedTipoviOpreme.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="2" className="nema-unetih">
                {" "}
                Nema stavki za prikazivanje.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentTipovi.map((tipOpreme) => (
              <tr key={tipOpreme.id}>
                <TipOpr tipOpreme={tipOpreme} />
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {sortedTipoviOpreme && shouldShowPagination && (
        <Pagination
          pages={totalPagesNumber}
          setCurrentPage={setCurrentPage}
          array={sortedTipoviOpreme}
          limit={tipPerPage}
          maxVisibleButtons={3}
        />
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj tip opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTipOpremeForm onTipOpremeAdded={handleTipOpremeAdded} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TipOprList;
