import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
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
  const [limit, setLimit] = useState(10);

  const indexOfLast = currentPage * limit;
  const indexOfFirst = indexOfLast - limit;
  const currentOpreme = sortedOprema.slice(indexOfFirst, indexOfLast);
  const totalPagesNumber = Math.ceil(sortedOprema.length / limit);

  const shouldShowPagination = sortedOprema.length >= 10;

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            {sortedOprema && shouldShowPagination && (
              <div className="row align-items-center mb-3">
                <div className="col-auto pe-0">
                  <span>Prikaži</span>
                </div>
                <div className="col-auto">
                  <Form.Select
                    name="limit"
                    value={limit}
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
        {sortedOprema.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="3" className="nema-unetih">
                Nema stavki za prikazivanje.
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

      {sortedOprema && shouldShowPagination && (
        <Pagination
          pages={totalPagesNumber}
          setCurrentPage={setCurrentPage}
          array={sortedOprema}
          limit={limit}
          maxVisibleButtons={3}
        />
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj opremu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddOpremaForm />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default OpremaTabela;
