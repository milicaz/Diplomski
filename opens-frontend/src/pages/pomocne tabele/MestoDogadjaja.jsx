import { MdDelete, MdEdit } from "react-icons/md"

const MestoDogadjaja = ({mestoDogadjaja}) => {

    return (
        <>
            <td>{mestoDogadjaja.nazivSale}</td>
            <td>
                <a href="#editMestoDogadjaja" className="edit">
                    <i className="react-icons" title="Edit">
                        <MdEdit />
                    </i>
                </a>&nbsp;
                <a href="#deleteMestoDogadjaja" className="delete">
                    <i className="react-icons" title="Delete">
                        <MdDelete />
                    </i>
                </a>
            </td>
        </>
    )
}

export default MestoDogadjaja;