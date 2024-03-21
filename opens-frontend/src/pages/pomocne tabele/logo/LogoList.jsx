import { useContext, useEffect, useState } from "react";
import { LogoContext } from "./LogoContext";
import Pagination from "../../Pagination";
import { Button } from "react-bootstrap";
import Logo from "./Logo";

const LogoList = () => {
  const { sortedLogo } = useContext(LogoContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [logoiPerPage] = useState(5);

   useEffect(() => {
    handleClose();
  }, [sortedLogo]);

  const indexOfLastLogo = currentPage * logoiPerPage;

  const indexOfFirstLogo =
    indexOfLastLogo - logoiPerPage;

  const currentLogoi = sortedLogo.slice(
    indexOfFirstLogo,
    indexOfLastLogo
  );

  const totalPagesNumber = Math.ceil(
    sortedLogo.length / logoiPerPage
  );



  return (
    <>
        <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Logo</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi logo</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentLogoi.map((logo) => (
            <tr key={logo.id}>
              <Logo logo={logo} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pages={totalPagesNumber} setCurrentPage={setCurrentPage} array={sortedLogo} />
    </>
  )
};

export default LogoList;
