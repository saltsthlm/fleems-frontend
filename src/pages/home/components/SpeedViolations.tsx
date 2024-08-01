import Card from "../../../components/Card";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function SpeedViolations() {
  const { data, isLoading } = useApi("stats", { statsEndpoint: "speed" });

  return (
    <Card>
      <h1 className="text-xl">Speeding violations</h1>
      {isLoading ? (
        <Throbber />
      ) : (
        <ul>
          {data?.map((speedViolation) => (
            <li className="border border-black m-1 p-1">
              <h1 className="font-semibold">{speedViolation.driver}</h1>
              <h2>Violation was commited on {speedViolation.date}</h2>
              <h2>
                Speed of truck was {Math.trunc(speedViolation.speed)} km/h
              </h2>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
