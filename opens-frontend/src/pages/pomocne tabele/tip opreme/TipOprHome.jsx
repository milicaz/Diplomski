import { useLocation, useNavigate } from "react-router-dom";
import TipOprContextProvider from "./TipOprContext";
import TipOprList from "./TipOprList";

const TipOprHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TipOprContextProvider navigate={navigate} location={location}>
      <>
        <TipOprList />
      </>
    </TipOprContextProvider>
  );
};

export default TipOprHome;
