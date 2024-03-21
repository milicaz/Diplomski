import { useContext, useState } from "react";
import { PrigradskaNaseljaContext } from "../PrigradskaNaseljaContext";
import { Button, Form } from "react-bootstrap";

const EditNaseljaForm = ({ currentNaselje }) => {

    const {editNaselje} = useContext(PrigradskaNaseljaContext)

    const [prigradskoNaselje, setPrigradskoNaselje] = useState({ naziv: currentNaselje.naziv })

    const id = currentNaselje.id

    const handleChange = (event) => {
        const {name, value} = event.target
        setPrigradskoNaselje({...prigradskoNaselje, [name]: value})
    }

    const handleEdit = (event) => {
        event.preventDefault();
        editNaselje(id, prigradskoNaselje)
    }

    return(
        <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
                <Form.Control name="naziv" value={prigradskoNaselje.naziv} onChange={handleChange} type="text" placeholder="Naziv " required />
            </Form.Group>
            <Form.Group>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="success">Izmeni</Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default EditNaseljaForm;