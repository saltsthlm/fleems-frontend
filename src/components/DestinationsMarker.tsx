import { Icon } from "@iconify/react/dist/iconify.js";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function DestinationsMarker({ className }: PropsWithClassName) {
  return (
    <div className={className ?? ""}>
      <Icon icon="fluent-mdl2:switcher-start-end" className="h-10 w-6"/>
    </div>
  );
}
