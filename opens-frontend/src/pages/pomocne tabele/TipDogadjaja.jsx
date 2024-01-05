import { MdDelete, MdEdit } from "react-icons/md";

const TipDogadjaja = ({ tipDogadjaja }) => {
  return (
    <>
      <td>{tipDogadjaja.naziv}</td>
      <td>
        <a href="#editTipDogadjaja" className="edit">
            <i className="react-icons" title="Edit">
                <MdEdit />
            </i>
        </a>&nbsp;
        <a href="#deleteTipDogadjaja" className="delete">
            <i className="react-icons" title="Delete">
                <MdDelete />
            </i>
        </a>
      </td>
    </>
  );
};

export default TipDogadjaja;
