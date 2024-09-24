import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { MdDelete, MdEdit, MdPeople } from "react-icons/md";
import { DogadjajContext } from "./DogadjajContext";
import DeleteDogadjajForm from "./modal/DeleteDogadjajForm";

const Dogadjaj = ({ dogadjaj }) => {

  const {dodajUcesnika} = useContext(DogadjajContext);

  const {deleteDogadjaj} = useContext(DogadjajContext);

  const [ucesnik, setUcesnik] = useState({ime: "", prezime: "", rod: "", godine: "", mestoBoravista: "", brojTelefona: "", email: "", organizacija: ""})

  const [showUcesnik, setShowUcesnik] = useState(false)

  const handleShowUcesnik = () => {
    setShowUcesnik(true)
  }

  const handleCloseUcesnik = () => {
    setShowUcesnik(false)
  }

  const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

  const handleChangeUcesnik = (event) => {
    const {name, value} = event.target
    setUcesnik({...ucesnik, [name]: value})
  }
  
  const handleDodajUcesnika = (event) => {
    event.preventDefault();
    dodajUcesnika(ucesnik, dogadjaj.id)
    setUcesnik({ime: "", prezime: "", rod: "", godine: "", mestoBoravista: "", brojTelefona: "", email: "", organizacija: ""})
  }

  const formatTimeRange = (start, end) => {
    // Create Date objects in local time zone
    const startTime = new Date(`1970-01-01T${start}`).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(`1970-01-01T${end}`).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${startTime} - ${endTime}`;
};

  return (
    <>
      <td>{dogadjaj.id}</td>
      <td>{dogadjaj.naziv}</td>
      <td>{dogadjaj.datum}</td>
      {/* <td>{dogadjaj.pocetakDogadjaja}</td>
      <td>{dogadjaj.krajDogadjaja}</td> */}
      <td>{formatTimeRange(dogadjaj.pocetakDogadjaja, dogadjaj.krajDogadjaja)}</td>
      <td>{dogadjaj.mesto.nazivSale}</td>
      <td>{dogadjaj.vrsta.naziv}</td>
      <td>{dogadjaj.organizacija.naziv}</td>
      <td>
      <button className="btn text-warning btn-act" onClick={handleShowUcesnik}>
        <MdPeople />
      </button>
      <button className="btn text-danger btn-act" onClick={handleShowDelete}>
                    <MdDelete />
                </button>
        {/* <a href="#editDogadjaj" className="edit">
            <i className="react-icons" title="Edit">
                <MdEdit />
            </i>
        </a>&nbsp;
        <a href="#deleteDogadjaj" className="delete">
            <i className="react-icons" title="Delete">
                <MdDelete />
            </i>
        </a> */}
      </td>

      <Modal show={showUcesnik} onHide={handleCloseUcesnik}>
        <Modal.Header closeButton>
            <Modal.Title>Dodaj učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <AddOrganizacijaForm handleCloseOrg={handleCloseOrg}/> */}
            <div>
        <Form>
            <Form.Group>
                <Form.Control name="ime" value={ucesnik.ime} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Ime" required />
            </Form.Group><br />
            <Form.Group>
                <Form.Control name="prezime" value={ucesnik.prezime} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Prezime" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="rod" value={ucesnik.rod} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Rod" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="godine" value={ucesnik.godine} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="number" placeholder="Godine" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="mestoBoravista" value={ucesnik.mestoBoravista} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Mesto boravišta" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="brojTelefona" value={ucesnik.brojTelefona} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Broj telefona" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="email" value={ucesnik.email} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="E-mail" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control name="organizacija" value={ucesnik.organizacija} onChange={handleChangeUcesnik} style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Organizacija" required />
            </Form.Group><br/>
            {/* <Form.Group>
                <div className="d-flex justify-content-end">
                    <Button onClick={handleDalje} variant="success">Dalje</Button>&nbsp;
                </div><br/>
            </Form.Group> */}
        </Form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDodajUcesnika} variant="success">Dodaj učesnika</Button>&nbsp;
          <Button onClick={handleCloseUcesnik} variant="danger">Završi</Button>&nbsp;
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Obriši događaj</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteDogadjajForm deleteDogadjaj={dogadjaj} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={() => deleteDogadjaj(dogadjaj.id)}>
                        Obriši
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>   
    </>
  );
};

export default Dogadjaj;