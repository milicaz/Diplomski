import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { MdDelete, MdPeople } from "react-icons/md";
import { DogadjajContext } from "./DogadjajContext";
import DeleteDogadjajForm from "./modal/DeleteDogadjajForm";

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
    ZENSKO: "žensko",
    MUSKO: "muško",
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
      <td>
        <button
          className="btn text-warning btn-act"
          onClick={handleShowUcesnik}
        >
          <MdPeople />
        </button>
        <button className="btn text-danger btn-act" onClick={handleShowDelete}>
          <MdDelete />
        </button>
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
    </>
  );
};

export default Dogadjaj;
