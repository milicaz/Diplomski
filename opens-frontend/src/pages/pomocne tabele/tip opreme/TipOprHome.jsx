import TipOprContextProvider from "./TipOprContext";
import TipOprList from "./TipOprList";

const TipOprHome = () => {
  return (
    <TipOprContextProvider>
      <>
        <TipOprList />
      </>
    </TipOprContextProvider>
  );
};

export default TipOprHome;
