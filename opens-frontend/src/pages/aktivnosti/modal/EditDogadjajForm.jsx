import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { DogadjajContext } from "../DogadjajContext";

const EditDogadjajForm = ({ editDogadjaj, onDogadjajEdited }) => {
  const { updateDogadjaj } = useContext(DogadjajContext);
  const { mestaDogadjaja } = useContext(DogadjajContext);
  const { tipoviDogadjaja } = useContext(DogadjajContext);

  const [validated, setValidated] = useState(false);

  const [dogadjaj, setDogadjaj] = useState({
    naziv: editDogadjaj.naziv,
    datum: editDogadjaj.datum,
    pocetakDogadjaja: editDogadjaj.pocetakDogadjaja,
    krajDogadjaja: editDogadjaj.krajDogadjaja,
  });

  const [mesto, setMesto] = useState({
    id: editDogadjaj.mesto.id,
    nazivSale: editDogadjaj.mesto.nazivSale,
  });

  const [vrsta, setVrsta] = useState({
    id: editDogadjaj.vrsta.id,
    naziv: editDogadjaj.vrsta.naziv,
  });

  const [organizacija, setOrganizacija] = useState({
    id: editDogadjaj.organizacija.id,
    naziv: editDogadjaj.organizacija.naziv,
    odgovornaOsoba: editDogadjaj.organizacija.odgovornaOsoba,
    brojTelefona: editDogadjaj.organizacija.brojTelefona,
    email: editDogadjaj.organizacija.email,
    delatnost: editDogadjaj.organizacija.delatnost,
    opis: editDogadjaj.organizacija.opis,
    link: editDogadjaj.organizacija.link,
  });

  const [ucesnici, setUcesnici] = useState(editDogadjaj.ucesnici);

  const updatedDogadjaj = {
    ...dogadjaj, // Spread the dogadjaj object
    mesto: {
      id: mesto.id, // Use the ID from the selected Mesto
      nazivSale: mesto.nazivSale, // Use the nazivSale for the display
    },
    vrsta: {
      id: vrsta.id, // Use the ID from the selected Vrsta
      naziv: vrsta.naziv, // Use the naziv for the display
    },
    organizacija, // Add the organizacija object
    ucesnici,
  };

  const handleChangeDogadjaj = (event) => {
    const { name, value } = event.target;
    setDogadjaj({ ...dogadjaj, [name]: value });
  };

  const handleChangeOrganizacija = (event) => {
    const { name, value } = event.target;
    setOrganizacija({ ...organizacija, [name]: value });
  };

  const handleChangeMesto = (e) => {
    const selectedMestoId = e.target.value;
    const selectedMesto = mestaDogadjaja.find(
      (m) => m.nazivSale === selectedMestoId
    ); // Fix this line, match by nazivSale
    setMesto({
      id: selectedMesto ? selectedMesto.id : "", // Ensure ID is passed
      nazivSale: selectedMesto ? selectedMesto.nazivSale : "",
    });
  };

  const handleChangeVrsta = (e) => {
    const selectedVrstaId = e.target.value;
    const selectedVrsta = tipoviDogadjaja.find(
      (v) => v.naziv === selectedVrstaId
    ); // Fix this line, match by naziv
    setVrsta({
      id: selectedVrsta ? selectedVrsta.id : "", // Ensure ID is passed
      naziv: selectedVrsta ? selectedVrsta.naziv : "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      console.log("Update dogadjaja je: " + JSON.stringify(updatedDogadjaj));
      console.log("Id Dogadjaj je: " + JSON.stringify(editDogadjaj.id));
      await updateDogadjaj(editDogadjaj.id, updatedDogadjaj); // Make sure to use currentUcesnik.id here
      onDogadjajEdited();
    }
    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          {/* DOGADJAJ */}
          {/* First column for id and naziv */}
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ textAlign: "center", width: "100%" }}>
                <b>
                  <i>Podaci o događaju</i>
                </b>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="naziv"
                value={dogadjaj.naziv}
                onChange={handleChangeDogadjaj}
                placeholder="Naziv *"
                required
                isInvalid={validated && !dogadjaj.naziv}
              />
              <Form.Control.Feedback type="invalid">
                Unesite naziv Događaja.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="datum"
                value={dogadjaj.datum}
                onChange={handleChangeDogadjaj}
                placeholder="Datum *"
                required
                isInvalid={validated && !dogadjaj.datum}
              />
              <Form.Control.Feedback type="invalid">
                Unesite datum Događaja.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="pocetakDogadjaja"
                value={dogadjaj.pocetakDogadjaja}
                onChange={handleChangeDogadjaj}
                placeholder="Početak događaja *"
                required
                isInvalid={validated && !dogadjaj.naziv}
              />
              <Form.Control.Feedback type="invalid">
                Unesite Početak Događaja.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="krajDogadjaja"
                value={dogadjaj.krajDogadjaja}
                onChange={handleChangeDogadjaj}
                placeholder="Kraj događaja *"
                required
                isInvalid={validated && !dogadjaj.krajDogadjaja}
              />
              <Form.Control.Feedback type="invalid">
                Unesite Kraj Događaja.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                name="mesto"
                value={mesto.nazivSale}
                onChange={handleChangeMesto}
                required
                isInvalid={validated && !mesto.nazivSale}
              >
                {mestaDogadjaja.map((mestoItem) => (
                  <option key={mestoItem.id} value={mestoItem.nazivSale}>
                    {mestoItem.nazivSale}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a mesto.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                name="vrsta"
                value={vrsta.naziv}
                onChange={handleChangeVrsta}
                required
                isInvalid={validated && !vrsta.naziv}
              >
                {tipoviDogadjaja.map((tipItem) => (
                  <option key={tipItem.id} value={tipItem.naziv}>
                    {tipItem.naziv}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a tip.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* ORGANIZACIJA */}
          {/* Second column for organizacija.naziv */}
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ textAlign: "center", width: "100%" }}>
                <b>
                  <i>Podaci o organizatoru događaja</i>
                </b>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="naziv"
                value={organizacija.naziv}
                onChange={handleChangeOrganizacija}
                placeholder="Naziv organizacije *"
                required
                isInvalid={validated && !organizacija.naziv}
              />
              <Form.Control.Feedback type="invalid">
                Unesite naziv organizacije.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="odgovornaOsoba"
                value={organizacija.odgovornaOsoba}
                onChange={handleChangeOrganizacija}
                placeholder="Odgovorna osoba *"
                required
                isInvalid={validated && !organizacija.odgovornaOsoba}
              />
              <Form.Control.Feedback type="invalid">
                Unesite ime i prezime odgovorne osobe.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="brojTelefona"
                value={organizacija.brojTelefona}
                onChange={handleChangeOrganizacija}
                placeholder="Broj telefona organizacije *"
                required
                isInvalid={validated && !organizacija.brojTelefona}
              />
              <Form.Control.Feedback type="invalid">
                Unesite broj telefon organizacije.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="email"
                value={organizacija.email}
                onChange={handleChangeOrganizacija}
                placeholder="Email organizacije *"
                required
                isInvalid={validated && !organizacija.email}
              />
              <Form.Control.Feedback type="invalid">
                Unesite email organizacije.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="delatnost"
                value={organizacija.delatnost}
                onChange={handleChangeOrganizacija}
                placeholder="Delatnost organizacije *"
                required
                isInvalid={validated && !organizacija.delatnost}
              />
              <Form.Control.Feedback type="invalid">
                Unesite delatnost organizacije.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="opis"
                value={organizacija.opis}
                onChange={handleChangeOrganizacija}
                placeholder="Opis organizacije *"
                required
                isInvalid={validated && !organizacija.opis}
              />
              <Form.Control.Feedback type="invalid">
                Unesite opis organizacije.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="link"
                value={organizacija.link}
                onChange={handleChangeOrganizacija}
                placeholder="Link organizacije *"
                required
                isInvalid={validated && !organizacija.link}
              />
              <Form.Control.Feedback type="invalid">
                Unesite link organizacije.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <div className="d-grid gap-2" style={{marginLeft:"20%", marginRight:"20%"}}>
            <Button type="submit" variant="success">
              Izmeni
            </Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default EditDogadjajForm;
