import { useState } from "react";
import useApi from "../hooks/useApi";
import GapList from "./GapList";
import PageHeading from "./PageHeading";
import CardButton from "./CardButton";

type DriversListProps = {
  callback: () => void;
};
export default function DriversList({ callback }: DriversListProps) {
  const [isViewingDriver, setIsViewingDriver] = useState<boolean>(false);

  const { data, loading } = useApi("drivers");

  const viewDriver = () => {
    setIsViewingDriver(true);
  };

  const viewList = () => {
    setIsViewingDriver(false);
  };

  if (isViewingDriver) {
    return (
      <>
        <PageHeading>
          <button onClick={viewList}>&lt; Driver information</button>
        </PageHeading>
        <div>
          <h1>Single driver info</h1>
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
              onClick={viewDriver}
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
