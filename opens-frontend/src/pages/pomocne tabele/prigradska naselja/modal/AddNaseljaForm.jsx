import { useContext, useState } from "react";
import { PrigradskaNaseljaContext } from "../PrigradskaNaseljaContext";
import { Button, Form } from "react-bootstrap";

const AddNaseljaForm = () => {

    const {addNaselje} = useContext(PrigradskaNaseljaContext)

    const [prigradskoNaselje, setPrigradskoNaselje] = useState({naziv: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPrigradskoNaselje(prevNaselje => ({...prevNaselje, [name]: value}))
    }

    const handleDodaj = (event) => {
        event.preventDefault();
        addNaselje(prigradskoNaselje)
    }

    return (
        <Form onSubmit={handleDodaj}>
            <Form.Group className="mb-3">
                <Form.Control name="naziv" value={prigradskoNaselje.naziv} onChange={handleChange} type="text" placeholder="Naziv " required />
            </Form.Group>
            <Form.Group>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="success">Dodaj</Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default AddNaseljaForm;