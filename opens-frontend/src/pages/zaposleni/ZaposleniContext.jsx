import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ZaposleniContext = createContext()

const ZaposleniContextProvider = (props) => {

    const [zap, setZap] = useState([])

    useEffect(() => {
        getZaposleni();
    }, []);

    const sortedZaposleni = zap.sort((a, b) => a.id-b.id)

    const getZaposleni = async () => {
        const {data} = await axios.get("http://localhost:8080/api/zaposleni")
        setZap(data)
        console.log("Zaposleni context je: " + zap)
    }

    return (
        <ZaposleniContext.Provider value={{sortedZaposleni}}>
            {props.children}
        </ZaposleniContext.Provider>
    )
}

export default ZaposleniContextProvider;