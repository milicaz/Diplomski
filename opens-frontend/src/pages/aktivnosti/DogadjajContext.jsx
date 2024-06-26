import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DogadjajContext = createContext();

const DogadjajContextProvider = (props) => {


    const [dogadjaji, setDogadjaji] = useState([])

    const [organizacijaId, setOrganizacijaId] = useState(null)

    const [currentOrganizacija, setCurrentOrganizacija] = useState({naziv: "", odgovornaOsoba: "", brojTelefona: "", email: "", delatnost: "", opis: "", link: ""})

    const [mestaDogadjaja, setMestaDogadjaja] = useState([])

    const [tipoviDogadjaja, setTipoviDogadjaja] = useState([])

    const [dogadjajId, setDogadjajId] = useState(null)

    useEffect(() => {
        getDogadjaji();
        getMesta();
        getTipovi();
        if (organizacijaId !== null) {
            console.log("Organizacija id je: " + organizacijaId);
          }
          if(dogadjajId !== null){
              console.log("Dogadjaj id je: " + dogadjajId);
          }
    }, [organizacijaId, currentOrganizacija, dogadjajId]);

    const sortedDogadjaji = dogadjaji.sort((a, b) => a.id-b.id)

    const getDogadjaji = async () => {
        const { data } = await axios.get("http://localhost:8080/api/dogadjaji")
        setDogadjaji(data)
    }

    const addOrganizacija = async (addOrg) => {
        const response = await axios.post("http://localhost:8080/api/organizacije", addOrg)
        setOrganizacijaId(response.data.id)
    }

    const addDogadjaj = async (addDog) => {
        const response = await axios.post("http://localhost:8080/api/dogadjaji", addDog)
        // console.log("Dpgadjaj id je: " + JSON.stringify(response.data.id))
        setDogadjajId(response.data.id)
        getDogadjaji();
        // setDogadjajId(null)
    }

    const editOrganizacija = async(id, editOrg) => {
        await axios.put(`http://localhost:8080/api/organizacije/${id}`, editOrg)
    }

    const getOrganizacijaById = async(id) => {
        const response = await axios.get(`http://localhost:8080/api/organizacije/${id}`)
        setCurrentOrganizacija(response.data)
    }

    // const deleteDogadjaj = async(id) => {
    //     await axios.put(`http://localhost:8080/api/dogadjaji/${id}`)
    // }

    const getMesta = async () => {
        const { data } = await axios.get("http://localhost:8080/api/mestaDogadjaja");
        setMestaDogadjaja(data)
    }

    const getTipovi = async() => {
        const {data} = await axios.get("http://localhost:8080/api/tipoviDogadjaja")
        setTipoviDogadjaja(data)
    }

    const dodajUcesnika = async(ucesnik, id) => {
        await axios.post(`http://localhost:8080/api/ucesniciDogadjaja/${id}`, ucesnik)
    }

    const kreirajPDF = async(mesec, godina, id, ime, prezime) => {
        try {

        const response = await axios.get(`http://localhost:8080/api/dogadjajiView/${mesec}/${godina}/${id}`, {
            params: {
                ime: ime,
                prezime: prezime
            },
            responseType: "blob"
        })

        // console.log(response.data)
        // Create a blob object from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dogadjajireport.pdf');

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // // Clean up
    // document.body.removeChild(link);

    link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
    }

    return (
        <DogadjajContext.Provider value={{sortedDogadjaji, addDogadjaj, addOrganizacija, editOrganizacija, organizacijaId, getOrganizacijaById, currentOrganizacija, mestaDogadjaja, tipoviDogadjaja, dogadjajId, dodajUcesnika, kreirajPDF}}>
            {props.children}
        </DogadjajContext.Provider>
    )
}

export default DogadjajContextProvider;