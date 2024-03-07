import React from "react";
import OpremaContextProvider from "./OpremaContext";
import OpremaTabela from "./OpremaTabela";

export const OpremaHome = () => {
  return (
    <OpremaContextProvider>
      <>
        <OpremaTabela />
      </>
    </OpremaContextProvider>
  );
};
export default OpremaHome;
