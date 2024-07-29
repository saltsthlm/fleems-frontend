import { useState } from "react";
import GapList from "../../components/GapList";
import PageHeading from "../../components/PageHeading";
import PageWithNavigation from "../../components/PageWithNavigation";
import useApi from "../../hooks/useApi";
import { Client } from "../../types/ApiResponses";
import { Icon } from "@iconify/react";
import Throbber from "../../components/Throbber";
import CardButtonWithNoStyles from "../../components/CardButtonWithNoStyles";
import Card from "../../components/Card";


type ClientsListProps = {
  callback: () => void;
};
export default function ClientsList({ callback }: ClientsListProps) {
  const [searchFilter, setSearchFilter] = useState<string>();
  const [isViewingClient, setIsViewingClient] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>();
  // const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  // const [isEditingTruck, setIsEditingTruck] = useState<boolean>(false);

  const { data, isLoading, error } = useApi("clients");

  // const editTruck = (vehicle: Vehicle) => {
  //   setIsEditingTruck(true);
  //   setIsShowingPopup(false);
  //   console.log(vehicle);
  // };

  const viewClient = (client: Client) => {
    setSelectedClient(client);
    setIsViewingClient(true);
  };

  const viewList = () => {
    setIsViewingClient(false);
  };

 
  if (isViewingClient && !!selectedClient) {
    return (
      <>
      <PageWithNavigation>
        <PageHeading>
          <button onClick={viewList}>&lt; Client information</button>
        </PageHeading>
        
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
      </>
    );
  }

  if (isLoading || error) {
    return (
      <>
        <PageHeading>
          <button onClick={callback}>&lt; Client information</button>
        </PageHeading>
        <GapList>
          {isLoading && <Throbber />}
          {error && <h1>An error ocurred: {error.message}</h1>}
        </GapList>
      </>
    );
  }

  return (
    <>
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
          <CardButtonWithNoStyles
          key={client.id}
          onClick={() => viewClient(client)}
           >
            <h1 className="text-xl">{client.name}</h1>
            <div className="flex justify-between w-full text-left">
              <div> 
                <h2 >Num of tasks : {client.tasks.length}</h2>
                <h2>Completed : {client.tasks.length}</h2>
                <h2>Ongoing : {client.tasks.length}</h2>
              </div>
              <div >
                <h2>Contact : {client.contactPerson == null ? "Anders Petterson" : client.contactPerson}</h2>
                <h2>Email : {client.contactEmail == null ? "12/06/2024" : client.contactEmail}</h2>
                <h2>Phone : {client.contactPhoneNumber == null ? "0763262839" : client.contactPhoneNumber}</h2>
              </div>
            </div>
          </CardButtonWithNoStyles>
        ))}
      </GapList>
      </PageWithNavigation>
    </>
  );
}
