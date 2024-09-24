import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ZaposleniContext = createContext()

const ZaposleniContextProvider = (props) => {

    const [zap, setZap] = useState([])

    const [uloga, setUloga] = useState([])

    useEffect(() => {
        getZaposleni();
    }, []);

    const sortedZaposleni = zap.sort((a, b) => a.id-b.id)

    const getZaposleni = async () => {
        const {data} = await axios.get("http://localhost:8080/api/zaposleni")
        setZap(data)
    }

    const getUloge = async () => {
        const {data} = await axios.get("http://localhost:8080/api/uloge")
        setUloga(data)
        // console.log("Uloge su: " + uloga)
    }

    const registracija = async (zaposleni) => {
        const {data} = await axios.post("http://localhost:8080/api/auth/signup", zaposleni)
        getZaposleni();
    }

    const deleteZaposleni = async(id) => {
        await axios.delete(`http://localhost:8080/api/zaposleni/delete/${id}`);
        getZaposleni();
    }

    const editZaposleni = async(id, zaposleni) => {
        // await axios.put(`http://localhost:8080/api/zaposleni/${id}`, editZaposleni);
        // getZaposleni();
        try {
            await axios.put(`http://localhost:8080/api/zaposleni/${id}`, {
                email: zaposleni.email,
                ime: zaposleni.ime,
                prezime: zaposleni.prezime,
                rod: zaposleni.rod,
                godine: zaposleni.godine,
                mestoBoravista: zaposleni.mestoBoravista,
                brojTelefona: zaposleni.brojTelefona,
                uloge: zaposleni.uloge.map(role => ({ naziv: role })) // Format uloge correctly
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            getZaposleni(); // Refresh or fetch data after successful update
        } catch (error) {
            console.error('Error updating zaposleni:', error.response || error);
        }
    }

    return (
        <ZaposleniContext.Provider value={{sortedZaposleni, uloga, registracija, deleteZaposleni, editZaposleni}}>
            {props.children}
        </ZaposleniContext.Provider>
    )
}

export default ZaposleniContextProvider;