import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LogoContext = createContext()

const LogoContextProvider = (props) => {
    
    const [base64, setBase64] = useState([]);

    useEffect(() => {
        getImage();
      }, []);

    const getImage = async () => {

        const result = await axios.get("http://localhost:8080/api/logoi");
        setBase64(result.data)
    }

    const addLogo = async(file) => {

        try {
            const formData = new FormData();
            formData.append("imageFile", file);
            
            const response = await axios.post("http://localhost:8080/api/logoi", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            
            return response.data;
          } catch (error) {
                console.error("Greška:", error);
            throw error;
          }
        getImage();
    }

    const deleteLogo = async(id) => {
        await axios.delete(`http://localhost:8080/api/logoi/${id}`);
        getImage();
    }

    return(
        <LogoContext.Provider value={{base64, addLogo, deleteLogo}}>
            {props.children}
        </LogoContext.Provider>
    )

}

export default LogoContextProvider;