import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "../../../components/Card";
// import useScreenType from "../../../hooks/useScreenType";

export default function TopDrivers() {
  //   const { isMobile } = useScreenType();

  return (
    <Card className="w-full">
      <h1 className="text-xl">Top performers of the month</h1>
      <div className="flex">
        <Icon icon="lucide:move-up" className="text-green-600" />
        <span className="text-base ml-2">Sara Larsson - 198103089012</span>
      </div>
      <div className="flex">
        <Icon icon="lucide:move-down" className="text-yellow-600" />
        <span className="ml-2 text-base">Ali Ahmed - 198210112345</span>
      </div>
      <div className="flex">
        <Icon icon="lucide:move-up" className="text-green-600" />
        <span className="ml-2 text-base">Emil Svensson - 197810199123</span>
      </div>
      <div></div>
      <div></div>
    </Card>
  );
}
