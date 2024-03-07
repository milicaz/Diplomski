import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import Oprema from "./Oprema";
import { OpremaContext } from "./OpremaContext";
import AddOpremaForm from "./modal/AddOpremaForm";

export const OpremaTabela = () => {
  const { sortedOprema } = useContext(OpremaContext);

  //za prikazivanje modalnog dijaloga
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  /* Za zatvaranje modalnog dijaloga
     Zatvara se kada se izmeni nesto u opremi tj kada se doda nova oprema
   */
  useEffect(() => {
    handleClose();
  }, [sortedOprema]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const indexOfLast = currentPage * limit;
  const indexOfFirst = indexOfLast - limit;
  const currentOpreme = sortedOprema.slice(indexOfFirst, indexOfLast);
  const totalPagesNumber = Math.ceil(sortedOprema.length / limit);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Oprema</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" onClick={handleShow}>
              <FaSquarePlus size={20} className="mx-1" /> Dodaj opremu
            </Button>
          </div>
        </div>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>Naziv opreme</th>
            <th>Serijski broj opreme</th>
            <th>Akcije</th>
          </tr>
        </thead>
        {!sortedOprema && sortedOprema.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="3" className="nema-unetih">
                Nema unete opreme.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentOpreme.map((o) => (
              <tr key={o.id}>
                <Oprema oprema={o} />
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={sortedOprema}
      />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj opremu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddOpremaForm />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};
export default OpremaTabela;
