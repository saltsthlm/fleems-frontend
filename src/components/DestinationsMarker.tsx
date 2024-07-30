import { Icon } from "@iconify/react/dist/iconify.js";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function DestinationsMarker({ className }: PropsWithClassName) {
  return (
    <div className={className ?? ""}>
      <Icon icon="carbon:circle-outline" />
      <Icon icon="ant-design:dash-outlined" className="rotate-90" />
      <Icon icon="vaadin:dot-circle" />
    </div>
  );
}
