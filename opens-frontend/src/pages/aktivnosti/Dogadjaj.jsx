import { MdDelete, MdEdit } from "react-icons/md";

const Dogadjaj = ({ dogadjaj }) => {
  return (
    <>
      <td>{dogadjaj.naziv}</td>
      <td>{dogadjaj.datum}</td>
      <td>{dogadjaj.mesto}</td>
      <td>{dogadjaj.vrsta}</td>
      <td>{dogadjaj.pocetakDogadjaja}</td>
      <td>{dogadjaj.krajDogadjaja}</td>
      <td>
        <a href="#editDogadjaj" className="edit">
            <i className="react-icons" title="Edit">
                <MdEdit />
            </i>
        </a>&nbsp;
        <a href="#deleteDogadjaj" className="delete">
            <i className="react-icons" title="Delete">
                <MdDelete />
            </i>
        </a>
      </td>
    </>
  );
};

export default Dogadjaj;