import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Ucesnici = () => {

    const [ucesnik, setUcesnik] = useState({ime: "", prezime: "", rod: "", godine: "", mestoBoravista: "", brojTelefona: "", email: "", organizacija: ""})

    const [dogadjaji, setDogadjaji] = useState([]); // Initialize as an array
    const [selectedDogadjaj, setSelectedDogadjaj] = useState(null); // To hold the selected event
    const [selectedId, setSelectedId] = useState(null); // New state for selected ID

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
        const fetchDogadjaji = async () => {
            const response = await fetch('http://localhost:8080/api/dogadjaji');
            const data = await response.json();
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            
            // Filter events to only include those with today's date
            const filteredDogadjaji = data.filter(dogadjaj => {
                const eventDate = new Date(dogadjaj.datum).toISOString().split('T')[0]; // Format the event date
                return eventDate === today; // Compare dates
            });

            setDogadjaji(filteredDogadjaji);
            console.log("Danasnji dogadjaji su: ", filteredDogadjaji);
        };
        fetchDogadjaji();
    }, []);

    const handleDogadjajChange = (event) => {
        const newSelectedId = event.target.value; // This is a string
        setSelectedId(newSelectedId);
        const selected = dogadjaji.find(dogadjaj => dogadjaj.id.toString() === newSelectedId);
        setSelectedDogadjaj(selected);
    };
    
    const handleChangeUcesnik = (event) => {
        const {name, value} = event.target
        setUcesnik({...ucesnik, [name]: value})
    }

    const handleDodajUcesnik = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:8080/api/ucesniciDogadjaja/${selectedId}`, ucesnik)
        setUcesnik({ime: "", prezime: "", rod: "", godine: "", mestoBoravista: "", brojTelefona: "", email: "", organizacija: ""})
    } 

    return (
        <Form>
            <Form.Group>
                {/* <Form.Label>Izaberite događaj:</Form.Label> */}
                <Form.Control
                    as="select"
                    onChange={handleDogadjajChange}
                    style={{ width: "100%" }}
                    required
                    disabled={!!selectedDogadjaj} // Disable if a dogadjaj is selected
                >
                    <option value="">Izaberite događaj</option>
                    {dogadjaji.map(dogadjaj => (
                        <option key={dogadjaj.id} value={dogadjaj.id}>
                            {dogadjaj.naziv}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group><br />

            {selectedDogadjaj && (
                <>
                    <Form.Group>
                        <Form.Control name="ime" value={ucesnik.ime} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="text" placeholder="Ime" required />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control name="prezime" value={ucesnik.prezime} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="text" placeholder="Prezime" required />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control
                            as="select"
                            name="rod"
                            value={ucesnik.rod}
                            onChange={handleChangeUcesnik}
                            required
                        >
                            <option value="">Izaberite rod</option>
                            {Object.entries(rodMapping).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </Form.Control>
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control name="godine" value={ucesnik.godine} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="number" placeholder="Godina rođenja" required />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control name="mestoBoravista" value={ucesnik.mestoBoravista} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="text" placeholder="Mesto boravišta" required />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control name="brojTelefona" value={ucesnik.brojTelefona} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="text" placeholder="Broj telefona" required />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control name="email" value={ucesnik.email} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="text" placeholder="E-mail" required />
                    </Form.Group><br />
                    <Form.Group>
                        <Form.Control name="organizacija" value={ucesnik.organizacija} onChange={handleChangeUcesnik} style={{ width: "100%" }} type="text" placeholder="Organizacija" required />
                    </Form.Group><br />
                    <Form.Group style={{width: "100%"}}>
                        <div className="d-flex justify-content-center">
                            <Button onClick={handleDodajUcesnik} variant="success">Dodaj učesnika</Button>&nbsp;
                        </div>
                    </Form.Group>
                </>
            )}
        </Form>
    )
}

export default Ucesnici;