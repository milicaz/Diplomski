import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { opensBojaImage } from "../assets";
import useHttpProtected from "../hooks/useHttpProtected";

const Ucesnici = () => {
  const [validated, setValidated] = useState(false);
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
  const [dogadjaji, setDogadjaji] = useState([]);
  const [selectedDogadjaj, setSelectedDogadjaj] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  const rodMapping = {
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchDogadjaji = async () => {
      try {
        const { data } = await httpProtected.get("/dogadjaji", {
          signal: controller.signal,
        });

        if (isMounted) {
          const today = new Date().toISOString().split("T")[0];
          const filteredDogadjaji = data.filter((dogadjaj) => {
            const eventDate = new Date(dogadjaj.datum)
              .toISOString()
              .split("T")[0]; // Format the event date
            return eventDate === today; // Compare dates
          });
          setDogadjaji(filteredDogadjaji);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("An error occurred while fetching dogadjaji: ", error);
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchDogadjaji();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleDogadjajChange = (event) => {
    const newSelectedId = event.target.value; // This is a string
    setSelectedId(newSelectedId);
    const selected = dogadjaji.find(
      (dogadjaj) => dogadjaj.id.toString() === newSelectedId
    );
    setSelectedDogadjaj(selected);
  };

  const handleChangeUcesnik = (event) => {
    const { name, value } = event.target;
    setUcesnik({ ...ucesnik, [name]: value });
  };

  const handleDodajUcesnik = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const controller = new AbortController();

      try {
        await httpProtected.post(`/ucesniciDogadjaja/${selectedId}`, ucesnik, {
          signal: controller.signal,
        });
        setValidated(false);
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
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error(
            "Greška prilikom dodavanja učesnika u događaj: ",
            error
          );
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      } finally {
        controller.abort();
      }
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <Card className="registracija-card">
          <Card.Header>
            <div style={{ marginTop: "100px" }}>
              <img src={opensBojaImage} alt="OPENS" />
            </div>
          </Card.Header>
          <Card.Body className="mt-5 mb-3">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleDodajUcesnik}
            >
              <Form.Group className="mb-4">
                <Form.Control
                  as="select"
                  onChange={handleDogadjajChange}
                  style={{ width: "100%" }}
                  required
                  disabled={!!selectedDogadjaj} // Disable if a dogadjaj is selected
                >
                  <option value="">Izaberite događaj</option>
                  {dogadjaji.map((dogadjaj) => (
                    <option key={dogadjaj.id} value={dogadjaj.id}>
                      {dogadjaj.naziv}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {selectedDogadjaj && (
                <>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="ime"
                      type="text"
                      placeholder="Ime *"
                      value={ucesnik.ime}
                      onChange={handleChangeUcesnik}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ime je obavezno.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="prezime"
                      type="text"
                      placeholder="Prezime *"
                      value={ucesnik.prezime}
                      onChange={handleChangeUcesnik}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Prezime je obavezno.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      as="select"
                      name="rod"
                      value={ucesnik.rod}
                      onChange={handleChangeUcesnik}
                      required
                    >
                      <option value="">Izaberite rod *</option>
                      {Object.entries(rodMapping).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Rod je obavezan.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="godine"
                      type="number"
                      placeholder="Godina rođenja *"
                      value={ucesnik.godine}
                      onChange={handleChangeUcesnik}
                      required
                      min={1930}
                    />
                    <Form.Control.Feedback type="invalid">
                      Godina rođenja je obavezna.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="mestoBoravista"
                      type="text"
                      placeholder="Mesto boravišta *"
                      value={ucesnik.mestoBoravista}
                      onChange={handleChangeUcesnik}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Mesto boravišta je obavezno.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="brojTelefona"
                      type="text"
                      placeholder="Broj telefona"
                      value={ucesnik.brojTelefona}
                      onChange={handleChangeUcesnik}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="email"
                      type="text"
                      placeholder="E-mail"
                      value={ucesnik.email}
                      onChange={handleChangeUcesnik}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      name="organizacija"
                      type="text"
                      placeholder="Organizacija *"
                      value={ucesnik.organizacija}
                      onChange={handleChangeUcesnik}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Organizacija je obavezna.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-grid gap-2 my-4">
                    <Button variant="success" type="submit" size="lg">
                      Prijavite se na događaj
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Ucesnici;
