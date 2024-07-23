import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <div className="p-10">
      <img src={logo} className="w-full"/>
      <p className="text-center">Trucking made easy</p>
    </div>
  );
}
