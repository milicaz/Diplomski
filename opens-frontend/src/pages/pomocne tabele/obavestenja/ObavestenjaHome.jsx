import React from "react";
import ObavestenjeContextProvider from "./ObavestenjaContext";
import ObavestenjaList from "./ObavestenjaList";

export const ObavestenjaHome = () => {
  return (
    <ObavestenjeContextProvider>
      <>
        <ObavestenjaList />
      </>
    </ObavestenjeContextProvider>
  );
};

export default ObavestenjaHome;
