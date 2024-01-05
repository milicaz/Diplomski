import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TipOpreme = ({ tipOpreme }) => {
  return (
    <>
      <td>{tipOpreme.naziv}</td>
      <td>{tipOpreme.sifra}</td>
      <td>
        {/* <a href="#editTipOpreme" className="edit" data-toggle="modal">
          <i className="material-icons" data-toggle="tooltip" title="Edit">
            &#xE254;
          </i>
        </a> */}
        <a href="#editTipOpreme" className="edit">
          <i className="react-icons" title="Edit">
            <MdEdit />
          </i>
        </a> &nbsp;
        <a href="#deleteTipOpreme" className="delete">
          <i className="react-icons" title="Delete">
            <MdDelete />
          </i>
        </a>
      </td>
      <td>
        {/* <a href="#deleteTipOpreme" className="delete" data-toggle="modal">
          <i className="material-icons" data-toggle="tooltip" title="Delete">
            &#xE254;
          </i>
        </a> */}
      </td>
    </>
  );
};

export default TipOpreme;
