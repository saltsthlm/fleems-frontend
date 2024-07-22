import { Link } from "@tanstack/react-router";

export default function MainNavigation() {
  return (
    <footer className="mt-auto flex justify-around">
      <Link to="/drivers">Drivers</Link>
      <Link to="/vehicles">Trucks</Link>
      <Link to="/clients">Clients</Link>
      <Link to="/tasks">Tasks</Link>
    </footer>
  );
}
