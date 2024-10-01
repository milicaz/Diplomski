import LogoContextProvider from "./LogoContext";
import LogoList from "./LogoList";

const LogoHome = () => {
  return (
    <LogoContextProvider>
      <>
        <LogoList />
      </>
    </LogoContextProvider>
  );
};

export default LogoHome;
