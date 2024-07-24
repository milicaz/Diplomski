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

    return (
        <ZaposleniContext.Provider value={{sortedZaposleni, uloga, registracija}}>
            {props.children}
        </ZaposleniContext.Provider>
    )
}

export default ZaposleniContextProvider;