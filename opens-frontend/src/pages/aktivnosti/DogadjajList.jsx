import { useContext, useEffect, useState } from "react";
import { DogadjajContext } from "./DogadjajContext";
import { Button, Form, Modal } from "react-bootstrap";
import Dogadjaj from "./Dogadjaj";
import Pagination from "../Pagination";
import { LocalDate, LocalTime } from "@js-joda/core";

const DogadjajList = ({ handleShowOrg, showOrg, handleCloseOrg }) => {
  const { sortedDogadjaji } = useContext(DogadjajContext);
  const {addOrganizacija} = useContext(DogadjajContext);
  const {organizacijaId} = useContext(DogadjajContext);
  const {addDogadjaj} = useContext(DogadjajContext);

  const [organizacija, setOrganizacija] = useState({naziv: "", odgovornaOsoba: "", brojTelefona: "", email: "", delatnost: "", opis: "", link: ""})

  const [dogadjaj, setDogadjaj] = useState({naziv: "", datum: LocalDate.now(), pocetakDogadjaja: LocalTime.MIDNIGHT, krajDogadjaja: LocalTime.MIDNIGHT, organizacijaId: organizacijaId, mestoDogadjajaId: "", vrstaDogadjajaId: ""}) 

  const [showDogadjaj, setShowDogadjaj] = useState(false)
  const handleShowDogadjaj = () => {
    setShowDogadjaj(true)
  }
  const handleCloseDogadjaj = () => {
    setShowDogadjaj(false)
  }

  const [showOrganizacija, setShowOrganizacija] = useState(false)
  const handleShowOrganizacija = () => {
    setShowOrganizacija(true)
  }
  const handleCloseOrganizacija = () => {
    setShowOrganizacija(false)
  }

  const [currentPage, setCurrentPage] = useState(1)

  const [dogadjajiPerPage] = useState(5)

  useEffect(() => {
    console.log("organizacijaId has been updated:", organizacijaId);
  }, [organizacijaId]);

  const indexOfLastDogadjaj = currentPage * dogadjajiPerPage

  const indexOfFirstDogadjaj = indexOfLastDogadjaj - dogadjajiPerPage

  const currentDogadjaji = sortedDogadjaji.slice(indexOfFirstDogadjaj, indexOfLastDogadjaj)

  const totalPagesNumber = Math.ceil(sortedDogadjaji.length / dogadjajiPerPage)

  const handleChange = (event) => {
    const {name, value} = event.target
    setOrganizacija(prevOrganizacija => ({...prevOrganizacija, [name]: value}))
}

const handleDalje = (event) => {
    event.preventDefault();
    addOrganizacija(organizacija)
    handleCloseOrganizacija()
    handleShowDogadjaj()
}

const handleChangeDogadjaj = (event) => {
  const{name, value} = event.target
  setDogadjaj(prevDogadjaj => ({...prevDogadjaj, [name]: value}))
}

const handleDodaj = (event) => {
  event.preventDefault();
  dogadjaj.organizacijaId = organizacijaId
  dogadjaj.mestoDogadjajaId = "1"
  dogadjaj.vrstaDogadjajaId = "1"
  addDogadjaj(dogadjaj)
  handleCloseDogadjaj()
}

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Događaji</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShowOrganizacija} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi događaj</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Naziv</th>
            <th>Datum</th>
            <th>Početak događaja</th>
            <th>Kraj događaja</th>
            <th>Mesto</th>
            <th>Vrsta</th>
            <th>Organizacija</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj = {dogadjaj} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages = {totalPagesNumber} setCurrentPage = {setCurrentPage} array={sortedDogadjaji}/>

      <Modal show={showOrganizacija} onHide={handleCloseOrganizacija}>
        <Modal.Header closeButton>
            <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <AddOrganizacijaForm handleCloseOrg={handleCloseOrg}/> */}
            <div>
        <Form>
            <Form.Group>
                <Form.Control name="naziv" value={organizacija.naziv} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Naziv" required />
            </Form.Group><br />
            <Form.Group>
                <Form.Control name="odgovornaOsoba" value={organizacija.odgovornaOsoba} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Odgovorna osoba" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="brojTelefona" value={organizacija.brojTelefona} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Broj telefon" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="email" value={organizacija.email} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="E-mail" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="delatnost" value={organizacija.delatnost} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Delatnost" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="opis" value={organizacija.opis} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Opis" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="link" value={organizacija.link} onChange={handleChange} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Link" required />
            </Form.Group><br/>
            <Form.Group>
                <div className="d-flex justify-content-end">
                    <Button onClick={handleDalje} variant="success">Dalje</Button>&nbsp;
                </div><br/>
            </Form.Group>
        </Form>
        </div>
        </Modal.Body>
      </Modal>

      <Modal show={showDogadjaj} onHide={handleCloseDogadjaj}>
            <Modal.Header closeButton>
              <Modal.Title>Dodaj događaj</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <AddNoviDogadjajForm /> */}
              <Form>
            <Form.Group>
                <Form.Control name="naziv" value={dogadjaj.naziv} onChange={handleChangeDogadjaj} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Naziv" required />
            </Form.Group><br />
            <Form.Group>
                <Form.Control name="datum" value={dogadjaj.datum} onChange={handleChangeDogadjaj} style={{width:"80%", maxWidth:"90%"}} type="date" placeholder="Datum" required />
            </Form.Group><br/>
            {/* <Form.Group>
                <Form.Control name="pocetakDogadjaja" value={dogadjaj.pocetakDogadjaja} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Mesto" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="krajDogadjaja" value={dogadjaj.krajDogadjaja} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Vrsta" required />
            </Form.Group><br/> */}
            <Form.Group>
                <Form.Control name="pocetakDogadjaja" value={dogadjaj.pocetakDogadjaja} onChange={handleChangeDogadjaj} style={{width:"80%", maxWidth:"90%"}} type="time" placeholder="Početak događaja" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="krajDogadjaja" value={dogadjaj.krajDogadjaja} onChange={handleChangeDogadjaj} style={{width:"80%", maxWidth:"90%"}} type="time" placeholder="Kraj događaja" required />
            </Form.Group><br />
            <Form.Group>
                <Form.Control name="organizacijaId" value={organizacijaId} onChange={handleChangeDogadjaj} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Organizacija" required />
            </Form.Group>
        </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleDodaj}>
                Dodaj
              </Button>
              <Button variant="danger" onClick={handleCloseDogadjaj}>
                Zatvori
              </Button>
            </Modal.Footer>
      </Modal>
    </>
  );
};

export default DogadjajList;
