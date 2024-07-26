import logo from "../assets/logo.png";
import { PropsWithClassName } from "../types/ComponentTypes";

type LogoProps = {
  size?: "small" | "medium" | "large";
} & PropsWithClassName
export default function Logo({ size, className }: LogoProps) {
  const sizeClasses: { [key: string]: string } = {
    small: "h-12",
    medium: "w-46",
    large: "w-128",
  }

  return (
    <div className={`p-10 ${className} ${size && sizeClasses[size]}`}>
      <img src={logo} className="w-full" />
      <p className="text-center">Trucking made easy</p>
    </div>
  );
}
