import logo from "../assets/logo.png";
import { PropsWithClassName } from "../types/ComponentTypes";

type LogoProps = {
  size?: "small" | "medium" | "large";
  removeText?: boolean;
} & PropsWithClassName;
export default function Logo({
  size,
  className,
  removeText = false,
}: LogoProps) {
  const sizeClasses: { [key: string]: string } = {
    small: "h-12",
    medium: "w-56",
    large: "w-128",
  };

  return (
    <div className={`${className} ${size && sizeClasses[size]}`}>
      <img src={logo} className="w-full" />
      {!removeText && <p className="text-center">Trucking made easy</p>}
    </div>
  );
}
