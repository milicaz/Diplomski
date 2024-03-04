import { MdDelete, MdEdit } from "react-icons/md";

const PrigradskaNaselja = ({ prigradskoNaselje }) => {
  return (
    <>
      <td>{prigradskoNaselje.naziv}</td>
      <td>
        <a href="#editPrigradskoNaselje" className="edit">
            <i className="react-icons" title="Edit">
                <MdEdit />
            </i>
        </a>&nbsp;
        <a href="#deletePrigradskoNaselje" className="delete">
            <i className="react-icons" title="Delete">
                <MdDelete />
            </i>
        </a>
      </td>
    </>
  );
};

export default PrigradskaNaselja;
