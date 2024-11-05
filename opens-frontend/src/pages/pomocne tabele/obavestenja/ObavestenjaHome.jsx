import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ObavestenjeContextProvider from "./ObavestenjaContext";
import ObavestenjaList from "./ObavestenjaList";

export const ObavestenjaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ObavestenjeContextProvider navigate={navigate} location={location}>
      <>
        <ObavestenjaList />
      </>
    </ObavestenjeContextProvider>
  );
};

export default ObavestenjaHome;
