import TipOpremeContextProvider from "./TipOpremeContext";
import TipOpremeList from "./TipOpremeList";

const TipOpremeHome = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <TipOpremeContextProvider>
            <TipOpremeList />
          </TipOpremeContextProvider>
        </div>
      </div>
    </div>
  );
};

export default TipOpremeHome;
