import TipOprContextProvider from "./TipOprContext";
import TipOprList from "./TipOprList";

const TipOprHome = () => {

    return (
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <TipOprContextProvider>
                <TipOprList />
              </TipOprContextProvider>
            </div>
          </div>
        </div>
      );
}

export default TipOprHome;