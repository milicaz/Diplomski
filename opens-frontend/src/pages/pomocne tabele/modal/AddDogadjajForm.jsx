import { Form } from "react-bootstrap";

const AddDogadjajForm = () => {

    return (
        <Form>
            <Form.Group>
                <Form.Control style={{width:"80%", maxWidth:"90%"}} type="text" placeholder="Naziv " required />
            </Form.Group>
        </Form>
    )
}

export default AddDogadjajForm;