import Card from "../../../components/Card";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function RestViolations() {
  const { data, isLoading } = useApi("stats", { statsEndpoint: "rest" });

  const formatDate = (dateInput: Date | string): string => {
    let date: Date;
  
    if (typeof dateInput === "string") {
      date = new Date(dateInput);
    } else {
      date = dateInput;
    }
  
    if (isNaN(date.getTime())) {
      return "N/A";
    }
  
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      <h1 className="text-base">Rest violations</h1>
      {isLoading ? (
        <Throbber />
      ) : (
        <ul>
          {data?.map((restViolation) => (
            <li className=" m-1">
              <h1 className="font-semibold text-danger">- <span className="text-black">{restViolation.driver}</span></h1>
              <h2>Violation was commited on {formatDate(restViolation.date)}</h2>
              <h2>Driver went {restViolation.time} hours without rest</h2>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
