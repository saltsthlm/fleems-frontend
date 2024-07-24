import { useState } from "react";
import useApi from "../hooks/useApi";
import GapList from "./GapList";
import PageHeading from "./PageHeading";
import CardButton from "./CardButton";
import { Driver } from "../types/ApiResponses";
import Card from "./Card";
import FormButton from "./FormButton";
import Popup from "./Popup";
import EditDriverForm from "./EditDriverForm";

type DriversListProps = {
  callback: () => void;
};
export default function DriversList({ callback }: DriversListProps) {
  const [isViewingDriver, setIsViewingDriver] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver>();
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  const [isEditingDriver, setIsEditingDriver] = useState<boolean>(false);

  const { data, loading } = useApi("drivers");

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
        <PageHeading>
          <button onClick={() => setIsEditingDriver(false)}>
            &lt; Edit driver information
          </button>
        </PageHeading>
        <EditDriverForm />
      </>
    );
  }

  if (isViewingDriver && !!selectedDriver) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <PageHeading>
        <button onClick={callback}>&lt; Driver information</button>
      </PageHeading>
      <GapList>
        {loading ? (
          <p>Loading...</p>
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
    </>
  );
}
