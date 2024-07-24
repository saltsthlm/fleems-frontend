import { useState } from "react";
import useApi from "../hooks/useApi";
import GapList from "./GapList";
import PageHeading from "./PageHeading";
import CardButton from "./CardButton";
import { Vehicle } from "../types/ApiResponses";
import Card from "./Card";
import FormButton from "./FormButton";
import Popup from "./Popup";
import EditTruckForm from "./EditTruckForm";

type TrucksListProps = {
  callback: () => void;
};
export default function TrucksList({ callback }: TrucksListProps) {
  const [isViewingTruck, setIsViewingTruck] = useState<boolean>(false);
  const [selectedTruck, setSelectedTruck] = useState<Vehicle>();
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  const [isEditingTruck, setIsEditingTruck] = useState<boolean>(false);

  const { data, loading } = useApi("vehicles");

  const editTruck = (vehicle: Vehicle) => {
    setIsEditingTruck(true);
    setIsShowingPopup(false);
    console.log(vehicle);
  };

  const viewTruck = (vehicle: Vehicle) => {
    setSelectedTruck(vehicle);
    setIsViewingTruck(true);
  };

  const viewList = () => {
    setIsViewingTruck(false);
  };

  if (isEditingTruck) {
    return (
      <>
        <PageHeading>
          <button onClick={() => setIsEditingTruck(false)}>
            &lt; Edit truck information
          </button>
        </PageHeading>
        <EditTruckForm />
      </>
    );
  }

  if (isViewingTruck && !!selectedTruck) {
    return (
      <>
        <PageHeading>
          <button onClick={viewList}>&lt; Truck information</button>
        </PageHeading>
        {isShowingPopup && (
          <Popup>
            <Card className="bg-tertiary w-full p-12">
              <h1 className="text-center">
                Are you sure you would like to delete this truck?
              </h1>
              <div className="flex gap-4 justify-between [&>button]:grow">
                <FormButton
                  onClick={() => setIsShowingPopup(false)}
                  className="text-danger"
                  overrideColor
                >
                  YES
                </FormButton>
                <FormButton onClick={() => setIsShowingPopup(false)}>
                  NO
                </FormButton>
              </div>
            </Card>
          </Popup>
        )}
        <Card className="text-center">
          <h1 className="text-xl">{selectedTruck.licenseNumber}</h1>
          <h2>Model: {selectedTruck.model}</h2>
          <h2>Payload: {selectedTruck.payload}</h2>
          <h2>Weight: {selectedTruck.weight}</h2>
          <h2>Height: {selectedTruck.height}</h2>
          <h2>Length: {selectedTruck.length}</h2>
        </Card>
        <div className="flex flex-col py-7 gap-4 items-center">
          <FormButton
            onClick={() => editTruck(selectedTruck)}
            className="w-3/5"
          >
            EDIT
          </FormButton>
          <FormButton
            onClick={() => setIsShowingPopup(true)}
            className="w-3/5 text-danger"
            overrideColor
          >
            DELETE
          </FormButton>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeading>
        <button onClick={callback}>&lt; Truck information</button>
      </PageHeading>
      <GapList>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data?.map((truck) => (
            <CardButton
              key={truck.id}
              className="flex flex-row text-left"
              isCentered={false}
              onClick={() => viewTruck(truck)}
            >
              <div>
                <h1 className="text-xl">{truck.licenseNumber}</h1>
                <p>Model: {truck.model}</p>
                <p>Payload: {truck.payload}</p>
              </div>
            </CardButton>
          ))
        )}
      </GapList>
    </>
  );
}