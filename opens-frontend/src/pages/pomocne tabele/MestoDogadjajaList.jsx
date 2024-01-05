import { useContext } from "react";
import { MestoDogadjajaContext } from "./MestoDogadjajaContext";
import MestoDogadjaja from "./MestoDogadjaja";
import { Button } from "react-bootstrap";

const MestoDogadjajaList = () => {
  const { mestaDogadjaja } = useContext(MestoDogadjajaContext);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Mesto Događaja</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novo mesto događaja</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv sale</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {mestaDogadjaja.map((mestoDogadjaja) => (
            <tr key={mestoDogadjaja.id}>
              <MestoDogadjaja mestoDogadjaja = {mestoDogadjaja}/>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MestoDogadjajaList;
