import { useState, useMemo } from "react";
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
import useScreenType from "../../hooks/useScreenType";

export default function DriversList() {
  const [isViewingDriver, setIsViewingDriver] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver>();
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  const [isEditingDriver, setIsEditingDriver] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("information");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const { isMobile } = useScreenType();
  const { data, isLoading, error } = useApi("drivers");

  const filteredData = useMemo(() => {
    if (!searchFilter) return data;
    return data?.filter(
      (driver) =>
        driver.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        driver.licenseNumber
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        driver.phoneNumber.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [data, searchFilter]);

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
      <PageWithNavigation>
        <PageHeading>
          <button onClick={() => setIsEditingDriver(false)}>
            &lt; Edit driver information
          </button>
        </PageHeading>
        <EditDriverForm />
      </PageWithNavigation>
    );
  }

  if (isViewingDriver && !!selectedDriver) {
    return (
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
    );
  }

  return (
    <PageWithNavigation>
      <PageHeading>Drivers</PageHeading>
      <SecondaryNavigation
        onTabChange={setActiveTab}
        activeTab={activeTab}
        parentRoute="/drivers"
      />
      <SearchBar value={searchFilter} callback={setSearchFilter} />
      <div className="relative flex flex-col gap-4">
        <GapList className="grid-cols-4">
          {isLoading && <Throbber />}
          {error && <h1>An error occurred: {error.message}</h1>}
          {!isLoading &&
            !error &&
            filteredData?.map((driver) => (
              <CardButton
                key={driver.id}
                className={`${isMobile ? "flex flex-row text-left" : "flex flex-col items-center"}`}
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
            ))}
        </GapList>
        <FormButton
          className={`sticky ${isMobile ? "bottom-20" : "bottom-0"} w-full mx-auto drop-shadow-strong`}
        >
         + ADD DRIVER
        </FormButton>
      </div>
    </PageWithNavigation>
  );
}
