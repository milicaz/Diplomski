import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LogoContext } from "../LogoContext";

const AddLogoForm = () => {
  const { addLogo } = useContext(LogoContext);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const uploadedLogo = await addLogo(file);
      console.log("Logo je uspešno sačuvan:", uploadedLogo);
    } catch (error) {
        console.log("Logo nije sačuvan!");
    }
  };

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group controlId="logoUpload">
        <Form.Label>Select Logo:</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <br />
      {file && (
        <img src={URL.createObjectURL(file)} width={450} alt="Selected" />
      )}
      <br />
      <Button variant="primary" type="submit">
        Dodaj
      </Button>
    </Form>
  );
};

export default AddLogoForm;
