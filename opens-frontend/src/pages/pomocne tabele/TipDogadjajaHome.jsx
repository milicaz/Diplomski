import TipDogadjajaContextProvider from "./TipDogadjajaContext";
import TipDogadjajaList from "./TipDogadjajaList";

const TipDogadjajaHome = () => {

    return (
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <TipDogadjajaContextProvider>
                <TipDogadjajaList />
              </TipDogadjajaContextProvider>
            </div>
          </div>
        </div>
    )
}

export default TipDogadjajaHome;