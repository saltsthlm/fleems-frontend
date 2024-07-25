import { useState } from "react";
import CardButton from "../../components/CardButton";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import TrucksList from "./components/TrucksList";
import CreateTruckForm from "./components/CreateTruckForm";

export default function VehiclesPage() {
  const [creatingTruck, setCreatingTruck] = useState<boolean>(false);
  const [showingTruck, setShowingTruck] = useState<boolean>(false);

  const resetPage = () => {
    setShowingTruck(false);
    setCreatingTruck(false);
  };

  const createTruck = () => {
    setShowingTruck(false);
    setCreatingTruck(true);
    console.log("Creating driver...");
  };

  const showTruck = () => {
    setCreatingTruck(false);
    setShowingTruck(true);
  };

  return (
    <PageWithNavigation>
      {!creatingTruck && !showingTruck && (
        <>
          <PageHeading>Vehicles</PageHeading>
          <GapList>
            <CardButton onClick={createTruck}>+ Add new truck</CardButton>
            <CardButton onClick={showTruck}>Fleet information</CardButton>
          </GapList>
        </>
      )}
      {creatingTruck && (
        <>
          <PageHeading>
            <button onClick={resetPage}>&lt; Add a new Truck</button>
          </PageHeading>
          <GapList>
            <CreateTruckForm />
          </GapList>
        </>
      )}
      {showingTruck && <TrucksList callback={resetPage} />}
    </PageWithNavigation>
  );
}
