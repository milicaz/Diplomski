import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import Pagination from "../../Pagination";
import { DogadjajContext } from "../DogadjajContext";

const DogadjajUcesniciForm = ({ currentDogadjaj }) => {
  const { getUcesnici } = useContext(DogadjajContext);

  const [ucesnici, setUcesnici] = useState([]);

  const id = currentDogadjaj.id;

  const naziv = currentDogadjaj.naziv;

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUcesnici = async () => {
      const fetchedUcesnici = await getUcesnici(id);
      setUcesnici(fetchedUcesnici); // Set the participants data after it's fetched
    };

    fetchUcesnici(); // Call the async function
  }, [id]);

  // Handle the change in the limit select dropdown
  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  // Handle pagination (this could be implemented to fetch more participants)
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="table-title">
        <div className="row d-flex align-items-center mb-3">
          {/* Left aligned: Limit dropdown */}
          <div className="col-sm-6">
            <div className="row align-items-center">
              <div className="col-auto pe-0">
                <span>Prikaži</span>
              </div>
              <div className="col-auto">
                <Form.Select
                  name="limit"
                  value={limit}
                  onChange={onInputChange}
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

          {/* Right aligned: Učesnici događaja text */}
          <div className="col-sm-6 d-flex justify-content-end">
            {/* <p>
              <b>Učesnici događaja: {naziv}</b>
            </p> */}
          </div>
        </div>
      </div>

      <div>
        <table className="image-table">
          <thead>
            <tr>
              <th>Redni broj</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Godine</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {ucesnici
              .slice((currentPage - 1) * limit, currentPage * limit)
              .map((ucesnik, index) => (
                <tr key={ucesnik.id}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{ucesnik.ime}</td>
                  <td>{ucesnik.prezime}</td>
                  <td>{ucesnik.godine}</td>
                  <td>{ucesnik.brojTelefona}</td>
                  <td>{ucesnik.email}</td>
                  <td>
                    <div className="button-row" title="Izmena">
                      <button className="btn text-warning btn-act">
                        <MdEdit />
                      </button>
                      <button
                        className="btn text-danger btn-act"
                        title="Brisanje"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                  <td>{/* Add actions here, like Edit or Delete */}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        pages={Math.ceil(ucesnici.length / limit)} // Calculate number of pages
        setCurrentPage={onPageChange}
        array={ucesnici}
        limit={limit}
        maxVisibleButtons={3}
      />
    </div>
  );
};

export default DogadjajUcesniciForm;
