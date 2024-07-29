// import { useState } from "react";
// import CardButton from "../../components/CardButton";
// import GapList from "../../components/GapList";
// import PageHeading from "../../components/PageHeading";
// import PageWithNavigation from "../../components/PageWithNavigation";
// import CreateDriverForm from "./components/CreateDriverForm";
// import DriversList from "./components/DriversList";
// import Table from "../../components/Table";

// export default function DriversPage() {
//   const [creatingDriver, setCreatingDriver] = useState<boolean>(false);
//   const [showingDrivers, setShowingDrivers] = useState<boolean>(false);

//   const resetPage = () => {
//     setShowingDrivers(false);
//     setCreatingDriver(false);
//   };

//   const createDriver = () => {
//     setShowingDrivers(false);
//     setCreatingDriver(true);
//     console.log("Creating driver...");
//   };

//   const showDrivers = () => {
//     setCreatingDriver(false);
//     setShowingDrivers(true);
//   };

//   return (
//     <PageWithNavigation>
//       {!creatingDriver && !showingDrivers && (
//         <>
//           <PageHeading>Drivers</PageHeading>
//           <GapList>
//             <CardButton onClick={createDriver}>+ Add new driver</CardButton>
//             <CardButton onClick={showDrivers}>Driver information</CardButton>
//           </GapList>
//         </>
//       )}
//       {creatingDriver && (
//         <>
//           <PageHeading>
//             <button onClick={resetPage}>&lt; Add a new Driver</button>
//           </PageHeading>
//           <GapList>
//             <CreateDriverForm />
//           </GapList>
//         </>
//       )}
//       {showingDrivers && <DriversList callback={resetPage} />}
//     </PageWithNavigation>
//   );
// }


import { useState } from "react";
import useApi from "../../hooks/useApi";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import CardButton from "../../components/CardButton";
import { Driver } from "../../types/ApiResponses";
import Card from "../../components/Card";
import FormButton from "../../components/FormButton";
import Popup from "../../components/Popup";
import Throbber from "../../components/Throbber";
import EditDriverForm from "./components/EditDriverForm";
import PageWithNavigation from "../../components/PageWithNavigation";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import SearchBar from "../../components/SearchBar";

type DriversListProps = {
  callback: () => void;
};
export default function DriversList({ callback }: DriversListProps) {
  const [isViewingDriver, setIsViewingDriver] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver>();
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  const [isEditingDriver, setIsEditingDriver] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('information');
  const [searchFilter, setSearchFilter] = useState<string>();
  
  const { data, isLoading, error } = useApi("drivers");

  const editDriver = (driver: Driver) => {
    setIsEditingDriver(true);
    setIsShowingPopup(false);
    console.log(driver);
  };

  const viewDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsViewingDriver(true);
  };

  const viewList = () => {
    setIsViewingDriver(false);
  };

  if (isEditingDriver) {
    return (
      <>
      <PageWithNavigation>
      <PageHeading>
          <button onClick={() => setIsEditingDriver(false)}>
            &lt; Edit driver information
          </button>
        </PageHeading>
        <EditDriverForm />
      </PageWithNavigation>
       
      </>
    );
  }

  if (isViewingDriver && !!selectedDriver) {
    return (
      <>
      <PageWithNavigation>
        <PageHeading>
          <button onClick={viewList}>&lt; Driver information</button>
        </PageHeading>
        {isShowingPopup && (
          <Popup>
            <Card className="bg-tertiary w-full p-12">
              <h1 className="text-center">
                Are you sure you would like to delete this driver?
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
          <img src={selectedDriver.photo} className="rounded-lg" />
          <h1 className="text-xl">{selectedDriver.name}</h1>
          <h2>License: {selectedDriver.licenseNumber}</h2>
          <h2>Mobile: {selectedDriver.phoneNumber}</h2>
          <h2>Address: {selectedDriver.emailAddress}</h2>
          <h2>Email: {selectedDriver.emailAddress}</h2>
        </Card>
        <div className="flex flex-col py-7 gap-4 items-center">
          <FormButton
            onClick={() => editDriver(selectedDriver)}
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
        <PageHeading>
          <button onClick={callback}>&lt; Driver information</button>
        </PageHeading>
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
      <PageHeading>
        <button onClick={callback}>&lt; Driver information</button>
      </PageHeading>
      <SecondaryNavigation onTabChange={setActiveTab} activeTab={activeTab} />
      <SearchBar
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search drivers"
        />
      <GapList>
        {isLoading ? (
          <Throbber />
        ) : (
          data?.map((driver) => (
            <CardButton
              key={driver.id}
              className="flex flex-row text-left"
              isCentered={false}
              onClick={() => viewDriver(driver)}
            >
              <img src={driver.photo} className="w-24 rounded-lg" />
              <div>
                <h1 className="text-xl">{driver.name}</h1>
                <p>License: {driver.licenseNumber}</p>
                <p>Mobile: {driver.phoneNumber}</p>
              </div>
            </CardButton>
          ))
        )}
      </GapList>
      </PageWithNavigation>
    </>
  );
}
