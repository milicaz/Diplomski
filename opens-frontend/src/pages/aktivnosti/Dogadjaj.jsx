import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { MdDelete, MdEdit, MdPeople } from "react-icons/md";
import { DogadjajContext } from "./DogadjajContext";
import DeleteDogadjajForm from "./modal/DeleteDogadjajForm";
import { FaUsers } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import DetailDogadjajForm from "./modal/DetailDogadjajForm";
import DogadjajUcesniciForm from "./modal/DogadjajUcesniciForm";

const Dogadjaj = ({ dogadjaj }) => {
  const { dodajUcesnika } = useContext(DogadjajContext);
  const { deleteDogadjaj } = useContext(DogadjajContext);

  const [ucesnik, setUcesnik] = useState({
    ime: "",
    prezime: "",
    rod: "",
    godine: "",
    mestoBoravista: "",
    brojTelefona: "",
    email: "",
    organizacija: "",
  });

  const r = [
    { id: 1, naziv: "ZENSKO" },
    { id: 2, naziv: "MUSKO" },
    { id: 3, naziv: "DRUGO" },
  ];

  const rodMapping = {
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  const [showUcesnik, setShowUcesnik] = useState(false);

  const handleShowUcesnik = () => {
    setShowUcesnik(true);
  };

  const handleCloseUcesnik = () => {
    setShowUcesnik(false);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const [showUcesnici, setShowUcesnici] = useState(false);

  const handleShowUcesnici = () => {
    // navigate(`/ucesniciDogadjaja/${dogadjaj.id}`)
    setShowUcesnici(!showUcesnici);
  };

  const handleCloseUcesnici = () => {
    setShowUcesnici(false)
  }

  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
  }

  const handleChangeUcesnik = (event) => {
    const { name, value } = event.target;
    setUcesnik({ ...ucesnik, [name]: value });
  };

  const handleDodajUcesnika = (event) => {
    event.preventDefault();
    dodajUcesnika(ucesnik, dogadjaj.id);
    setUcesnik({
      ime: "",
      prezime: "",
      rod: "",
      godine: "",
      mestoBoravista: "",
      brojTelefona: "",
      email: "",
      organizacija: "",
    });
  };

  const formatTimeRange = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}`).toLocaleTimeString(
      "en-GB",
      { hour: "2-digit", minute: "2-digit" }
    );
    const endTime = new Date(`1970-01-01T${end}`).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      <td>{dogadjaj.id}</td>
      <td>{dogadjaj.naziv}</td>
      <td>{dogadjaj.datum}</td>
      <td>
        {formatTimeRange(dogadjaj.pocetakDogadjaja, dogadjaj.krajDogadjaja)}
      </td>
      <td>{dogadjaj.mesto.nazivSale}</td>
      <td>{dogadjaj.vrsta.naziv}</td>
      <td>{dogadjaj.organizacija.naziv}</td>
      {/* DODATO NOVO POLJE U TABELI */}
      <td>{dogadjaj.organizacija.odgovornaOsoba}</td>
      {/* <td>
        <button
          className="btn text-warning btn-act"
          onClick={handleShowUcesnik}
        >
          <MdPeople />
        </button>
        <button className="btn text-danger btn-act" onClick={handleShowDelete}>
          <MdDelete />
        </button>
      </td> */}
      <td>
        <div className="button-row">
          <button className="btn text-warning btn-act" title="Detalji" onClick={handleShowDetails}>
            <FcViewDetails />
          </button>
          <button className="btn text-success btn-act" title="Učesnici događaja" onClick={handleShowUcesnici}> 
            <FaUsers />
          </button>
          {/* <button
            className="btn text-warning btn-act"
            onClick={handleShowUcesnik}
            title="Dodavanje učesnika"
          >
            <MdPeople />
          </button> */}
        </div>
        <div className="button-row" title="Izmena">
          <button className="btn text-warning btn-act">
            <MdEdit />
          </button>
          <button className="btn text-danger btn-act" title="Brisanje" onClick={handleShowDelete}>
            <MdDelete />
          </button>
        </div>
      </td>

      <Modal show={showUcesnik} onHide={handleCloseUcesnik}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control
                  name="ime"
                  value={ucesnik.ime}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Ime"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="prezime"
                  value={ucesnik.prezime}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Prezime"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  as="select"
                  name="rod"
                  value={ucesnik.rod}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  required
                >
                  <option value="">Izaberite rod</option>
                  {Object.entries(rodMapping).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="godine"
                  value={ucesnik.godine}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="number"
                  placeholder="Godina rođenja"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="mestoBoravista"
                  value={ucesnik.mestoBoravista}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Mesto boravišta"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={ucesnik.brojTelefona}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefona"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={ucesnik.email}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="organizacija"
                  value={ucesnik.organizacija}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Organizacija"
                  required
                />
              </Form.Group>
              <br />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDodajUcesnika} variant="success">
            Dodaj učesnika
          </Button>
          &nbsp;
          <Button onClick={handleCloseUcesnik} variant="danger">
            Završi
          </Button>
          &nbsp;
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
          <Button
            className="btn btn-danger"
            onClick={() => deleteDogadjaj(dogadjaj.id)}
          >
            Obriši
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DogadjajDetails Modal */}
      <Modal show={showDetails} onHide={handleCloseDetails} size="lg" centered>
        <Modal.Header closeButton>
        {/* <Modal.Title>
      {dogadjaj ? `Učesnici događaja: ${dogadjaj.naziv}` : 'Učesnici događaja'}
    </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <DetailDogadjajForm currentDogadjaj={dogadjaj} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Zatvori</Button>
        </Modal.Footer>
      </Modal>

      {/* DogadjajUcesnici Modal */}
      <Modal show={showUcesnici} onHide={handleCloseUcesnici} fullscreen centered >
        <Modal.Header closeButton>
        <Modal.Title>
          {dogadjaj ? `Učesnici događaja: ${dogadjaj.naziv}` : 'Učesnici događaja'}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DogadjajUcesniciForm currentDogadjaj={dogadjaj} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUcesnici}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dogadjaj;
