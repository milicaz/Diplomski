import { useContext } from "react";
import { MestoPoseteContext } from "./MestoPoseteContext";
import { Button } from "react-bootstrap";
import MestoPosete from "./MestoPosete";

const MestoPoseteList = () => {
  const { mestaPosete } = useContext(MestoPoseteContext);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>Mesto Posete</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novo mesto posete</span>
            </Button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Ukupan broj mesta</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {mestaPosete.map((mestoPosete) => (
            <tr key={mestoPosete.id}>
              <MestoPosete mestoPosete={mestoPosete} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MestoPoseteList;
