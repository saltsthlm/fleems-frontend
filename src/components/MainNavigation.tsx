import { Link } from "@tanstack/react-router";
import building from "../assets/icons/building.svg";
import checklist from "../assets/icons/checklist.svg";
import truck from "../assets/icons/truck.svg";
import truck_driver from "../assets/icons/truck_driver.svg";
import speedometer from "../assets/icons/speedometer.svg";
import useScreenType from "../hooks/useScreenType";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";

export default function MainNavigation() {
  const { isMobile } = useScreenType();

  const activeLinkClassName = "underline text-font font-normal";

  if (!isMobile) {
    return (
      <header className="order-first sticky top-0 bg-button grid grid-flow-col grid-cols-center3 justify-between z-50 p-4 px-12 drop-shadow-lg">
        <Logo className="p-0" size="medium" />
        <nav className="text-2xl flex gap-10 items-center justify-self-center font-light">
          <Link to="/" activeProps={{ className: activeLinkClassName }}>
            Home
          </Link>
          <Link to="/drivers" activeProps={{ className: activeLinkClassName }}>
            Drivers
          </Link>
          <Link to="/vehicles" activeProps={{ className: activeLinkClassName }}>
            Trucks
          </Link>
          <Link to="/clients" activeProps={{ className: activeLinkClassName }}>
            Clients
          </Link>
          <Link to="/tasks" activeProps={{ className: activeLinkClassName }}>
            Tasks
          </Link>
        </nav>
        <div className="flex justify-center items-center justify-self-end">
          <ProfileButton className="h-full text-3xl" />
        </div>
      </header>
    );
  }

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
