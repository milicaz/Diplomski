import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PrigradskaNaseljaContext = createContext()

const PrigradskaNaseljaContextProvider = (props) => {

    const [prigradskaNaselja, setPrigradskaNaselja] = useState([])

    useEffect(() => {
        getNaselje();
    }, [])

    const sortedPrigradskaNaselja = prigradskaNaselja.sort((a, b) => a.id-b.id)

    const getNaselje = async () => {
        const {data} = await axios.get("http://localhost:8080/api/prigradskaNaselja")
        setPrigradskaNaselja(data)
    }

    const addNaselje = async (addNaselje) => {
        await axios.post("http://localhost:8080/api/prigradskaNaselja", addNaselje)
        getNaselje();
    }

    const editNaselje = async (id, editNaselje) => {
        await axios.put(`http://localhost:8080/api/prigradskaNaselja/${id}`, editNaselje)
        getNaselje();
    }

    const deleteNaselje = async (id) => {
        await axios.delete(`http://localhost:8080/api/prigradskaNaselja/${id}`)
        getNaselje();
    }

    return (
        <PrigradskaNaseljaContext.Provider value={{sortedPrigradskaNaselja, addNaselje, editNaselje, deleteNaselje}}> 
            {props.children}
        </PrigradskaNaseljaContext.Provider>
    )
}

export default PrigradskaNaseljaContextProvider;