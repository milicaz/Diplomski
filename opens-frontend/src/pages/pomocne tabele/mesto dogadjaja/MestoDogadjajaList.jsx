import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Pagination from "../../Pagination";
import MestoDogadjaja from "./MestoDogadjaja";
import { MestoDogadjajaContext } from "./MestoDogadjajaContext";
// import AddDogadjajForm from "./modal/AddDogadjajForm";

const MestoDogadjajaList = () => {
  const { mestaDogadjaja } = useContext(MestoDogadjajaContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [mestaDogadjajaPerPage] = useState(5);

  const indexOfLastMestoDogadjaja = currentPage * mestaDogadjajaPerPage;

  const indexOfFirstMestoDogadjaja =
    indexOfLastMestoDogadjaja - mestaDogadjajaPerPage;

  const currentMestaDogadjaja = mestaDogadjaja.slice(
    indexOfFirstMestoDogadjaja,
    indexOfLastMestoDogadjaja
  );

  const totalPagesNumber = Math.ceil(
    mestaDogadjaja.length / mestaDogadjajaPerPage
  );

  const [mestoDogadjaja, setMestoDogadjaja] = useState({ nazivSale: '' });

  const handleDodaj = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/api/mestaDogadjaja', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mestoDogadjaja),
    }).then(response => response.json())
    .then(data => console.log('Mesto dogadjaja created:', data))
    .catch(error => console.error('Error creating mesto dogadjaja:', error))
    handleClose()
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setMestoDogadjaja(prevMesto => ({...prevMesto, [name]: value}))
  }

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Mesto Događaja</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novo mesto događaja</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv sale</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentMestaDogadjaja.map((mestoDogadjaja) => (
            <tr key={mestoDogadjaja.id}>
              <MestoDogadjaja mestoDogadjaja={mestoDogadjaja} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages={totalPagesNumber} setCurrentPage={setCurrentPage} array={mestaDogadjaja} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj mesto događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <AddDogadjajForm /> */}
          <Form>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} name="nazivSale" value={mestoDogadjaja.naziv} onChange={handleChange} type="text" placeholder="Naziv " required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDodaj}>Dodaj</Button>
          <Button variant="danger" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MestoDogadjajaList;
