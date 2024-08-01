import Card from "../../../components/Card";
import Throbber from "../../../components/Throbber";
import useApi from "../../../hooks/useApi";

export default function SpeedViolations() {
  const { data, isLoading } = useApi("stats", { statsEndpoint: "speed" });
  
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
      <h1 className="text-base">Speed violations</h1>
      {isLoading ? (
        <Throbber />
      ) : (
        <>
        <ul>
          {data?.map((speedViolation) => (
            <li className="m-1 p-1">
              <h1 className="font-semibold text-danger"> - <span className="text-black">{speedViolation.driver}</span></h1>
              <h2>Violation was commited on {formatDate(speedViolation.date)}</h2>
              <h2>
                Speed of truck was {Math.trunc(speedViolation.speed)} km/h
              </h2>
            </li>
          ))}
        </ul>
       {/* <SpeedViolations /> */}
        </>
        
      )}
    </>
  );
}
