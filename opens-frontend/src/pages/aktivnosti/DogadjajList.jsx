import { LocalDate, LocalTime } from "@js-joda/core";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { ucesniciImage } from "../../assets";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";
import Pagination from "../Pagination";
import Dogadjaj from "./Dogadjaj";
import { DogadjajContext } from "./DogadjajContext";

const DogadjajList = () => {
  const { sortedDogadjaji } = useContext(DogadjajContext);
  const { addOrganizacija } = useContext(DogadjajContext);
  const { organizacijaId } = useContext(DogadjajContext);
  const { addDogadjaj } = useContext(DogadjajContext);
  const { getOrganizacijaById } = useContext(DogadjajContext);
  const { currentOrganizacija } = useContext(DogadjajContext);
  const { editOrganizacija } = useContext(DogadjajContext);
  const { mestaDogadjaja } = useContext(DogadjajContext);
  const { tipoviDogadjaja } = useContext(DogadjajContext);
  const { dogadjajId } = useContext(DogadjajContext);
  const { dodajUcesnika } = useContext(DogadjajContext);
  const { kreirajPDF } = useContext(DogadjajContext);

  const [organizacija, setOrganizacija] = useState({
    naziv: "",
    odgovornaOsoba: "",
    brojTelefona: "",
    email: "",
    delatnost: "",
    opis: "",
    link: "",
  });

  const [dogadjaj, setDogadjaj] = useState({
    naziv: "",
    datum: LocalDate.now(),
    pocetakDogadjaja: LocalTime.MIDNIGHT,
    krajDogadjaja: LocalTime.MIDNIGHT,
    organizacijaId: organizacijaId,
    mestoDogadjajaId: "",
    vrstaDogadjajaId: "",
  });

  const [organizacijaEdit, setOrganizacijaEdit] = useState({
    naziv: "",
    odgovornaOsoba: "",
    brojTelefona: "",
    email: "",
    delatnost: "",
    opis: "",
    link: "",
  });

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

  const [id, setId] = useState();

  const [idDogadjaja, setIdDogadjaja] = useState();
  const [datum, setDatum] = useState("");
  const [mesec, setMesec] = useState("");
  const [godina, setGodina] = useState("");
  const [vrsta, setVrsta] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");

  //search organizacija by name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    setOrganizacijaEdit(currentOrganizacija);
    setId(organizacijaId);
    setIdDogadjaja(dogadjajId);

    if (organizacija.naziv) {
      setLoading(true);
      httpCommon
        .get(`/organizacija/search/${organizacija.naziv}`)
        .then((response) => {
          if (response.status === 200) {
            setOrganizacija(response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Organization not found, handle as needed
            setOrganizacija((prevState) => ({
              ...prevState,
              naziv: organizacija.naziv,
            }));
          } else if (
            error.response &&
            (error.response.status === 401 || error.response.status === 400)
          ) {
            eventBus.dispatch("logout");
          } else {
            setError("An error occurred");
          }
        })
        .finally(() => setLoading(false));
    } else if (organizacija.naziv === "") {
      setOrganizacija({
        naziv: "",
        odgovornaOsoba: "",
        brojTelefona: "",
        email: "",
        delatnost: "",
        opis: "",
        link: "",
      });
    }
  }, [organizacijaId, currentOrganizacija, dogadjajId, organizacija.naziv]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [dogadjajiPerPage] = useState(5);
  const indexOfLastDogadjaj = currentPage * limit;
  const indexOfFirstDogadjaj = indexOfLastDogadjaj - limit;
  const currentDogadjaji = sortedDogadjaji.slice(
    indexOfFirstDogadjaj,
    indexOfLastDogadjaj
  );
  const totalPagesNumber = Math.ceil(sortedDogadjaji.length / limit);

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  const [showDogadjaj, setShowDogadjaj] = useState(false);
  const handleShowDogadjaj = () => {
    setShowDogadjaj(true);
  };
  const handleCloseDogadjaj = () => {
    setShowDogadjaj(false);
    setOrganizacija({
      naziv: "",
      odgovornaOsoba: "",
      brojTelefona: "",
      email: "",
      delatnost: "",
      opis: "",
      link: "",
    });
    setDogadjaj({
      naziv: "",
      datum: LocalDate.now(),
      pocetakDogadjaja: LocalTime.MIDNIGHT,
      krajDogadjaja: LocalTime.MIDNIGHT,
      organizacijaId: organizacijaId,
      mestoDogadjajaId: "",
      vrstaDogadjajaId: "",
    });
  };

  const [showOrganizacija, setShowOrganizacija] = useState(false);
  const handleShowOrganizacija = () => {
    setShowOrganizacija(true);
  };

  const handleCloseOrganizacija = () => {
    setShowOrganizacija(false);
    setOrganizacija({
      naziv: "",
      odgovornaOsoba: "",
      brojTelefona: "",
      email: "",
      delatnost: "",
      opis: "",
      link: "",
    });
    setDogadjaj({
      naziv: "",
      datum: LocalDate.now(),
      pocetakDogadjaja: LocalTime.MIDNIGHT,
      krajDogadjaja: LocalTime.MIDNIGHT,
      organizacijaId: organizacijaId,
      mestoDogadjajaId: "",
      vrstaDogadjajaId: "",
    });
  };

  const [showEditOrganizacija, setShowEditOrganizacija] = useState(false);
  const handleShowEditOrganizacija = () => {
    setShowEditOrganizacija(true);
  };

  const handleCloseEditOrganizacija = () => {
    setShowEditOrganizacija(false);
  };

  const [showUcesnik, setShowUcesnik] = useState(false);
  const handleShowUcesnici = () => {
    setShowUcesnik(true);
    setShowDogadjaj(false);
    setShowDialogUcesnik(false);
  };

  const handleCloseUcesnik = () => {
    setShowUcesnik(false);
  };

  const [showDialogUcesnik, setShowDialogUcesnik] = useState(false);
  const handleShowDialogUcesnik = () => {
    setShowDialogUcesnik(true);
  };
  const handleCloseDialogUcesnik = () => {
    setShowDialogUcesnik(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrganizacija({ ...organizacija, [name]: value });
  };

  const handleDalje = (event) => {
    event.preventDefault();
    addOrganizacija(organizacija);
    handleCloseOrganizacija();
    handleShowDogadjaj();
  };

  const handleChangeDogadjaj = (event) => {
    const { name, value } = event.target;
    setDogadjaj((prevDogadjaj) => ({ ...prevDogadjaj, [name]: value }));
  };

  const handleDodaj = (event) => {
    event.preventDefault();
    dogadjaj.organizacijaId = organizacijaId;
    addDogadjaj(dogadjaj);
    handleCloseDogadjaj();
    setOrganizacija({
      naziv: "",
      odgovornaOsoba: "",
      brojTelefona: "",
      email: "",
      delatnost: "",
      opis: "",
      link: "",
    });
    setDogadjaj({
      naziv: "",
      datum: LocalDate.now(),
      pocetakDogadjaja: LocalTime.MIDNIGHT,
      krajDogadjaja: LocalTime.MIDNIGHT,
      organizacijaId: organizacijaId,
      mestoDogadjajaId: "",
      vrstaDogadjajaId: "",
    });
    handleShowDialogUcesnik();
  };

  const handleChangeEditOrganziacija = (event) => {
    const { name, value } = event.target;
    setOrganizacijaEdit({ ...organizacijaEdit, [name]: value });
  };

  const handleNazad = () => {
    getOrganizacijaById(organizacijaId);
    handleShowEditOrganizacija();
    handleCloseDogadjaj();
  };

  const handleEditOrganizacija = (event) => {
    event.preventDefault();
    editOrganizacija(id, organizacijaEdit);
    handleCloseEditOrganizacija();
    handleShowDogadjaj();
  };

  const handleChangeUcesnik = (event) => {
    const { name, value } = event.target;
    setUcesnik({ ...ucesnik, [name]: value });
  };

  const handleDodajUcesnika = (event) => {
    event.preventDefault();
    dodajUcesnika(ucesnik, idDogadjaja);
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

  const handleChangeDatum = (event) => {
    event.preventDefault();
    const selectedDatum = event.target.value;
    setDatum(selectedDatum);

    const [godinaPart, mesecPart] = selectedDatum.split("-");
    setGodina(godinaPart);

    const cleanMesecPart = mesecPart.startsWith("0")
      ? mesecPart.substring(1)
      : mesecPart;
    setMesec(cleanMesecPart);
  };

  const handleChangeVrsta = (event) => {
    setVrsta(event.target.value);
  };

  const handleChangeOsoba = (event) => {
    const { name, value } = event.target;

    if (name === "ime") {
      setIme(value);
    } else if (name === "prezime") {
      setPrezime(value);
    }
  };

  const handlePDF = (event) => {
    event.preventDefault();
    const response = kreirajPDF(mesec, godina, vrsta, ime, prezime);
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
      <div className="row align-items-center mb-4">
        <div className="col">
          <Form.Label>Period za koji se generiše izveštaj:</Form.Label>
          <Form.Control type="month" onChange={handleChangeDatum} />
        </div>
        <div className="col">
          <Form.Label>Tip događaja za koji se generiše izveštaj:</Form.Label>
          <Form.Control
            as="select"
            name="vrsta"
            value={vrsta}
            onChange={handleChangeVrsta}
            style={{ width: "80%", maxWidth: "90%" }}
          >
            <option value="">Izaberite vrstu događaja</option>
            {tipoviDogadjaja.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.naziv}
              </option>
            ))}
          </Form.Control>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <Form.Label>Osoba koja generiše izveštaj:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  name="ime"
                  value={ime}
                  type="text"
                  onChange={handleChangeOsoba}
                  style={{ width: "45%", marginRight: "5px" }}
                  placeholder="Ime"
                />
                <Form.Control
                  name="prezime"
                  value={prezime}
                  type="text"
                  onChange={handleChangeOsoba}
                  style={{ width: "45%" }}
                  placeholder="Prezime"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto ps-0">
          <Button className="mx-1" variant="danger" onClick={handlePDF}>
            <FaRegFilePdf size={20} /> PDF
          </Button>
          <Button className="mx-1" variant="success">
            <RiFileExcel2Fill size={20} /> EXCEL
          </Button>
        </div>
      </div>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <div className="row align-items-center mb-3">
              <div className="col-auto pe-0">
                <span>Prikaži</span>
              </div>
              <div className="col-auto">
                <Form.Select
                  name="limit"
                  value={limit}
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
              onClick={handleShowOrganizacija}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi događaj</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover image-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Naziv</th>
            <th>Datum</th>
            <th>Vreme događaja</th>
            <th>Mesto</th>
            <th>Vrsta</th>
            <th>Organizacija</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={sortedDogadjaji}
        limit={dogadjajiPerPage}
        maxVisibleButtons={3}
      />

      <Modal show={showOrganizacija} onHide={handleCloseOrganizacija}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control
                  name="naziv"
                  value={organizacija.naziv}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Naziv"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="odgovornaOsoba"
                  value={organizacija.odgovornaOsoba}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Odgovorna osoba"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={organizacija.brojTelefona}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefon"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={organizacija.email}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="delatnost"
                  value={organizacija.delatnost}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Delatnost"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="opis"
                  value={organizacija.opis}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Opis"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="link"
                  value={organizacija.link}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Link"
                  required
                />
              </Form.Group>
              <br />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDalje} variant="success">
            Dalje
          </Button>
          &nbsp;
        </Modal.Footer>
      </Modal>

      <Modal show={showDogadjaj} onHide={handleCloseDogadjaj}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj događaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                name="naziv"
                value={dogadjaj.naziv}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="text"
                placeholder="Naziv"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="datum"
                value={dogadjaj.datum}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="date"
                placeholder="Datum"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="pocetakDogadjaja"
                value={dogadjaj.pocetakDogadjaja}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="time"
                placeholder="Početak događaja"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="krajDogadjaja"
                value={dogadjaj.krajDogadjaja}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="time"
                placeholder="Kraj događaja"
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="dropdown">
              <Form.Control
                as="select"
                name="mestoDogadjajaId"
                value={dogadjaj.mestoDogadjajaId}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
              >
                <option value="">Izaberite salu</option>
                {mestaDogadjaja.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.nazivSale}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="dropdown">
              <Form.Control
                as="select"
                name="vrstaDogadjajaId"
                value={dogadjaj.vrstaDogadjajaId}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
              >
                <option value="">Izaberite vrstu događaja</option>
                {tipoviDogadjaja.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.naziv}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDodaj}>
            Dodaj
          </Button>
          <Button variant="danger" onClick={handleNazad}>
            Nazad
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditOrganizacija} onHide={handleCloseEditOrganizacija}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control
                  name="naziv"
                  value={organizacijaEdit.naziv}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Naziv"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="odgovornaOsoba"
                  value={organizacijaEdit.odgovornaOsoba}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Odgovorna osoba"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={organizacijaEdit.brojTelefona}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefon"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={organizacijaEdit.email}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="delatnost"
                  value={organizacijaEdit.delatnost}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Delatnost"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="opis"
                  value={organizacijaEdit.opis}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Opis"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="link"
                  value={organizacijaEdit.link}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Link"
                  required
                />
              </Form.Group>
              <br />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditOrganizacija} variant="success">
            Dalje
          </Button>
          &nbsp;
        </Modal.Footer>
      </Modal>

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
                  style={{ width: "80%", maxWidth: "90%" }}
                  as="select"
                  name="rod"
                  value={ucesnik.rod}
                  onChange={handleChangeUcesnik}
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

      <Modal
        show={showDialogUcesnik}
        onHide={handleCloseDialogUcesnik}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Dodavanje učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col className="col-sm-3">
              <Image
                src={ucesniciImage}
                alt="slika"
                width="45"
                height="45"
                className="text-center mx-1 mx-md-4"
              />
            </Col>
            <Col className="col-sm-9">
              <p>
                Da li želite da dodate učesnike? <br />
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleShowUcesnici}>
            Dodaj učesnike
          </Button>
          <Button variant="danger" onClick={handleCloseDialogUcesnik}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DogadjajList;
