import { useContext } from "react";
import { PrigradskaNaseljaContext } from "./PrigradskaNaseljaContext";
import { Button } from "react-bootstrap";
import PrigradskaNaselja from "./PrigradskaNaselja";

const PrigradskaNaseljaList = () => {
  const { prigradskaNaselja } = useContext(PrigradskaNaseljaContext);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Prigradska Naselja</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novo prigradsko naselje</span>
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
          {prigradskaNaselja.map((prigradskoNaselje) => (
            <tr key={prigradskoNaselje.id}>
              <PrigradskaNaselja prigradskoNaselje={prigradskoNaselje} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PrigradskaNaseljaList;
