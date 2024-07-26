import { useState } from "react";
import Card from "../../components/Card";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import { Client } from "../../types/ApiResponses";
import { Icon } from "@iconify/react";
import Throbber from "../../components/Throbber";

export default function ClientsPage() {
  const [searchFilter, setSearchFilter] = useState<string>();

  const { data, isLoading, error } = useApi("clients");

  if (isLoading || error) {
    return (
      <PageWithNavigation>
        <PageHeading>Clients</PageHeading>
        <GapList>
          {isLoading && <Throbber />}
          {error && <h1>An error ocurred: {error.message}</h1>}
        </GapList>
      </PageWithNavigation>
    );
  }

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
      {isLoading && <Throbber />}
      <GapList>
        {data?.map((client: Client) => (
          <Card key={client.id}>
            <h1 className="text-xl">{client.name}</h1>
            <div className="flex justify-between">
              <div>
                <h2>Num of tasks : {client.tasks.length}</h2>
                <h2>Completed : {client.tasks.length}</h2>
                <h2>Ongoing : {client.tasks.length}</h2>
              </div>
              <div>
                <h2>Contact : {client.contactPrson == null ? "Anders Petterson" : client.contactPrson}</h2>
                <h2>Email : {client.contactEmail == null ? "12/06/2024" : client.contactEmail}</h2>
                <h2>Phone : {client.contactPhoneNumber == null ? "0763262839" : client.contactPhoneNumber}</h2>
              </div>
            </div>
          </Card>
        ))}
      </GapList>
    </PageWithNavigation>
  );
}
