import { createContext, useState } from "react";

export const MestoPoseteContext = createContext();

const MestoPoseteContextProvider = (props) => {

    const [mestaPosete, setMestaPosete] = useState([
        {id:'1', naziv: 'Co-working', ukupanBrojMesta: '50'},
        {id:'2', naziv: 'Omladinski klub', ukupanBrojMesta: '10'}
    ])

    return (
        <MestoPoseteContext.Provider value={{mestaPosete}}>
            {props.children}
        </MestoPoseteContext.Provider>
    )
}

export default MestoPoseteContextProvider;