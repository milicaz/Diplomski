import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {Buffer} from 'buffer';

export const LogoContext = createContext()

const LogoContextProvider = (props) => {
    
    const [base64, setBase64] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/api/logoi/picByte",
        {
          responseType: "arraybuffer",
        }
          )
          .then((response) =>
            setBase64(Buffer.from(response.data, "binary").toString("base64"))
          );
      }, []);

    return(
        <LogoContext.Provider value={{base64}}>
            {props.children}
        </LogoContext.Provider>
    )

}

export default LogoContextProvider;