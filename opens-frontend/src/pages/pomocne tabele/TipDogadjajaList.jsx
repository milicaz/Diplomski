import { useContext } from "react";
import { TipDogadjajaContext } from "./TipDogadjajaContext";
import { Button } from "react-bootstrap";
import TipDogadjaja from "./TipDogadjaja";

const TipDogadjajaList = () => {
  const { tipoviDogadjaja } = useContext(TipDogadjajaContext);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Tip Događaja</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi tip događaja</span>
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
          {tipoviDogadjaja.map((tipDogadjaja) => (
            <tr key={tipDogadjaja.id}>
              <TipDogadjaja tipDogadjaja={tipDogadjaja} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TipDogadjajaList;
