import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DogadjajContext } from "../DogadjajContext";
import AddNoviDogadjajForm from "./AddNoviDogadjajForm";

const AddOrganizacijaForm = ({ handleCloseOrg, showOrg }) => {

    const { addOrganizacija } = useContext(DogadjajContext)

    const [organizacija, setOrganizacija] = useState({naziv: "", odgovornaOsoba: "", brojTelefona: "", email: "", delatnost: "", opis: "", link: ""})
    
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setOrganizacija(prevOrganizacija => ({...prevOrganizacija, [name]: value}))
    }

    const handleDalje = (event) => {
        event.preventDefault();
        addOrganizacija(organizacija)
        handleCloseOrg(); // Close the modal in DogadjajList
    }

    return (
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
        
        <Modal show={showOrg} onHide={handleCloseOrg}>
            <Modal.Header closeButton>
              <Modal.Title>Dodaj događaj</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddNoviDogadjajForm />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success">
                Dodaj
              </Button>
              <Button variant="danger" onClick={handleCloseOrg}>
                Zatvori
              </Button>
            </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AddOrganizacijaForm;