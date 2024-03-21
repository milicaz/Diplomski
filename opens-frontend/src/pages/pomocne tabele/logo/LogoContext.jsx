import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LogoContext = createContext()

const LogoContextProvider = (props) => {
    console.log("Logo context provider")
    const [logoi, setLogoi] = useState([])

    useEffect(() => {
        getLogoi();
    }, [])

    const sortedLogo = logoi.sort((a, b) => a.id - b.id)

    const getLogoi = async () => {
        const {data} = await axios.get("http://localhost:8080/api/logoi")
        console.log("Logoi su: " + data)
        setLogoi(data)
    }

    return(
        <LogoContextProvider value={{sortedLogo}}>
            {props.children}
        </LogoContextProvider>
    )

}

export default LogoContextProvider;