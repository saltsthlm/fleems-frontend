import { BarChart } from "@mui/x-charts";
import Card from "../../../components/Card";
import useScreenType from "../../../hooks/useScreenType";
import useApi from "../../../hooks/useApi";
import Throbber from "../../../components/Throbber";

export default function FinishedTaskStats() {
  const { isMobile } = useScreenType();
  const { data, isLoading } = useApi("stats", { statsEndpoint: "completed" });

  return (
    <Card className="w-full">
      <h1 className="text-xl">Finished tasks per month</h1>
      {isLoading ? (
        <Throbber />
      ) : (
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
          series={[{ data }]}
          height={isMobile ? 200 : 400}
         
        />
      )}
    </Card>
  );
}
