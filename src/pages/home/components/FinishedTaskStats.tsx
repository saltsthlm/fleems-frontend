import { BarChart } from "@mui/x-charts";
import Card from "../../../components/Card";
import useScreenType from "../../../hooks/useScreenType";

export default function FinishedTaskStats() {
  const { isMobile } = useScreenType();

  return (
    <Card>
      <h1 className="text-xl">Finished tasks per month</h1>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ]}
        series={[
          {
            data: [5, 4, 12, 8, 5, 6, 7, 8, 0, 20, 11, 12],
          },
        ]}
        height={isMobile ? 200 : 200}
      />
    </Card>
  );
}
