import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import httpCommon from "../../http-common";
import Pagination from "../Pagination";
import OmladinskiCentarPrvePoseteTabelaItem from "./OmladinskiCentarPrvePoseteTabelaItem";
import AddPrvuPosetuForm from "./modal/AddPrvuPosetuForm";

export const OmladinskiCentarPrvePoseteTabela = ({ mestoPoseteId }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [prvePosete, setPrvePosete] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filtriranePosete = (items) => {
    if (searchQuery.trim() === "") {
      return items; //Vraca sve ukoliko je searcInput prazan
    } else {
      return items.filter((item) => {
        const fullName = `${item.ime} ${item.prezime}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
  };

  const filteredPosete = filtriranePosete(prvePosete);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstitem = indexOfLastItem - limit;
  const currentPosete = filteredPosete.slice(indexOfFirstitem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPosete.length / limit);

  const shouldShowPagination =
    searchQuery.trim() === "" && prvePosete.length >= 10;

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  const fetchPrvePosete = async () => {
    const { data } = await httpCommon.get(
      `/posete/${mestoPoseteId}/prvePosete`
    );
    setPrvePosete(data);
  };

  useEffect(() => {
    fetchPrvePosete();
    handleClose();
  }, [mestoPoseteId]);

  const noItemsToShow = filteredPosete.length === 0 && searchQuery.trim() !== "";

  return (
    <>
      <div className="table-title">
        <div className="my-4">
          <Form.Control
            type="text"
            placeholder="Pretraga po imenu ili prezimenu"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
        </div>
        <div className="row my-2">
          <div className="col-sm-6">
            {prvePosete && shouldShowPagination && (
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
            )}
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" onClick={handleShow}>
              <FaSquarePlus size={20} className="mx-1" /> Dodaj prvu posetu
            </Button>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped table-hover prve-table">
        <thead>
          <tr>
            <th>Ime i prezime</th>
            <th>Godine</th>
            <th>Rod</th>
            <th>Mesto posete</th>
            <th>Datum prve posete</th>
          </tr>
        </thead>
        {prvePosete.length === 0 || noItemsToShow ? (
          <tbody>
            <tr>
              <td colSpan={5} className="nema-unetih">
                Nema stavki za prikazivanje.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentPosete.map((prva) => (
              <tr key={prva.id}>
                <OmladinskiCentarPrvePoseteTabelaItem prvaPoseta={prva} />
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {prvePosete && shouldShowPagination && (
        <Pagination
          pages={totalPages}
          setCurrentPage={setCurrentPage}
          array={prvePosete}
          limit={limit}
          maxVisibleButtons={3}
        />
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj prvu posetu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPrvuPosetuForm />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default OmladinskiCentarPrvePoseteTabela;
