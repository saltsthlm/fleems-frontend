import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "../../../components/Card";
// import useScreenType from "../../../hooks/useScreenType";

export default function TopDrivers() {
//   const { isMobile } = useScreenType();

  return (
    <Card className="w-full">
        <h1 className="text-xl">Top Performers of the month</h1>
   <div className="flex"><Icon icon="lucide:move-up" className="text-green-600"/><span className="text-base ml-2">Sara Larsson</span></div>
   <div className="flex"><Icon icon="lucide:move-down" className="text-yellow-600"/><span className="ml-2 text-base">Ali Ahmed</span></div>
   <div className="flex"><Icon icon="lucide:move-up" className="text-green-600"/><span className="ml-2 text-base">Emil Svensson</span></div>
   <div></div>
   <div></div>
  </Card>
);
}

