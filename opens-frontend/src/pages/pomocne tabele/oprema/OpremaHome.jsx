import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OpremaContextProvider from "./OpremaContext";
import OpremaTabela from "./OpremaTabela";

export const OpremaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <OpremaContextProvider navigate={navigate} location={location}>
      <>
        <OpremaTabela />
      </>
    </OpremaContextProvider>
  );
};

export default OpremaHome;
