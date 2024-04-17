import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import MestoPosete from "./MestoPosete";
import { MestoPoseteContext } from "./MestoPoseteContext";
import AddMestoPoseteForm from "./modal/AddMestoPoseteForm";

const MestoPoseteList = () => {
  const { sortedMestaPosete } = useContext(MestoPoseteContext);

  //za prikazivanje modalnog dijaloga
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  /* Za zatvaranje modalnog dijaloga
    Zatvara se kada se izmeni nesto u posetiocima tj kada se doda novi posetilac 
  */
  useEffect(() => {
    handleClose();
  }, [sortedMestaPosete]);

  const [currentPage, setCurrentPage] = useState(1);
  const [mestaPosetePerPage, setMestaPosetePerPage] = useState(10);
  const indexOfLastMestoPosete = currentPage * mestaPosetePerPage;
  const indexOfFirstMestoPosete = indexOfLastMestoPosete - mestaPosetePerPage;
  const currentMestaPosete = sortedMestaPosete.slice(
    indexOfFirstMestoPosete,
    indexOfLastMestoPosete
  );
  const totalPagesNumber = Math.ceil(
    sortedMestaPosete.length / mestaPosetePerPage
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
                  name="mestaPosetePerPage"
                  value={mestaPosetePerPage}
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
            <Button className="btn btn-success" onClick={handleShow}>
              <FaSquarePlus size={20} className="mx-1" /> Dodaj mesto posete
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv mesta posete</th>
            <th>Ukupan broj mesta</th>
            <th>Akcije</th>
          </tr>
        </thead>
        {sortedMestaPosete.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="3" className="nema-unetih">
                Nema stavki za prikazivanje.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentMestaPosete.map((mestoPosete) => (
              <tr key={mestoPosete.id}>
                <MestoPosete mestoPosete={mestoPosete} />
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={sortedMestaPosete}
        limit={mestaPosetePerPage}
      />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj mesto posete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMestoPoseteForm />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="success">Dodaj</Button>
          <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default MestoPoseteList;
