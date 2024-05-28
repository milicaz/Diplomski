import { Form } from "react-bootstrap";


const AddNoviDogadjajForm = () => {


    return (
        <Form>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Naziv" required />
            </Form.Group><br />
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="date" placeholder="Datum" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Mesto" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Vrsta" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="time" placeholder="Početak događaja" required />
            </Form.Group><br/>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="time" placeholder="Kraj događaja" required />
            </Form.Group>
        </Form>
    )
}

export default AddNoviDogadjajForm;