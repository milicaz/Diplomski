import { createContext, useEffect, useState } from "react";

export const MestoDogadjajaContext = createContext()

const MestoDogadjajaContextProvider = (props) => {

    const [mestaDogadjaja, setMestaDogadjaja] = useState([
        // {id:'1', nazivSale: 'Konferencijska Sala'},
        // {id:'2', nazivSale: 'Multimedijalna Sala'},
        // {id:'3', nazivSale: 'Podcast'}
    ])

    useEffect(() => {
        fetch('http://localhost:8080/api/mestaDogadjaja')
        .then(response => response.json())
        .then(data => setMestaDogadjaja(data))
        .catch(error => console.error('Error fetching mesta dogadjaja:', error));
    })

    return (
        <MestoDogadjajaContext.Provider value={{mestaDogadjaja}}>
            {props.children}
        </MestoDogadjajaContext.Provider>
    )

}

export default MestoDogadjajaContextProvider;