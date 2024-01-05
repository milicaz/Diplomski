import { useContext } from "react";
import TipOpr from "./TipOpr";
import { TipOprContext } from "./TipOprContext";
import { Button } from "react-bootstrap";

const TipOprList = () => {

  const { tipoviOpreme } = useContext(TipOprContext);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Tip opreme</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi tip opreme</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Šifra</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {tipoviOpreme.map(tipOpreme => (
            <tr key={tipOpreme.id}>
              <TipOpr tipOpreme={tipOpreme} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
    )

}

export default TipOprList;