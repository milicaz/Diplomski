import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import Obavestenja from "./Obavestenja";
import { ObavestenjeContext } from "./ObavestenjaContext";
import AddObavestenjaForm from "./modal/AddObavestenjaForm";

export const ObavestenjaList = () => {
  const { sortedObavestenja } = useContext(ObavestenjeContext);

  //za prikazivanje modalnog dijaloga
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  /* Za zatvaranje modalnog dijaloga
   Zatvara se kada se izmeni nesto u opremi tj kada se doda nova oprema
 */
  useEffect(() => {
    handleClose();
  }, [sortedObavestenja]);

  const sortPoPrioritetu = [...sortedObavestenja].sort((a,b) => b.prioritet - a.prioritet);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const indexOfLast = currentPage * limit;
  const indexOfFirst = indexOfLast - limit;
  // const currentObavestenja = sortedObavestenja.slice(indexOfFirst, indexOfLast);
  // const totalPagesNumber = Math.ceil(sortedObavestenja.length / limit);
  const currentObavestenja = sortPoPrioritetu.slice(indexOfFirst, indexOfLast);
  const totalPagesNumber = Math.ceil(sortPoPrioritetu.length / limit);

  const shouldShowPagination = sortPoPrioritetu >= 5;

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            {/* {sortPoPrioritetu && shouldShowPagination && ( */}
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
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                  </Form.Select>
                </div>
                <div className="col-auto ps-0">
                  <span>unosa</span>
                </div>
              </div>
            {/* )} */}
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" onClick={handleShow}>
              <FaSquarePlus size={20} className="mx-1" /> Dodaj obaveštenje
            </Button>
          </div>
        </div>
      </div>
      {sortedObavestenja.length === 0 ? (
        <>
          <Container
            className="d-flex justify-content-center align-items-center mt-2"
            style={{ height: "100v" }}
          >
            <Row>
              <Col>
                <h4>Nema stavki za prikazivanje.</h4>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div className="row">
          {currentObavestenja.map((o) => (
            <div className="col-lg-4" key={o.id}>
              <Obavestenja obavestenje={o} />
            </div>
          ))}
        </div>
      )}

      {/* {sortPoPrioritetu && shouldShowPagination && ( */}
        <Pagination
          pages={totalPagesNumber}
          setCurrentPage={setCurrentPage}
          array={sortedObavestenja}
          limit={limit}
          maxVisibleButtons={3}
        />
      {/* )} */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj obaveštenje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddObavestenjaForm />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ObavestenjaList;
