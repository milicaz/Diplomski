import { LocalDate, LocalTime } from "@js-joda/core";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { ucesniciImage } from "../../assets";
import useHttpProtected from "../../hooks/useHttpProtected";
import Pagination from "../Pagination";
import Dogadjaj from "./Dogadjaj";
import { DogadjajContext } from "./DogadjajContext";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDateRangePicker from "../../utils/CustomDateRangePicker";
import CreatableSelect from "react-select/creatable";
import useToast from "../../hooks/useToast";

const DogadjajList = () => {
  const { sortedDogadjaji } = useContext(DogadjajContext);
  const { addOrganizacija } = useContext(DogadjajContext);
  const { organizacijaId, setOrganizacijaId } = useContext(DogadjajContext);
  const { addDogadjaj } = useContext(DogadjajContext);
  const { getOrganizacijaById } = useContext(DogadjajContext);
  const { currentOrganizacija } = useContext(DogadjajContext);
  const { editOrganizacija } = useContext(DogadjajContext);
  const { mestaDogadjaja } = useContext(DogadjajContext);
  const { tipoviDogadjaja } = useContext(DogadjajContext);
  const { dogadjajId } = useContext(DogadjajContext);
  const { dodajUcesnika } = useContext(DogadjajContext);
  const { kreirajPDF } = useContext(DogadjajContext);
  const { organizacije } = useContext(DogadjajContext);
  const { kreirajExcel } = useContext(DogadjajContext);

  const httpProtected = useHttpProtected();

  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowToast } = useToast();

  const [organizacija, setOrganizacija] = useState({
    naziv: "",
    odgovornaOsoba: "",
    brojTelefona: "",
    email: "",
    delatnost: "",
    opis: "",
    link: "",
  });

  // //DODATO ZA DROPDOWN ORGANIZACIJA
  const [existingOrganizacije, setExistingOrganizacije] = useState([]);
  const [isExisting, setIsExisting] = useState(false); // New state to track if the organization is existing
  // //
  const [validated, setValidated] = useState(false);

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
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  const [logos, setLogos] = useState([]);

  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleShowHeader = () => setShowHeader(true);
  const handleCloseHeader = () => setShowHeader(false);

  const handleShowFooter = () => setShowFooter(true);
  const handleCloseFooter = () => setShowFooter(false);

  const [headerImageId, setHeaderImageId] = useState(null);
  const [footerImageId, setFooterImageId] = useState(null);

  const handleSelectHeader = (logoId) => {
    setHeaderImageId(logoId);
  };

  const handleSelectFooter = (logoId) => {
    setFooterImageId(logoId);
  };

  useEffect(() => {
    setOrganizacijaEdit(currentOrganizacija);
    setId(organizacijaId);
    setIdDogadjaja(dogadjajId);
    setAllDogadjaji(sortedDogadjaji);
    setExistingOrganizacije(organizacije);

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const requests = [
          httpProtected.get("/logoi", { signal: controller.signal }),
        ];
        const [logoiData] = await Promise.all(requests);

        if (isMounted) {
          setLogos(logoiData.data);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === "File size exceeds limit!"
        ) {
          throw new Error("File size exceeds limit!");
        }
        if (error.response?.status >= 500) {
          handleShowToast(
            "Greška",
            "Greška pri učitavanju podataka. Došlo je do problema prilikom obrade zahteva. Molimo Vas da pokušate ponovo kasnije.",
            "danger"
          );
        } else if (error.name !== "CanceledError") {
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [
    organizacijaId,
    currentOrganizacija,
    dogadjajId,
    organizacija.naziv,
    sortedDogadjaji,
    organizacije,
  ]);

  //DODATU ZA PRETRAGU
  const [allDogadjaji, setAllDogadjaji] = useState([]); // Store all events
  const [searchQuery, setSearchQuery] = useState("");
  //

  // Stanja za pretragu po periodu
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter dogadjaji na osnovu izabranog perioda
  const filteredByDate = allDogadjaji.filter((dogadjaj) => {
    if (!startDate || !endDate) return true; // Vraca sve ukoliko nisu izabrani datumi
    const eventDate = new Date(dogadjaj.datum);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return eventDate >= start && eventDate <= end;
  });

  // DODATO ZA SEARCH BAR
  const filteredDogadjaji = filteredByDate.filter((dogadjaj) => {
    const { naziv, organizacija } = dogadjaj;
    const organizacijaNaziv = organizacija.naziv.toLowerCase();
    const odgovornaOsoba = organizacija.odgovornaOsoba.toLowerCase();
    const dogadjajNaziv = naziv.toLowerCase();

    return (
      dogadjajNaziv.includes(searchQuery.toLowerCase()) ||
      organizacijaNaziv.includes(searchQuery.toLowerCase()) ||
      odgovornaOsoba.includes(searchQuery.toLowerCase())
    );
  });
  //

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, searchQuery]);

  const indexOfLastDogadjaj = currentPage * limit;
  const indexOfFirstDogadjaj = indexOfLastDogadjaj - limit;

  //IZMENJONO ZBOG SEARCH BAR-A
  // Use filtered results for pagination when searchQuery is not empty
  //const resultsToPaginate = searchQuery ? filteredDogadjaji : allDogadjaji;

  // Calculate pagination based on results to paginate
  const totalPagesNumber = Math.ceil(filteredDogadjaji.length / limit);
  // const indexOfLastDogadjaj = currentPage * dogadjajiPerPage;
  // const indexOfFirstDogadjaj = indexOfLastDogadjaj - dogadjajiPerPage;
  const currentPageDogadjaji = filteredDogadjaji.slice(
    indexOfFirstDogadjaj,
    indexOfLastDogadjaj
  );
  //

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
    setValidated(false);
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

    setIsExisting(false); // Reset the flag when closing the modal
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

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const selectedNaziv = selectedOption.value;

      // Check if it's a pre-existing organization
      const selectedOrg = existingOrganizacije.find(
        (org) => org.naziv === selectedNaziv
      );

      if (selectedOrg) {
        // If it's an existing organization, update the form fields with its details
        setOrganizacija({
          naziv: selectedOrg.naziv,
          odgovornaOsoba: selectedOrg.odgovornaOsoba,
          brojTelefona: selectedOrg.brojTelefona,
          email: selectedOrg.email,
          delatnost: selectedOrg.delatnost,
          opis: selectedOrg.opis,
          link: selectedOrg.link,
        });

        // Set the organizacijaId from the context
        setOrganizacijaId(selectedOrg.id);
        setIsExisting(true);
      } else {
        // If it's a new organization, update only the naziv field
        setOrganizacija({
          ...organizacija,
          naziv: selectedNaziv, // Set the new naziv
        });
        setOrganizacijaId(null); // Reset organizacijaId because it's a new one
        setIsExisting(false);
      }
    } else {
      // If no option is selected, reset the form fields
      setOrganizacija({
        naziv: "",
        odgovornaOsoba: "",
        brojTelefona: "",
        email: "",
        delatnost: "",
        opis: "",
        link: "",
      });
      setOrganizacijaId(null);
      setIsExisting(false);
    }
  };

  // Create options for the Creatable dropdown
  const options = existingOrganizacije.map((org) => ({
    value: org.naziv,
    label: org.naziv,
  }));

  const handleDalje = (event) => {
    event.preventDefault();
    const isValid =
      organizacija.naziv &&
      organizacija.odgovornaOsoba &&
      organizacija.email &&
      organizacija.opis;

    if (!isValid) {
      setValidated(true);
      return;
    }

    setValidated(false);

    if (isExisting) {
      console.log("Using existing organization:", organizacija);
      handleCloseOrganizacija();
      handleShowDogadjaj();
    } else {
      addOrganizacija(organizacija);
      handleCloseOrganizacija();
      handleShowDogadjaj();
    }
  };

  const handleDaljeEdit = (event) => {
    console.log("Usao je u handleDaljeEdit");
    event.preventDefault();
    const isValid =
      organizacijaEdit.naziv &&
      organizacijaEdit.odgovornaOsoba &&
      organizacijaEdit.email &&
      organizacijaEdit.opis;

    console.log(
      "Trenutno stanje organizacija:",
      JSON.stringify(organizacijaEdit)
    );

    if (!isValid) {
      setValidated(true);
      console.log("Usao je u handleDaljeEdit if isValid");
      return;
    }

    setValidated(false);
    console.log("Validacija uspešna (edit), isExisting:", isExisting);

    if (isExisting) {
      console.log("Koristi postojeću organizaciju (edit):", organizacijaEdit);
      handleCloseEditOrganizacija();
      handleShowDogadjaj();
    } else {
      console.log("Dodaje novu organizaciju (edit):", organizacijaEdit);
      addOrganizacija(organizacijaEdit)
        .then(() => {
          console.log("Nova organizacija uspešno dodata (edit)!");
          handleCloseEditOrganizacija();
          handleShowDogadjaj();
        })
        .catch((error) => {
          console.error("Greška pri dodavanju organizacije (edit):", error);
        });
    }
  };

  const handleChangeDogadjaj = (event) => {
    const { name, value } = event.target;
    setDogadjaj((prevDogadjaj) => ({ ...prevDogadjaj, [name]: value }));
  };

  const handleDodaj = (event) => {
    event.preventDefault();

    const isValid =
      dogadjaj.naziv &&
      dogadjaj.datum &&
      dogadjaj.pocetakDogadjaja &&
      dogadjaj.krajDogadjaja &&
      dogadjaj.mestoDogadjajaId &&
      dogadjaj.vrstaDogadjajaId;

    if (!isValid) {
      setValidated(true);
      return;
    }

    setValidated(false);

    const currentOrganizacijaId = organizacijaId;

    if (!currentOrganizacijaId) {
      // If there's no organizacijaId, we need to create a new organizacija first
      addOrganizacija(organizacija).then(() => {
        // After adding the organization, create the dogadjaj
        dogadjaj.organizacijaId = organizacijaId; // Use the organizacijaId from the response
        addDogadjaj(dogadjaj);
        handleCloseDogadjaj();
        resetForms();
      });
    } else {
      // If there's an organizacijaId already (existing organization), use it directly
      dogadjaj.organizacijaId = currentOrganizacijaId;
      addDogadjaj(dogadjaj);
      handleCloseDogadjaj();
      resetForms();
    }
  };

  const resetForms = () => {
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
    handleShowDialogUcesnik(); // Show the next dialog (if necessary)
  };

  const handleChangeEditOrganziacija = (event) => {
    const { name, value } = event.target;
    setOrganizacijaEdit({ ...organizacijaEdit, [name]: value });
  };

  // const handleNazad = () => {
  //   getOrganizacijaById(organizacijaId);
  //   console.log("GetOrganizacijaById je " + getOrganizacijaById(organizacijaId))
  //   handleShowEditOrganizacija();
  //   handleCloseDogadjaj();
  // };

  const handleNazad = async () => {
    const controller = new AbortController();

    try {
      // Poziv API-ja direktno unutar handleNazad
      const response = await httpProtected.get(
        `/organizacije/${organizacijaId}`,
        {
          signal: controller.signal,
        }
      );

      const organizacijaData = response.data;
      console.log("Podaci dobijeni sa servera:", organizacijaData);

      // Postavljanje podataka u stanje
      setOrganizacijaEdit(organizacijaData);
      console.log("Organizacija za uređivanje postavljena:", organizacijaData);

      // Prikaz forme za uređivanje organizacije
      handleShowEditOrganizacija();
      handleCloseDogadjaj();
    } catch (error) {
      // Rukovanje greškama
      if (error.response?.status >= 500) {
        console.error(
          "Greška pri učitavanju podataka. Došlo je do problema prilikom obrade zahteva."
        );
      } else if (error.name !== "CanceledError") {
        console.error("Nije uspelo učitavanje organizacije:", error);
      }
    } finally {
      // Otkazivanje zahteva kada je završen
      controller.abort();
    }
  };

  const handleChangeUcesnik = (event) => {
    const { name, value } = event.target;
    setUcesnik({ ...ucesnik, [name]: value });
  };

  const handleDodajUcesnika = (event) => {
    event.preventDefault();

    const isValid =
      ucesnik.ime &&
      ucesnik.prezime &&
      ucesnik.rod &&
      ucesnik.godine &&
      ucesnik.mestoBoravista &&
      ucesnik.organizacija &&
      // Validacija godine
      /^\d{4}$/.test(ucesnik.godine) && // Proverava da li godine imaju tačno 4 cifre
      ucesnik.godine >= 1930; // Proverava da li su godine veće ili jednake 1930

    if (!isValid) {
      setValidated(true);
      return;
    }

    setValidated(false);

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

  const halfLength = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, halfLength);
  const secondHalf = logos.slice(halfLength);

  const handleNext = (e) => {
    e.preventDefault();
    handleCloseHeader();
    handleShowFooter();
  };

  const handleChoose = (event) => {
    event.preventDefault(); // Call preventDefault on the current event

    handleCloseFooter();

    // Pass the event object to handlePDF
    handlePDF(event);
  };

  const handlePDF = (event) => {
    event.preventDefault(); // Call preventDefault on the event

    // Ensure valid inputs
    if (!mesec || !godina || !vrsta || !ime || !prezime) {
      console.error("Please fill all required fields.");
      return;
    }

    // Call kreirajPDF with validated parameters
    kreirajPDF(
      mesec,
      godina,
      vrsta,
      ime,
      prezime,
      headerImageId,
      footerImageId
    );
  };

  const handleExcel = (event) => {
    event.preventDefault();
    const response = kreirajExcel(
      mesec,
      godina,
      vrsta,
      ime,
      prezime,
      headerImageId,
      footerImageId
    );
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
      <Row className="mb-4 align-items-end">
        <Col md={3}>
          <Form.Label>Period za koji se generiše izveštaj:</Form.Label>
          <Form.Control type="month" onChange={handleChangeDatum} />
        </Col>
        <Col md={3}>
          <Form.Label>Tip događaja za koji se generiše izveštaj:</Form.Label>
          <Form.Control as="select" name="vrsta" onChange={handleChangeVrsta}>
            <option value="">Izaberite vrstu događaja</option>
            {tipoviDogadjaja.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.naziv}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={6}>
          <Form.Label>Osoba koja generiše izveštaj:</Form.Label>
          <Row>
            <Col>
              <Form.Control
                name="ime"
                type="text"
                placeholder="Ime"
                onChange={handleChangeOsoba}
              />
            </Col>
            <Col>
              <Form.Control
                name="prezime"
                type="text"
                placeholder="Prezime"
                onChange={handleChangeOsoba}
              />
            </Col>
            <Col className="d-flex align-items-center">
              <Button
                className="mx-1"
                variant="danger"
                onClick={handleShowHeader}
              >
                <FaRegFilePdf size={20} /> PDF
              </Button>
              <Button className="mx-1" variant="success" onClick={handleExcel}>
                <RiFileExcel2Fill size={20} /> EXCEL
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="table-title">
        <div className="row align-items-center mb-3">
          <div className="col-sm-2">
            <div className="row align-items-center">
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
          {/* SEARCH BAR */}
          <div className="col-sm-3">
            {/* <Form.Control
              type="text"
              placeholder="Pretraži događaje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /> */}
            <Form.Control
              type="text"
              placeholder="Pretraži događaje..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>

          <div className="col-sm-5">
            <CustomDateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>
          {/* BUTTON FOR ADDING NEW EVENT */}
          <div className="col-sm-2 text-end">
            <Button
              onClick={handleShowOrganizacija}
              className="btn btn-success"
            >
              <FaSquarePlus size={20} className="mx-1" />
              Dodaj novi događaj
            </Button>
          </div>
          {/* <div className="col-sm-6">
            <Button
              onClick={handleShowOrganizacija}
              className="btn btn-success"
            >
              <FaSquarePlus size={20} className="mx-1" />
              Dodaj novi događaj
            </Button>
          </div> */}
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
            {/* DODATO NOVO POLJE */}
            <th>Odgovorna osoba</th>
            <th>Opis događaja</th>
            {/*  */}
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))} */}
          {/* IZMENJENO ZBOG SEARCHBAR */}
          {currentPageDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))}
          {/*  */}
        </tbody>
      </table>

      {totalPagesNumber > 0 && (
        <Pagination
          pages={totalPagesNumber}
          currentPage={currentPage} // Pass currentPage here
          setCurrentPage={setCurrentPage}
          array={filteredDogadjaji}
          limit={limit}
          maxVisibleButtons={3}
        />
      )}

      <Modal show={showOrganizacija} onHide={handleCloseOrganizacija}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <div>
          <Form noValidate validated={validated} onSubmit={handleDalje}>
            <Modal.Body>
              {/* Creatable Dropdown for organization name */}
              <Form.Group>
                <Form.Label>Naziv Organizacije</Form.Label>
                <CreatableSelect
                  value={{
                    value: organizacija.naziv,
                    label: organizacija.naziv,
                  }} // Set the initial value
                  onChange={handleSelectChange}
                  options={options}
                  // placeholder="Naziv organizacije"
                  required
                  isClearable
                  placeholder="Izaberite ili unesite novu organizaciju"
                  isValidNewOption={(inputValue, selectedOptions) => {
                    // Optionally control when a new option can be created (e.g., disallow empty input)
                    return inputValue.length > 0;
                  }}
                  className={
                    validated && !organizacija.naziv ? "is-invalid" : ""
                  }
                />
                {validated && !organizacija.naziv && (
                  <div className="invalid-feedback">Ovo polje je obavezno!</div>
                )}
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="odgovornaOsoba"
                  value={organizacija.odgovornaOsoba}
                  onChange={handleChange}
                  // style={{ width: "90%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Odgovorna osoba"
                  required
                  isInvalid={validated && !organizacija.odgovornaOsoba}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={organizacija.brojTelefona}
                  onChange={handleChange}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefona"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={organizacija.email}
                  onChange={handleChange}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                  isInvalid={validated && !organizacija.email}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  as="textarea" // This makes it a textarea
                  rows={4} // You can adjust the number of rows to control the height of the textarea
                  name="delatnost"
                  value={organizacija.delatnost}
                  onChange={handleChange}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Delatnost"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  as="textarea" // This makes it a textarea
                  rows={4} // You can adjust the number of rows to control the height of the textarea
                  name="opis"
                  value={organizacija.opis}
                  onChange={handleChange}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Opis"
                  required
                  isInvalid={validated && !organizacija.opis}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="link"
                  value={organizacija.link}
                  onChange={handleChange}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Link"
                />
              </Form.Group>
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Dalje
              </Button>
              &nbsp;
            </Modal.Footer>
          </Form>
        </div>
      </Modal>

      <Modal show={showDogadjaj} onHide={handleCloseDogadjaj}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj događaj</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleDodaj}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                name="naziv"
                value={dogadjaj.naziv}
                onChange={handleChangeDogadjaj}
                // style={{ width: "80%", maxWidth: "90%" }}
                type="text"
                placeholder="Naziv"
                required
                isInvalid={validated && !dogadjaj.naziv}
              />
              <Form.Control.Feedback type="invalid">
                Ovo polje je obavezno!
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="datum"
                value={dogadjaj.datum}
                onChange={handleChangeDogadjaj}
                // style={{ width: "80%", maxWidth: "90%" }}
                type="date"
                placeholder="Datum"
                required
                isInvalid={validated && !dogadjaj.datum}
              />
              <Form.Control.Feedback type="invalid">
                Ovo polje je obavezno!
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="pocetakDogadjaja"
                value={dogadjaj.pocetakDogadjaja}
                onChange={handleChangeDogadjaj}
                // style={{ width: "80%", maxWidth: "90%" }}
                type="time"
                placeholder="Početak događaja"
                required
                isInvalid={validated && !dogadjaj.pocetakDogadjaja}
              />
              <Form.Control.Feedback type="invalid">
                Ovo polje je obavezno!
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="krajDogadjaja"
                value={dogadjaj.krajDogadjaja}
                onChange={handleChangeDogadjaj}
                // style={{ width: "80%", maxWidth: "90%" }}
                type="time"
                placeholder="Kraj događaja"
                required
                isInvalid={validated && !dogadjaj.krajDogadjaja}
              />
              <Form.Control.Feedback type="invalid">
                Ovo polje je obavezno!
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="dropdown">
              <Form.Control
                as="select"
                name="mestoDogadjajaId"
                value={dogadjaj.mestoDogadjajaId}
                onChange={handleChangeDogadjaj}
                // style={{ width: "80%", maxWidth: "90%" }}
                required
                isInvalid={validated && !dogadjaj.mestoDogadjajaId}
              >
                <option value="">Izaberite salu</option>
                {mestaDogadjaja.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.nazivSale}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Ovo polje je obavezno!
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="dropdown">
              <Form.Control
                as="select"
                name="vrstaDogadjajaId"
                value={dogadjaj.vrstaDogadjajaId}
                onChange={handleChangeDogadjaj}
                // style={{ width: "80%", maxWidth: "90%" }}
                required
                isInvalid={validated && !dogadjaj.vrstaDogadjajaId}
              >
                <option value="">Izaberite vrstu događaja</option>
                {tipoviDogadjaja.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.naziv}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Ovo polje je obavezno!
              </Form.Control.Feedback>
            </Form.Group>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Dodaj
            </Button>
            <Button variant="danger" onClick={handleNazad}>
              Nazad
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditOrganizacija} onHide={handleCloseEditOrganizacija}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <div>
          <Form noValidate validated={validated} onSubmit={handleDaljeEdit}>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  name="naziv"
                  value={organizacijaEdit.naziv}
                  onChange={handleChangeEditOrganziacija}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Naziv"
                  required
                  isInvalid={validated && !organizacijaEdit.naziv}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="odgovornaOsoba"
                  value={organizacijaEdit.odgovornaOsoba}
                  onChange={handleChangeEditOrganziacija}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Odgovorna osoba"
                  required
                  isInvalid={validated && !organizacijaEdit.odgovornaOsoba}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={organizacijaEdit.brojTelefona}
                  onChange={handleChangeEditOrganziacija}
                  // style={{ width: "80%", maxWidth: "90%" }}
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
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                  isInvalid={validated && !organizacijaEdit.email}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  as="textarea" // This makes it a textarea
                  rows={4} // You can adjust the number of rows to control the height of the textarea
                  name="delatnost"
                  value={organizacijaEdit.delatnost}
                  onChange={handleChangeEditOrganziacija}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Delatnost"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  as="textarea" // This makes it a textarea
                  rows={4} // You can adjust the number of rows to control the height of the textarea
                  name="opis"
                  value={organizacijaEdit.opis}
                  onChange={handleChangeEditOrganziacija}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Opis"
                  required
                  isInvalid={validated && !organizacijaEdit.opis}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="link"
                  value={organizacijaEdit.link}
                  onChange={handleChangeEditOrganziacija}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Link"
                  required
                />
              </Form.Group>
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Dalje
              </Button>
              &nbsp;
            </Modal.Footer>
          </Form>
        </div>
      </Modal>

      <Modal show={showUcesnik} onHide={handleCloseUcesnik}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj učesnika</Modal.Title>
        </Modal.Header>
        <div>
          <Form noValidate validated={validated} onSubmit={handleDodajUcesnika}>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  name="ime"
                  value={ucesnik.ime}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Ime"
                  required
                  isInvalid={validated && !ucesnik.ime}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="prezime"
                  value={ucesnik.prezime}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Prezime"
                  required
                  isInvalid={validated && !ucesnik.prezime}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  // style={{ width: "80%", maxWidth: "90%" }}
                  as="select"
                  name="rod"
                  value={ucesnik.rod}
                  onChange={handleChangeUcesnik}
                  required
                  isInvalid={validated && !ucesnik.rod}
                >
                  <option value="">Izaberite rod</option>
                  {Object.entries(rodMapping).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="godine"
                  value={ucesnik.godine}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="number"
                  placeholder="Godina rođenja"
                  required
                  isInvalid={
                    validated &&
                    (!/^\d{4}$/.test(ucesnik.godine) || ucesnik.godine < 1930)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Godina mora biti u formatu četiri cifre i veća ili jednaka
                  1930.
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="mestoBoravista"
                  value={ucesnik.mestoBoravista}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Mesto boravišta"
                  required
                  isInvalid={validated && !ucesnik.mestoBoravista}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={ucesnik.brojTelefona}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefona"
                  // required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={ucesnik.email}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  // required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="organizacija"
                  value={ucesnik.organizacija}
                  onChange={handleChangeUcesnik}
                  // style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Organizacija"
                  required
                  isInvalid={validated && !ucesnik.organizacija}
                />
                <Form.Control.Feedback type="invalid">
                  Ovo polje je obavezno!
                </Form.Control.Feedback>
              </Form.Group>
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Dodaj učesnika
              </Button>
              &nbsp;
              <Button onClick={handleCloseUcesnik} variant="danger">
                Završi
              </Button>
              &nbsp;
            </Modal.Footer>
          </Form>
        </div>
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

      <Modal show={showHeader} onHide={handleCloseHeader} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Izaberite header logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Row>
                <Col>
                  {firstHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectHeader(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col>
                  {secondHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectHeader(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleNext} variant="success">
            Dalje
          </Button>
          <Button onClick={handleCloseHeader} variant="danger">
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFooter} onHide={handleCloseFooter} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Izaberite footer logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Row>
                <Col>
                  {firstHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectFooter(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col>
                  {secondHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectFooter(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleChoose} variant="success">
            Izaberi
          </Button>
          <Button onClick={handleCloseFooter} variant="danger">
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DogadjajList;
