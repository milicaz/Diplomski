import MestoPoseteContextProvider from "./MestoPoseteContext";
import MestoPoseteList from "./MestoPoseteList";

const MestoPoseteHome = () => {

    return (
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <MestoPoseteContextProvider>
                <MestoPoseteList />
              </MestoPoseteContextProvider>
            </div>
          </div>
        </div>
    )
}

export default MestoPoseteHome;