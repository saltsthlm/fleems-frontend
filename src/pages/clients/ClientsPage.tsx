import { useState } from "react";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import { Client } from "../../types/ApiResponses";
import Throbber from "../../components/Throbber";
import CardButtonWithNoStyles from "../../components/CardButtonWithNoStyles";
import Card from "../../components/Card";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import SearchBar from "../../components/SearchBar";

export default function ClientsList() {
  const [searchFilter, setSearchFilter] = useState<string>();
  const [isViewingClient, setIsViewingClient] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [activeTab, setActiveTab] = useState<string>("information");

  const { data, isLoading, error } = useApi("clients");

  const viewClient = (client: Client) => {
    setSelectedClient(client);
    setIsViewingClient(true);
  };

  const viewList = () => {
    setIsViewingClient(false);
  };

  if (isViewingClient && !!selectedClient) {
    return (
      <PageWithNavigation>
        <PageHeading>Clients</PageHeading>
        <Card className="text-center">
          <h1 className="text-xl">{selectedClient.name}</h1>
          <h2>Num of tasks : {selectedClient.tasks.length}</h2>
          <h2>Completed : {selectedClient.tasks.length}</h2>
          <h2>On going : {selectedClient.tasks.length}</h2>
          <h2>Unassigned : {selectedClient.tasks.length}</h2>
          <h2>Contact person : {selectedClient.contactPerson}</h2>
          <h2>Email : {selectedClient.contactEmail}</h2>
          <h2>Phone : {selectedClient.contactPhoneNumber}</h2>
        </Card>
      </PageWithNavigation>
    );
  }

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
      <SecondaryNavigation onTabChange={setActiveTab} activeTab={activeTab} />
      <SearchBar value={searchFilter} callback={setSearchFilter} />
      {isLoading && <Throbber />}
      <GapList>
        {data?.map((client: Client) => (
          <CardButtonWithNoStyles
            key={client.id}
            onClick={() => viewClient(client)}
          >
            <h1 className="text-xl">{client.name}</h1>
            <div className="flex justify-between w-full text-left">
              <div>
                <h2>Num of tasks : {client.tasks.length}</h2>
                <h2>Completed : {client.tasks.length}</h2>
                <h2>Ongoing : {client.tasks.length}</h2>
              </div>
              <div>
                <h2>
                  Contact :{" "}
                  {client.contactPerson == null
                    ? "Anders Petterson"
                    : client.contactPerson}
                </h2>
                <h2>
                  Email :{" "}
                  {client.contactEmail == null
                    ? "12/06/2024"
                    : client.contactEmail}
                </h2>
                <h2>
                  Phone :{" "}
                  {client.contactPhoneNumber == null
                    ? "0763262839"
                    : client.contactPhoneNumber}
                </h2>
              </div>
            </div>
          </CardButtonWithNoStyles>
        ))}
      </GapList>
    </PageWithNavigation>
  );
}
