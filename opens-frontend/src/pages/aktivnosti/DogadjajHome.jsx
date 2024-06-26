import DogadjajContextProvider from "./DogadjajContext";
import DogadjajList from "./DogadjajList";

const DogadjajHome = () => {
  return (
    // <div className="container-xl">
    //   <div className="table-responsive">
    //     <div className="table-wrapper">
          <DogadjajContextProvider>
            <>              
            <DogadjajList />
            </>
          </DogadjajContextProvider>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DogadjajHome;
