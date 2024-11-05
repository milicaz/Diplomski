import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import Pagination from "../../Pagination";
import Logo from "./Logo";
import { LogoContext } from "./LogoContext";
import AddLogoForm from "./modal/AddLogoForm";

const LogoList = () => {
  const { base64, getImage } = useContext(LogoContext);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const indexOfLastLogo = currentPage * limit;
  const indexOfFirstLogo = currentPage - limit;
  const currentLogo = base64.slice(indexOfFirstLogo, indexOfLastLogo);
  const totalPagesNumber = Math.ceil(base64.length / limit);

  const onInputChange = (event) => {
    setLimit(event.target.value);
  };

  const handleLogoAdded = async () => {
    const controller = new AbortController();
    await getImage(true, controller);
    handleClose();
  };

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <div className="row align-items-center mb-3">
              <div className="col-auto pe-0">
                <span>Prikaži</span>
              </div>
              <div className="col-auto">
                <Form.Select
                  name="limit"
                  value={limit}
                  onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Form.Select>
              </div>
              <div className="col-auto ps-0">
                <span>unosa</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success">
              <FaSquarePlus size={20} className="mx-1" />
              Dodaj novi logo
            </Button>
          </div>
        </div>
      </div>
      <div>
        <table className="image-table">
          <thead>
            <tr>
              <th>Redni broj</th>
              <th>Logo</th>
              <th>Naziv</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {currentLogo.map((image, index) => (
              <tr key={image.id}>
                <td>{index + 1}</td>
                <Logo logo={image} />
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pages={totalPagesNumber}
          setCurrentPage={setCurrentPage}
          array={base64}
          limit={limit}
          maxVisibleButtons={3}
        />

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Dodaj logo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddLogoForm onLogoAdded={handleLogoAdded} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LogoList;
