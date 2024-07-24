import { useState } from "react";
import useApi from "../hooks/useApi";
import GapList from "./GapList";
import PageHeading from "./PageHeading";
import CardButton from "./CardButton";
import { Driver } from "../types/ApiResponses";
import Card from "./Card";
import FormButton from "./FormButton";

type DriversListProps = {
  callback: () => void;
};
export default function DriversList({ callback }: DriversListProps) {
  const [isViewingDriver, setIsViewingDriver] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver>();

  const { data, loading } = useApi("drivers");

  const viewDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsViewingDriver(true);
  };

  const viewList = () => {
    setIsViewingDriver(false);
  };

  if (isViewingDriver && !!selectedDriver) {
    return (
      <>
        <PageHeading>
          <button onClick={viewList}>&lt; Driver information</button>
        </PageHeading>
        <Card className="text-center">
          <img src={selectedDriver.name}/>
          <h1 className="text-xl">{selectedDriver.name}</h1>
          <h2>License: {selectedDriver.licenseNumber}</h2>
          <h2>Mobile: {selectedDriver.phoneNumber}</h2>
          <h2>Address: {selectedDriver.emailAddress}</h2>
          <h2>Email: {selectedDriver.emailAddress}</h2>
        </Card>
        <div className="flex flex-col py-7 gap-4 items-center">
          <FormButton className="w-3/5">EDIT</FormButton>
          <FormButton className="w-3/5 text-danger">DELETE</FormButton>
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
              <img src={driver.name} />
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
