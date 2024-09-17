import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Pagination from "../Pagination";

const DogadjajiTrenutno = () => {

    const [dogadjaji, setDogadjaji] = useState([]);

    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)

  const indexOfLastTrenutno = currentPage * limit;
  const indexOfFirstTrenutno = currentPage - limit;
  const currentTrenutno = dogadjaji.slice(indexOfFirstTrenutno, indexOfLastTrenutno);
  const totalPagesNumber = Math.ceil(dogadjaji.length / limit)

    useEffect(() => {
        // Fetch data from the API when the component mounts
        axios.get('http://localhost:8080/api/dogadjajiTrenutno')
            .then(response => {
                setDogadjaji(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const onInputChange = (event) => {
        setLimit(event.target.value)
    }

    // // Function to format and merge time range
    // const formatTimeRange = (start, end) => {
    //     // Assuming start and end are in 'HH:mm:ss' format
    //     const startTime = new Date(`1970-01-01T${start}Z`).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    //     const endTime = new Date(`1970-01-01T${end}Z`).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    //     return `${startTime} - ${endTime}`;
    // };
    // Function to format and merge time range
    const formatTimeRange = (start, end) => {
        // Assuming start and end are in 'HH:mm:ss' format
        // Create Date objects in local time zone
        const startTime = new Date(`1970-01-01T${start}`).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(`1970-01-01T${end}`).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return `${startTime} - ${endTime}`;
    };

    return (
        <><div className="table-title">
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
            </div>
        </div><div>
                <table className="table table-striped table-hover image-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Naziv Aktivnosti</th>
                            <th>Datum</th>
                            {/* <th>Pocetak Dogadjaja</th>
                            <th>Kraj Dogadjaja</th> */}
                            <th>Vreme Događaja</th>
                            <th>Mesto</th>
                            <th>Vrsta</th>
                            <th>Organizacija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dogadjaji.map(dogadjaj => (
                            <tr key={dogadjaj.id}>
                                <td>{dogadjaj.id}</td>
                                <td>{dogadjaj.naziv_aktivnosti}</td>
                                <td>{dogadjaj.datum}</td>
                                {/* <td>{dogadjaj.pocetak_dogadjaja}</td>
                                <td>{dogadjaj.kraj_dogadjaja}</td> */}
                                <td>{formatTimeRange(dogadjaj.pocetak_dogadjaja, dogadjaj.kraj_dogadjaja)}</td>
                                <td>{dogadjaj.mesto}</td>
                                <td>{dogadjaj.vrsta}</td>
                                <td>{dogadjaj.organizacija}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination 
                pages={totalPagesNumber}
                setCurrentPage={setCurrentPage}
                array={dogadjaji}
                limit={limit}
                maxVisibleButtons={3} />
            </div></>
    );
}

export default DogadjajiTrenutno;