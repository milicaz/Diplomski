import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DogadjajContext = createContext();

const DogadjajContextProvider = (props) => {


    const [dogadjaji, setDogadjaji] = useState([])

    const [organizacijaId, setOrganizacijaId] = useState(null)

    useEffect(() => {
        getDogadjaji();
    }, [])

    useEffect(() => {
        if (organizacijaId !== null) {
          console.log("Organizacija id je: " + organizacijaId);
        }
      }, [organizacijaId]);

    const sortedDogadjaji = dogadjaji.sort((a, b) => a.id-b.id)

    const getDogadjaji = async () => {
        const { data } = await axios.get("http://localhost:8080/api/dogadjaji")
        setDogadjaji(data)
    }

    const addOrganizacija = async (addOrg) => {
        const response = await axios.post("http://localhost:8080/api/organizacije", addOrg)
        console.log("Response je: " + JSON.stringify(response))
        console.log("Response id je: " + JSON.stringify(response.data.id))
        setOrganizacijaId(response.data.id)
    }

    const addDogadjaj = async (addDog) => {
        await axios.post("http://localhost:8080/api/dogadjaji", addDog)
        getDogadjaji();
    }

    const editOrganizacija = async(id, editOrg) => {
        await axios.put(`http://localhost:8080/api/organizacije/${id}`, editOrg)
    }

    return (
        <DogadjajContext.Provider value={{sortedDogadjaji, addDogadjaj, addOrganizacija, editOrganizacija, organizacijaId}}>
            {props.children}
        </DogadjajContext.Provider>
    )
}

export default DogadjajContextProvider;