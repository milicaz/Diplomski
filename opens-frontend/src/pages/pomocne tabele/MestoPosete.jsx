import { MdDelete, MdEdit } from "react-icons/md";

const MestoPosete = ({mestoPosete}) => {

    return (
        <>
            <td>{mestoPosete.naziv}</td>
            <td>{mestoPosete.ukupanBrojMesta}</td>
            <td>
                <a href="#editMestoPosete" className="edit">
                    <i className="react-icons" title="Edit">
                        <MdEdit />
                    </i>
                </a>
                <a href="#deleteMestoPosete" className="edit">
                    <i className="react-icons" title="Delete">
                        <MdDelete />
                    </i>
                </a>
            </td>
        </>
    )
}

export default MestoPosete;