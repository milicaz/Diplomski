import DogadjajContextProvider from "./DogadjajContext";
import DogadjajList from "./DogadjajList";

const DogadjajHome = () => {
  return (
    <DogadjajContextProvider>
      <>
        <DogadjajList />
      </>
    </DogadjajContextProvider>
  );
};

export default DogadjajHome;
