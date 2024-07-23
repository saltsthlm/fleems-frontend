import useApi from "../hooks/useApi";
import GapList from "./GapList";

export default function DriversList() {
  const { data, loading } = useApi("drivers");

  return (
    <GapList>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((driver, index) => (
            <div key={index}>
              <p>{driver.name}</p>
            </div>
          ))}
        </div>
      )}
    </GapList>
  );
}
