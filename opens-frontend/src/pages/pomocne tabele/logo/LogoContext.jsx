import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LogoContext = createContext()

const LogoContextProvider = (props) => {
    
    const [base64, setBase64] = useState();

    useEffect(() => {
        getImage();
      }, []);

    const getImage = async () => {
        const result = await axios.get("http://localhost:8080/api/logoi/picByte");
        setBase64('data:image/jpeg;base64,' + result.data)
    }

    return(
        <LogoContext.Provider value={{base64}}>
            {props.children}
        </LogoContext.Provider>
    )

}

export default LogoContextProvider;