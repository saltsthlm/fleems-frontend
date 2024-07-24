export type Driver = {
  emailAddress: string;
  id: string;
  licenseNumber: string;
  name: string;
  phoneNumber: string;
  photo: string;
};

export type Client = {
  id: string;
  name: string;
  tasks: string; //TODO: should be TaskList wi
};

export type Task = {
  id: string;
  startDestination: string;
  endDestination: string;
  dateCreated: Date;
  dateFinished: Date;
  expectedDistance: number;
  product: string;
  payload: number;
  quantity: number;
  legs: string; // TODO: LegInfoDto[];
};

export type Vehicle = {
  id: string;
  licenseNumber: string;
  payload: number;
  height: number;
  weight: number;
  length: number;
  distanceDriven: number;
  model: string;
};
