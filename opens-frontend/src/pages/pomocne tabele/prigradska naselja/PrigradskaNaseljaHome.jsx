import { useLocation, useNavigate } from "react-router-dom";
import PrigradskaNaseljaContextProvider from "./PrigradskaNaseljaContext";
import PrigradskaNaseljaList from "./PrigradskaNaseljaList";

const PrigradskaNaseljaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <PrigradskaNaseljaContextProvider navigate={navigate} location={location}>
      <>
        <PrigradskaNaseljaList />
      </>
    </PrigradskaNaseljaContextProvider>
  );
};

export default PrigradskaNaseljaHome;
