import { useContext, useState } from "react";
import TipOpr from "./TipOpr";
import { TipOprContext } from "./TipOprContext";
import { Button, Modal } from "react-bootstrap";
import AddTipOpremeForm from "./modal/AddTipOpremeForm";

const TipOprList = () => {

  const { tipoviOpreme } = useContext(TipOprContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

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
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi tip opreme</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Šifra</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {tipoviOpreme.map(tipOpreme => (
            <tr key={tipOpreme.id}>
              <TipOpr tipOpreme={tipOpreme} />
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj tip opreme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTipOpremeForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">
            Dodaj
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
    )

}

export default TipOprList;