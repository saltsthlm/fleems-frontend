import useApi from "../hooks/useApi";
import Card from "./Card";
import GapList from "./GapList";

export default function DriversList() {
  const { data, loading } = useApi("drivers");

  return (
    <GapList>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GapList>
          {data?.map((driver) => (
            <Card key={driver.id} className="flex flex-row">
              <img src={driver.name} />
              <div>
                <h1 className="text-xl">{driver.name}</h1>
                <p>License: {driver.licenseNumber}</p>
                <p>Mobile: {driver.phoneNumber}</p>
              </div>
            </Card>
          ))}
        </GapList>
      )}
    </GapList>
  );
}
