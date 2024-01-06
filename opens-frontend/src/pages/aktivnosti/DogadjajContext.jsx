import { createContext, useState } from "react";

export const DogadjajContext = createContext();

const DogadjajContextProvider = (props) => {

    const [dogadjaji, setDogadjaji] = useState([
        {id:'1', naziv: 'Dogadjaj 1', datum: '12.12.2023.', mesto: 'Konferencijska Sala', vrsta: 'Eksterna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'2', naziv: 'Dogadjaj 1', datum: '12.12.2023.', mesto: 'Konferencijska Sala', vrsta: 'Eksterna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'3', naziv: 'Dogadjaj 1', datum: '12.12.2023.', mesto: 'Konferencijska Sala', vrsta: 'Eksterna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'4', naziv: 'Dogadjaj 1', datum: '12.12.2023.', mesto: 'Konferencijska Sala', vrsta: 'Eksterna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'}

    ])

    return (
        <DogadjajContext.Provider value={{dogadjaji}}>
            {props.children}
        </DogadjajContext.Provider>
    )
}

export default DogadjajContextProvider;