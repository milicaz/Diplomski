import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import TipOpr from "./TipOpr";
import { TipOprContext } from "./TipOprContext";
import AddTipOpremeForm from "./modal/AddTipOpremeForm";

const TipOprList = () => {
  const { sortedTipoviOpreme } = useContext(TipOprContext);

  //za prikazivanje modalnog dijaloga
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  /* Za zatvaranje modalnog dijaloga
    Zatvara se kada se izmeni nesto u tipovima opreme tj kada se doda novi tip opreme
  */
    useEffect(() => {
      handleClose();
    }, [sortedTipoviOpreme]);

  const [currentPage, setCurrentPage] = useState(1);
  const [tipPerPage] = useState(10);
  const indexOfLastTip = currentPage * tipPerPage;
  const indexOfFirstTip = indexOfLastTip - tipPerPage;
  const currentTipovi = sortedTipoviOpreme.slice(indexOfFirstTip, indexOfLastTip);
  const totalPagesNumber = Math.ceil(sortedTipoviOpreme.length / tipPerPage);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Tip opreme</b>
            </h2>
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
        {!sortedTipoviOpreme && sortedTipoviOpreme.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="2" className="nema-unetih"> Nema upisanih tipova opreme.</td>
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

      <Pagination pages={totalPagesNumber} setCurrentPage={setCurrentPage} array={sortedTipoviOpreme} />

      <Modal show={show} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Dodaj tip opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTipOpremeForm />
        </Modal.Body>
        {/* <Modal.Footer> */}
          {/* <Button variant="success">Dodaj</Button> */}
          {/* <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default TipOprList;
