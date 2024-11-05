import { useContext, useState } from "react";
import { Button, Form, Image, Toast } from "react-bootstrap";
import { LogoContext } from "../LogoContext";

const AddLogoForm = ({ onLogoAdded }) => {
  const { addLogo } = useContext(LogoContext);
  const [file, setFile] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      handleShowToast("Molimo vas da izaberete fajl pre nego što kliknete na 'Dodaj logo'.", "error");
      return;
    }
    try {
      await addLogo(file);
      handleShowToast("Logo je uspešno dodat!", "success");
      onLogoAdded(); // Notify parent to refresh and close modal
    } catch (error) {
      if (error.message === "File size exceeds limit!") {
        handleShowToast(
          "Fajl prelazi maksimalnu veličinu dozvoljenu za upload!",
          "error"
        );
      } else if (
        error.message === "Invalid file type. Only image files are allowed."
      ) {
        handleShowToast("Nevažeći tip datoteke. Dozvoljene su samo slike.", "error");
      } else {
        handleShowToast("Logo nije sačuvan!", "error");
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
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          minWidth: 300,
          backgroundColor: toastVariant === "success" ? "#a3c57b" : "#f56f66",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastVariant === "success" ? "" : "Greška"}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default AddLogoForm;
