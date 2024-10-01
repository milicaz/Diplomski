import TipDogadjajaContextProvider from "./TipDogadjajaContext";
import TipDogadjajaList from "./TipDogadjajaList";

const TipDogadjajaHome = () => {
  return (
    <TipDogadjajaContextProvider>
      <>
        <TipDogadjajaList />
      </>
    </TipDogadjajaContextProvider>
  );
};

export default TipDogadjajaHome;
