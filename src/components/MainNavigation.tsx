import { Link } from "@tanstack/react-router";
import building from "../assets/icons/building.svg";
import checklist from "../assets/icons/checklist.svg";
import truck from "../assets/icons/truck.svg";
import truck_driver from "../assets/icons/truck_driver.svg";
import house from "../assets/icons/house.svg";

export default function MainNavigation() {
  return (
    <footer className="mt-auto flex justify-around bg-button py-2 text-sm text-center items-end [&>a>img]:mx-auto [&>a>img]:h-7">
      <Link to="/">
        <img src={house} className="py-1" />
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
