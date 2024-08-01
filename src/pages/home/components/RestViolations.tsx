import Card from "../../../components/Card";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function RestViolations() {
  const { data, isLoading } = useApi("stats", { statsEndpoint: "rest" });

  return (
    <Card>
      <h1 className="text-xl">Rest violations</h1>
      {isLoading ? (
        <Throbber />
      ) : (
        <ul>
          {data?.map((restViolation) => (
            <li className="border border-black m-1">
              <h1 className="font-semibold">{restViolation.driver}</h1>
              <h2>Violation was commited on {restViolation.date}</h2>
              <h2>Driver went {restViolation.time} hours without rest</h2>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
