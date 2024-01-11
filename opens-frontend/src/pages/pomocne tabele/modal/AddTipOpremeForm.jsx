import { Form } from "react-bootstrap";

const AddTipOpremeForm = () => {

    return (
        <Form>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Naziv" required />
            </Form.Group><br />
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Šifra" />
            </Form.Group>
        </Form>
    )
}

export default AddTipOpremeForm;
