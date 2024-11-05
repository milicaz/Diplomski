import { useLocation, useNavigate } from "react-router-dom";
import TipDogadjajaContextProvider from "./TipDogadjajaContext";
import TipDogadjajaList from "./TipDogadjajaList";

const TipDogadjajaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TipDogadjajaContextProvider navigate={navigate} location={location}>
      <>
        <TipDogadjajaList />
      </>
    </TipDogadjajaContextProvider>
  );
};

export default TipDogadjajaHome;
