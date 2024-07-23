import { useState } from "react";
import CardButton from "../components/CardButton";
import GapList from "../components/GapList";
import PageHeading from "../components/PageHeading";
import PageWithNavigation from "../components/PageWithNavigation";
import CreateDriverForm from "../components/CreateDriverForm";

export default function DriversPage() {
  const [creatingDriver, setCreatingDriver] = useState<boolean>(false);
  const [showingDrivers, setShowingDrivers] = useState<boolean>(false);

  const resetPage = () => {
    setShowingDrivers(false);
    setCreatingDriver(false);
  };

  const createDriver = () => {
    setShowingDrivers(false);
    setCreatingDriver(true);
    console.log("Creating driver...");
  };

  const showDrivers = () => {
    setCreatingDriver(false);
    setShowingDrivers(true);
  };

  return (
    <PageWithNavigation>
      {!creatingDriver && !showingDrivers && (
        <>
          <PageHeading>Drivers</PageHeading>
          <GapList>
            <CardButton onClick={createDriver}>+ Add new driver</CardButton>
            <CardButton onClick={showDrivers}>Driver information</CardButton>
          </GapList>
        </>
      )}
      {creatingDriver && (
        <>
          <PageHeading>
            <button onClick={resetPage}>&lt; Add a new Driver</button>
          </PageHeading>
          <GapList>
            <CreateDriverForm />
          </GapList>
        </>
      )}
      {showingDrivers && (
        <>
          <PageHeading>
            <button onClick={resetPage}>&lt; Driver information</button>
          </PageHeading>
          <GapList>
            <h1>Driver</h1>
          </GapList>
        </>
      )}
    </PageWithNavigation>
  );
}
