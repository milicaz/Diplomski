import axios from "axios";
import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";

export const MestoDogadjajaContext = createContext()

const MestoDogadjajaContextProvider = (props) => {

    const [mestaDogadjaja, setMestaDogadjaja] = useState([])

    useEffect(() => {
        getMesta();
    }, [])

    const getMesta = async () => {
        const { data } = await axios.get("http://localhost:8080/api/mestaDogadjaja");
        setMestaDogadjaja(data)
    }

    const addMestoDogadjaja = async (addMesto) => {
        await axios.post("http://localhost:8080/api/mestaDogadjaja", addMesto)
        getMesta();
    }

    const editMestoDogadjaja = async (id, editMesto) => {
        await axios.put(`http://localhost:8080/api/mestaDogadjaja/${id}`, editMesto);
        getMesta();
    }

    const deleteMestoDogadjaja = async(id) => {
        await axios.delete(`http://localhost:8080/api/mestaDogadjaja/${id}`);
        getMesta();
    }



    return (
        <MestoDogadjajaContext.Provider value={{mestaDogadjaja, addMestoDogadjaja, editMestoDogadjaja, deleteMestoDogadjaja}}>
            {props.children}
        </MestoDogadjajaContext.Provider>
    )

}

export default MestoDogadjajaContextProvider;