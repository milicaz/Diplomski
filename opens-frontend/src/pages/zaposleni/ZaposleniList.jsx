import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Pagination from "../Pagination";
import RegistracijaZaposleniForm from "./modal/RegistracijaZaposleniForm";
import Zaposleni from "./Zaposleni";
import { ZaposleniContext } from "./ZaposleniContext";

const ZaposleniList = () => {
  const { sortedZaposleni } = useContext(ZaposleniContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [zaposleniPerPage, setZaposleniPerPage] = useState(10);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [sortedZaposleni]);

  const indexOfLastZaposleni = currentPage * zaposleniPerPage;
  const indexOfFirstZaposleni = indexOfLastZaposleni - zaposleniPerPage;
  // console.log("Sorted zaposleni: " + sortedZaposleni)
  const currentZaposleni = sortedZaposleni.slice(
    indexOfFirstZaposleni,
    indexOfLastZaposleni
  );

  const totalPagesNumber = Math.ceil(sortedZaposleni.length / zaposleniPerPage);

  const onInputChange = (e) => {
    setZaposleniPerPage(e.target.value);
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
                  name="zaposleniPerPage"
                  value={zaposleniPerPage}
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
              <span>Registruj novog zaposlenog</span>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <table className="image-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Rod</th>
              <th>Godine</th>
              <th>Mesto boravišta</th>
              <th>Broj telefona</th>
              <th>Uloge</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {currentZaposleni.map((zaposleni) => (
              <tr key={zaposleni.id}>
                <Zaposleni zaposleni={zaposleni} />
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pages={totalPagesNumber}
          setCurrentPage={setCurrentPage}
          array={sortedZaposleni}
          limit={zaposleniPerPage}
          maxVisibleButtons={3}
        />

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registracija zaposlenog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegistracijaZaposleniForm handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ZaposleniList;
