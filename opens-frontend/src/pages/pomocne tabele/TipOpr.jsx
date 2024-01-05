import { MdDelete, MdEdit } from "react-icons/md";

const TipOpr = ({tipOpreme}) => {

    return (
        <>
      <td>{tipOpreme.naziv}</td>
      <td>{tipOpreme.sifra}</td>
      <td>
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
      </td>
    </>
    )
}

export default TipOpr;