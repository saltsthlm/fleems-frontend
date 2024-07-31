import { useMemo, useState } from "react";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import { Client, ClientInfoDto } from "../../types/ApiResponses";
import Throbber from "../../components/Throbber";
import CardButtonWithNoStyles from "../../components/CardButtonWithNoStyles";
import Card from "../../components/Card";
import SecondaryNavigation from "../../components/SecondaryNavigation";
import SearchBar from "../../components/SearchBar";
import useScreenType from "../../hooks/useScreenType";
import Table from "../../components/Table";

type ClientsListProps = {
  callback: () => void;
};
export default function ClientsList({ callback }: ClientsListProps) {
  const [searchFilter, setSearchFilter] = useState<string>();
  const [isViewingClient, setIsViewingClient] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [activeTab, setActiveTab] = useState<string>("information");

  const { data, isLoading, error } = useApi("clients");

  const { isMobile } = useScreenType();

  const filteredData = useMemo(() => {
    if (!searchFilter) return data;
    return data?.filter(
      (client) =>
        client.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        client.contactPerson
          ?.toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        client.contactEmail
          ?.toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        client.contactPhoneNumber?.includes(searchFilter)
    );
  }, [data, searchFilter]);

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
        <PageHeading>
          <button onClick={viewList}>&lt; Client information</button>
        </PageHeading>

        <Card className={`text-center ${isMobile ? "" : "w-2/5 mx-auto"}`}> 
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
        <PageHeading>
          <button onClick={callback}>Clients</button>
        </PageHeading>
        <GapList>
          {isLoading && <Throbber />}
          {error && <h1>An error ocurred: {error.message}</h1>}
        </GapList>
      </PageWithNavigation>
    );
  }
  if (isMobile) {
    return (
      <>
        <PageWithNavigation>
          <PageHeading>Clients</PageHeading>
          <SecondaryNavigation
            onTabChange={setActiveTab}
            activeTab={activeTab}
            parentRoute="/clients"
          />
          <SearchBar value={searchFilter} callback={setSearchFilter} />
          {isLoading && <Throbber />}
          <GapList>
            {filteredData?.map((client: Client) => (
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
      </>
    );
  }

  if (!isMobile && data !== undefined) {
    const dataInfo = data.map((e) => {
      return {
        id: e.id,
        contactPerson: e.contactPerson,
        contactEmail: e.contactEmail,
        contactPhoneNumber: e.contactPhoneNumber,
        name: e.name,
      };
    }) as ClientInfoDto[];

    return (
      <PageWithNavigation>
        <PageHeading>Clients</PageHeading>
        <SecondaryNavigation
          onTabChange={setActiveTab}
          activeTab={activeTab}
          parentRoute="/clients"
        />
        <Table data={dataInfo} />
      </PageWithNavigation>
    );
  }
}
