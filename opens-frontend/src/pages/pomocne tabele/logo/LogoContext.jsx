import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {Buffer} from 'buffer';

export const LogoContext = createContext()

const LogoContextProvider = (props) => {
    
    const [base64, setBase64] = useState();

    useEffect(() => {
        // axios.get("http://localhost:8080/api/logoi/pic",
        // {
        //   responseType: "arraybuffer",
        // }
        //   )
        //   .then((response) =>
        //     setBase64(Buffer.from(response.data, "binary").toString("base64"))
        //   );
        getImage();
      }, []);

    const getImage = async () => {
        const result = await axios.get("http://localhost:8080/api/logoi/picByte");
        setBase64('data:image/jpeg;base64,' + result.data)
        // console.log("Data je " + JSON.stringify(data))
    }

    return(
        <LogoContext.Provider value={{base64}}>
            {props.children}
        </LogoContext.Provider>
    )

}

export default LogoContextProvider;