import { createContext, useState } from "react";

export const TipDogadjajaContext = createContext()

const TipDogadjajaContextProvider = (props) => {

    const [tipoviDogadjaja, setTipoviDogadjaja] = useState([
        {id:'1', naziv: 'Eksterna aktivnost'},
        {id:'2', naziv: 'Interna aktivnost'},
        {id:'3', naziv: 'Kulturna stanica'}
    ])

    return (
        <TipDogadjajaContext.Provider value={{tipoviDogadjaja}}>
            {props.children}
        </TipDogadjajaContext.Provider>
    )
}

export default TipDogadjajaContextProvider;