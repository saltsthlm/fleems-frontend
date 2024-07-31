import { useMemo, useState } from "react";
import useApi from "../../hooks/useApi";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import CardButton from "../../components/CardButton";
import { Vehicle } from "../../types/ApiResponses";
import Card from "../../components/Card";
import FormButton from "../../components/FormButton";
import Popup from "../../components/Popup";

import Throbber from "../../components/Throbber";
import Table from "../../components/Table";
import EditTruckForm from "./components/EditTruckForm";
import PageWithNavigation from "../../components/PageWithNavigation";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import SearchBar from "../../components/SearchBar";
import useScreenType from "../../hooks/useScreenType";

export default function TrucksList() {
  const [isViewingTruck, setIsViewingTruck] = useState<boolean>(false);
  const [selectedTruck, setSelectedTruck] = useState<Vehicle>();
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  const [isEditingTruck, setIsEditingTruck] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("information");
  const [searchFilter, setSearchFilter] = useState<string>();

  const { isMobile } = useScreenType();

  const { data, isLoading, error } = useApi("vehicles");

  const filteredData = useMemo(() => {
    if (!searchFilter) return data;
    return data?.filter(
      (truck) =>
        truck.licenseNumber
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        truck.model.toLowerCase().includes(searchFilter.toLowerCase()) ||
        truck.payload.toString().includes(searchFilter.toLowerCase())
    );
  }, [data, searchFilter]);

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
        <PageWithNavigation>
          <PageHeading>
            <button onClick={() => setIsEditingTruck(false)}>
              &lt; Edit truck information
            </button>
          </PageHeading>
          <EditTruckForm />
        </PageWithNavigation>
      </>
    );
  }

  if (isViewingTruck && !!selectedTruck) {
    return (
      <>
        <PageWithNavigation>
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
          <Card className={`text-center ${isMobile ? "" : "w-2/5 mx-auto"}`}>
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
        </PageWithNavigation>
      </>
    );
  }

  if (isLoading || error) {
    return (
      <>
        <PageWithNavigation>
          <PageHeading>Vehicles</PageHeading>
          <GapList>
            {isLoading && <Throbber />}
            {error && <h1>An error ocurred: {error.message}</h1>}
          </GapList>
        </PageWithNavigation>
      </>
    );
  }

  return (
    <>
      <PageWithNavigation>
        <PageHeading>Vehicles</PageHeading>
        <SecondaryNavigation
          onTabChange={setActiveTab}
          activeTab={activeTab}
          parentRoute="/vehicles"
        />
        {isMobile && (
          <>
            <SearchBar value={searchFilter} callback={setSearchFilter} />
            <GapList className="grid-cols-2">
              {filteredData?.map((truck) => (
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
              ))}
            </GapList>
          </>
        )}
        {!isMobile && data !== undefined && (
          <div className="mt-6">
            <Table callback={(a) => viewTruck(a)} data={data} />
          </div>
          
        )}
      </PageWithNavigation>
    </>
  );
}
