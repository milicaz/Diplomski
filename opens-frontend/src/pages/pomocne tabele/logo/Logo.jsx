import { MdDelete, MdEdit } from "react-icons/md"

const Logo = ({logo}) => {
    return (
        <>
            <td>{logo.name}</td>
            <td>
                <button className="btn text-warning btn-act">
                    <MdEdit />
                </button>
                <button className="btn text-danger btn-act">
                    <MdDelete />
                </button>
            </td>
        </>
    )
}

export default Logo;