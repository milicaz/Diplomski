import { createContext, useState } from "react";

export const DogadjajContext = createContext();

const DogadjajContextProvider = (props) => {

    const [dogadjaji, setDogadjaji] = useState([
        {id:'1', naziv: 'Dogadjaj 1', datum: '12.12.2023.', mesto: 'Konferencijska Sala', vrsta: 'Eksterna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'2', naziv: 'Dogadjaj 2', datum: '12.12.2023.', mesto: 'Podcast', vrsta: 'Interna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'3', naziv: 'Dogadjaj 3', datum: '09.01.2024.', mesto: 'Konferencijska Sala', vrsta: 'Interna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'4', naziv: 'Dogadjaj 4', datum: '09.01.2024.', mesto: 'Konferencijska Sala', vrsta: 'Eksterna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'5', naziv: 'Dogadjaj 5', datum: '15.01.2024.', mesto: 'Multimedijalna Sala', vrsta: 'Kulturna stanica', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'},
        {id:'6', naziv: 'Dogadjaj 6', datum: '15.01.2024.', mesto: 'Podcast', vrsta: 'Interna aktivnost', pocetakDogadjaja: '12:00', krajDogadjaja: '14:00'}

    ])

    return (
        <DogadjajContext.Provider value={{dogadjaji}}>
            {props.children}
        </DogadjajContext.Provider>
    )
}

export default DogadjajContextProvider;