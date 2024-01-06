import { useContext } from "react";
import { DogadjajContext } from "./DogadjajContext";
import { Button } from "react-bootstrap";
import Dogadjaj from "./Dogadjaj";

const DogadjajList = () => {
  const { dogadjaji } = useContext(DogadjajContext);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Događaji</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi događaj</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Datum</th>
            <th>Mesto</th>
            <th>Vrsta</th>
            <th>Početak događaja</th>
            <th>Kraj događaja</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {dogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DogadjajList;
