import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const LogoContext = createContext();

const LogoContextProvider = (props) => {
  const [base64, setBase64] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const result = await httpCommon.get("/logoi");
      setBase64(result.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching logoa: ", error);
      }
    }
  };

  const addLogo = async (file) => {
    try {
      const formData = new FormData();
      formData.append("imageFile", file);

      const response = await httpCommon.post("/logoi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška:", error);
        throw error;
      }
    }
    getImage();
  };

  const deleteLogo = async (id) => {
    try {
      await httpCommon.delete(`/logoi/${id}`);
      getImage();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja logoa: ", error);
      }
    }
  };

  return (
    <LogoContext.Provider value={{ base64, addLogo, deleteLogo }}>
      {props.children}
    </LogoContext.Provider>
  );
};

export default LogoContextProvider;
