import { createContext, useState } from "react";

export const PrigradskaNaseljaContext = createContext()

const PrigradskaNaseljaContextProvider = (props) => {

    const [prigradskaNaselja, setPrigradskaNaselja] = useState([
        {id:'1', naziv: 'Temerin'},
        {id:'2', naziv: 'Veternik'},
        {id:'3', naziv: 'Futog'},
        {id:'4', naziv: 'Rumenka'}
    ])

    return (
        <PrigradskaNaseljaContext.Provider value={{prigradskaNaselja}}> 
            {props.children}
        </PrigradskaNaseljaContext.Provider>
    )
}

export default PrigradskaNaseljaContextProvider;