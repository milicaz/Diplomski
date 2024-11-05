import { useLocation, useNavigate } from "react-router-dom";
import DogadjajContextProvider from "./DogadjajContext";
import DogadjajList from "./DogadjajList";

const DogadjajHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <DogadjajContextProvider navigate={navigate} location={location}>
      <>
        <DogadjajList />
      </>
    </DogadjajContextProvider>
  );
};

export default DogadjajHome;
