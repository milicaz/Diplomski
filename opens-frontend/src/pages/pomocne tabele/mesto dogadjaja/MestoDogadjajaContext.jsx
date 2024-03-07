import { createContext, useState } from "react";

export const MestoDogadjajaContext = createContext()

const MestoDogadjajaContextProvider = (props) => {

    const [mestaDogadjaja, setMestaDogadjaja] = useState([
        {id:'1', nazivSale: 'Konferencijska Sala'},
        {id:'2', nazivSale: 'Multimedijalna Sala'},
        {id:'3', nazivSale: 'Podcast'}
    ])

    return (
        <MestoDogadjajaContext.Provider value={{mestaDogadjaja}}>
            {props.children}
        </MestoDogadjajaContext.Provider>
    )

}

export default MestoDogadjajaContextProvider;