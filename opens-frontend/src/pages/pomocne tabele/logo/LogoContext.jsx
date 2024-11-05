import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const LogoContext = createContext();

const LogoContextProvider = ({ children, navigate, location }) => {
  const [base64, setBase64] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getImage(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const getImage = async (isMounted, controller) => {
    try {
      const result = await httpProtected.get("/logoi", {
        signal: controller.signal,
      });
      if (isMounted) {
        setBase64(result.data);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === "File size exceeds limit!"
      ) {
        throw new Error("File size exceeds limit!");
      }
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching logoa: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addLogo = async (file) => {
    const controller = new AbortController();
    try {
      const formData = new FormData();
      formData.append("imageFile", file);

      await httpProtected.post("/logoi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal,
      });
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("An error occurred while fetching logos: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteLogo = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/logoi/${id}`, {
        signal: controller.signal,
      });
      getImage(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja logoa: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <LogoContext.Provider value={{ base64, getImage, addLogo, deleteLogo }}>
      {children}
    </LogoContext.Provider>
  );
};

export default LogoContextProvider;
