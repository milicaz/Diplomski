import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TipDogadjajaContext = createContext()

const TipDogadjajaContextProvider = (props) => {

    const [tipoviDogadjaja, setTipoviDogadjaja] = useState([
        // {id:'1', naziv: 'Eksterna aktivnost'},
        // {id:'2', naziv: 'Interna aktivnost'},
        // {id:'3', naziv: 'Kulturna stanica'}
    ])

    useEffect(() => {
        getTipovi();
    }, [])

    const sortedTipoviDogadjaja = tipoviDogadjaja.sort((a, b) => a.id - b.id)

    const getTipovi = async () => {
        const {data} = await axios.get("http://localhost:8080/api/tipoviDogadjaja")
        setTipoviDogadjaja(data)
    }

    const addTip = async (addTip) => {
        await axios.post("http://localhost:8080/api/tipoviDogadjaja", addTip)
        getTipovi();
    }

    const editTip = async (id, editTip) => {
        await axios.put(`http://localhost:8080/api/tipoviDogadjaja/${id}`, editTip)
        getTipovi();
    }

    const deleteTip = async (id) => {
        await axios.delete(`http://localhost:8080/api/tipoviDogadjaja/${id}`);
        getTipovi();
    }

    return (
        <TipDogadjajaContext.Provider value={{sortedTipoviDogadjaja, addTip, editTip, deleteTip}}>
            {props.children}
        </TipDogadjajaContext.Provider>
    )
}

export default TipDogadjajaContextProvider;