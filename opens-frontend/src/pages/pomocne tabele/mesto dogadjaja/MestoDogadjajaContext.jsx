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

    const addMestoDogadjaja = async (mestoDogadjaja) => {
        await axios.post("http://localhost:8080/api/mestaDogadjaja", mestoDogadjaja)
        getMesta();
    }



    return (
        <MestoDogadjajaContext.Provider value={{mestaDogadjaja, addMestoDogadjaja}}>
            {props.children}
        </MestoDogadjajaContext.Provider>
    )

}

export default MestoDogadjajaContextProvider;