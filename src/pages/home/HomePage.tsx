import FleetDataStats from "./components/FleetDataStats";
import FleetEventsStats from "./components/FleetEventsStats";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import TopDriversStats from "./components/TopDriversStats";
import Map from "../../components/Map";
import { BarChart, PieChart } from "@mui/x-charts";

export default function HomePage() {
  return (
    <PageWithNavigation>
      <PageHeading>Dashboard</PageHeading>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Assigned" },
              { id: 1, value: 15, label: "Unassigned" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
      />
      <GapList className="grid-cols-4">
        <FleetEventsStats />
        <TopDriversStats />
        <FleetDataStats />
      </GapList>
      <Map />
    </PageWithNavigation>
  );
}
