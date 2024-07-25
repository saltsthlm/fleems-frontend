import { Link } from "@tanstack/react-router";
import building from "../assets/icons/building.svg";
import checklist from "../assets/icons/checklist.svg";
import truck from "../assets/icons/truck.svg";
import truck_driver from "../assets/icons/truck_driver.svg";
import speedometer from "../assets/icons/speedometer.svg";

export default function MainNavigation() {
  return (
    <footer className="mt-auto flex justify-around bg-button p-2 text-sm text-center items-end [&>a>img]:mx-auto [&>a>img]:h-7 sticky bottom-0 z-50">
      <Link to="/">
        <img src={speedometer} className="py-1" />
        Home
      </Link>
      <Link to="/drivers">
        <img src={truck_driver} />
        Drivers
      </Link>
      <Link to="/vehicles">
        <img src={truck} />
        Trucks
      </Link>
      <Link to="/clients">
        <img src={building} className="py-1" />
        Clients
      </Link>
      <Link to="/tasks">
        <img src={checklist} className="py-1" />
        Tasks
      </Link>
    </footer>
  );
}
