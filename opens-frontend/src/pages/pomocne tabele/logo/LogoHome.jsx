import { useLocation, useNavigate } from "react-router-dom";
import LogoContextProvider from "./LogoContext";
import LogoList from "./LogoList";

const LogoHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <LogoContextProvider navigate={navigate} location={location}>
      <>
        <LogoList />
      </>
    </LogoContextProvider>
  );
};

export default LogoHome;
