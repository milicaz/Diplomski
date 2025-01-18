import { useContext, useState } from "react";
import { Button, Form, Image, Toast } from "react-bootstrap";
import { LogoContext } from "../LogoContext";
import useToast from "../../../../hooks/useToast";

const AddLogoForm = ({ onLogoAdded }) => {
  const { addLogo } = useContext(LogoContext);
  const [file, setFile] = useState(null);
  const { handleShowToast } = useToast();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      handleShowToast("Greška", "Molimo vas da izaberete fajl pre nego što kliknete na 'Dodaj logo'.", "error");
      return;
    }
    try {
      await addLogo(file);
      handleShowToast("", "Logo je uspešno dodat!", "success");
      onLogoAdded(); // Notify parent to refresh and close modal
    } catch (error) {
      if (error.message === "File size exceeds limit!") {
        handleShowToast(
          "Greška",
          "Fajl prelazi maksimalnu veličinu dozvoljenu za upload!",
          "error"
        );
      } else if (
        error.message === "Invalid file type. Only image files are allowed."
      ) {
        handleShowToast("Greška", "Nevažeći tip datoteke. Dozvoljene su samo slike.", "error");
      } else {
        handleShowToast("Greška", "Logo nije sačuvan!", "error");
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleUpload}>
        <Form.Group controlId="logoUpload" className="mb-5">
          <Form.Label>Select Logo:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
        {file && (
          <Image
            className="mb-5"
            src={URL.createObjectURL(file)}
            width={450}
            alt="Selected"
          />
        )}
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Dodaj logo
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddLogoForm;
