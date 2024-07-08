import { useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const Zaposleni = ({zaposleni}) => {

    useEffect(() => {

    }, [zaposleni])

    return (
        <>
           <td>{zaposleni.email}</td> 
           <td>{zaposleni.ime}</td>
           <td>{zaposleni.prezime}</td>
           <td>{zaposleni.rod}</td>
           <td>{zaposleni.godine}</td>
           <td>{zaposleni.brojTelefona}</td>
           {/* <td>{zaposleni.uloge}</td> */}
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

export default Zaposleni;