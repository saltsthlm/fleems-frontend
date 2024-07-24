import { useState } from "react";
import Card from "../components/Card";
import GapList from "../components/GapList";
import PageHeading from "../components/PageHeading";
import PageWithNavigation from "../components/PageWithNavigation";
import useApi from "../hooks/useApi";
import { Client } from "../types/ApiResponses";
import { Icon } from "@iconify/react";

export default function ClientsPage() {
  const [searchFilter, setSearchFilter] = useState<string>();

  const { data, loading } = useApi("clients");

  return (
    <PageWithNavigation>
      <PageHeading>Clients</PageHeading>
      <div className="pb-3 flex justify-end">
        <div className="bg-button rounded-full py-1 px-3 flex">
          <span className="pr-2">
            <Icon
              icon="material-symbols-light:search"
              className="h-full"
            ></Icon>
          </span>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search"
            className="bg-transparent"
          />
        </div>
      </div>
      {loading && <h1>Loading...</h1>}
      <GapList>
        {data?.map((client: Client) => (
          <Card>
            <h1 className="text-xl">{client.name}</h1>
            <h2>Num of tasks: {client.tasks.length}</h2>
            <h2>Completed: {client.tasks.length}</h2>
            <h2>Ongoing: {client.tasks.length}</h2>
          </Card>
        ))}
      </GapList>
    </PageWithNavigation>
  );
}
