import { Button, Form } from "react-bootstrap";
import { DogadjajContext } from "../DogadjajContext";
import { useContext, useState } from "react";

const EditUcesnikForm = ({ currentUcesnik, onUcesnikEdited }) => {
    
    const { editUcesnik } = useContext(DogadjajContext);
    
    // if (!currentUcesnik) {
    //     return <div>Loading...</div>;  // Show loading message or nothing if no data
    // }

    const [validated, setValidated] = useState(false);

    const [ucesnik, setUcesnik] = useState({
        ime: currentUcesnik.ime,
        prezime: currentUcesnik.prezime,
        rod: currentUcesnik.rod,
        godine: currentUcesnik.godine,
        mestoBoravista: currentUcesnik.mestoBoravista,
        brojTelefona: currentUcesnik.brojTelefona,
        email: currentUcesnik.email,
        organizacija: currentUcesnik.organizacija,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUcesnik({ ...ucesnik, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            console.log("Ucesni u editu: " + JSON.stringify(ucesnik))
            console.log("Id u editu " + currentUcesnik.id)
          await editUcesnik(currentUcesnik.id, ucesnik);  // Make sure to use currentUcesnik.id here
          onUcesnikEdited();
        }
        setValidated(true);
    };

    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="ime"
              value={ucesnik.ime}
              onChange={handleChange}
              placeholder="Ime *"
              required
              isInvalid={validated && !ucesnik.ime}
            />
            <Form.Control.Feedback type="invalid">
              Unesite ime učesnika.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="prezime"
              value={ucesnik.prezime}
              onChange={handleChange}
              placeholder="Prezime *"
              required
              isInvalid={validated && !ucesnik.prezime}
            />
            <Form.Control.Feedback type="invalid">
              Unesite prezime učesnika.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="rod"
              value={ucesnik.rod}
              onChange={handleChange}
              placeholder="Rod *"
              required
              isInvalid={validated && !ucesnik.rod}
            />
            <Form.Control.Feedback type="invalid">
              Unesite rod učesnika.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="godine"
              value={ucesnik.godine}
              onChange={handleChange}
              placeholder="Godine *"
              required
              isInvalid={validated && !ucesnik.godine}
            />
            <Form.Control.Feedback type="invalid">
              Unesite godinu rođenja učesnika.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="mestoBoravista"
              value={ucesnik.mestoBoravista}
              onChange={handleChange}
              placeholder="Mesto boravišta *"
              required
              isInvalid={validated && !ucesnik.mestoBoravista}
            />
            <Form.Control.Feedback type="invalid">
              Unesite mesto boravišta učesnika.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="brojTelefona"
              value={ucesnik.brojTelefona}
              onChange={handleChange}
              placeholder="Broj telefona *"
              // required
              // isInvalid={validated && !ucesnik.brojTelefona}
            />
            {/* <Form.Control.Feedback type="invalid">
              Unesite broj telefona učesnika.
            </Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="email"
              value={ucesnik.email}
              onChange={handleChange}
              placeholder="Email *"
              // required
              // isInvalid={validated && !ucesnik.email}
            />
            {/* <Form.Control.Feedback type="invalid">
              Unesite email učesnika.
            </Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="organizacija"
              value={ucesnik.organizacija}
              onChange={handleChange}
              placeholder="Organizacija *"
              required
              isInvalid={validated && !ucesnik.organizacija}
            />
            <Form.Control.Feedback type="invalid">
              Unesite organizaciju učesnika.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <div className="d-grid gap-2">
                <Button type="submit" variant="success">
                  Izmeni
                </Button>
            </div>
        </Form.Group>
      </Form>
    );
};

export default EditUcesnikForm
